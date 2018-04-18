import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactImageFallback from "react-image-fallback";
import FormInlineMessage from "./FormInlineMessage";
import {Link, Redirect} from 'react-router-dom'


const initialData = {
  name: "",
  description: "",
  price: 0,
  duration: 0,
  players: "",
  featured: false,
  // tags: [],
  // genre: 1,
  publisher: 0,
  thumbnail: ""
};

class GameForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading:false,
    redirect:false
  };

  componentDidMount() {
    if (this.props.game._id) {
      this.setState({ data: this.props.game });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.game._id && nextProps.game._id !== this.state.data._id) {
      this.setState({ data: nextProps.game });
    }
    if (!nextProps.game._id) {
      this.setState({ data: initialData });
    }
  }

  validate(data) {
    const errors = {};

    if (!data.name) errors.name = "This field can't be blank";
    if (!data.players) errors.players = "This field can't be blank";
    if (!data.publisher) errors.publishers = "This field can't be blank";
    if (!data.thumbnail) errors.thumbnail = "This field can't be blank";
    if (data.price <= 0) errors.price = "This price is to cheap";
    if (data.duration <= 0) errors.duration = "too short";

    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
  //const errors = {};
    this.setState({ errors });

    console.log(errors);

    if (Object.keys(errors).length === 0) {
      this.setState({loading:true});
      //console.log(this.state.data);
      this.props.submit(this.state.data)
      .then(()=>this.setState({redirect:true}))
      .catch(err=>this.setState({
        errors:err.response.data.errors,
        loading:false
      }));
    }
  };

  handleCheckboxChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked }
    });

  handleChange = e =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]:
          e.target.type === "number"
            ? parseInt(e.target.value, 10)
            : e.target.value
      }
    });

  handleNumberChange = e =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  // toggleTag = tag =>
  //   this.state.tags.includes(tag._id)
  //     ? this.setState({ tags: this.state.tags.filter(id => id !== tag._id) })
  //     : this.setState({ tags: [...this.state.tags, tag._id] });
  //
  // handleGenreChange = genre => this.setState({ genre: genre._id });

  render() {
    const { data, errors, loading } = this.state;
    const formsLoading = loading ? "ui form loading":"ui form";
    return (
      <form className={formsLoading} onSubmit={this.handleSubmit}>
        {this.state.redirect && <Redirect to='/items'/>}
        <div className="ui grid">
          <div className="twelve wide column">
            <div className={errors.name ? "field error" : "field"}>
              <label htmlFor="name">Item Title</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full item title"
                value={data.name}
                onChange={this.handleChange}
              />
              <FormInlineMessage content={errors.name} type="error" />
            </div>

            <div className={errors.description ? "field error" : "field"}>
              <label htmlFor="description">Item description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Item Description"
                value={data.description}
                onChange={this.handleChange}
              />
              <FormInlineMessage content={errors.description} type="error" />
            </div>
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={data.thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>

        <div className={errors.thumbnail ? "field error" : "field"}>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            placeholder="Image URL"
            value={data.thumbnail}
            onChange={this.handleChange}
          />
          <FormInlineMessage content={errors.thumbnail} type="error" />
        </div>

        <div className="three fields">
          <div className={errors.price ? "field error" : "field"}>
            <label htmlFor="price">Price (in cents)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={this.handleChange}
            />
            <FormInlineMessage content={errors.price} type="error" />
          </div>
          <div className={errors.duration ? "field error" : "field"}>
            <label htmlFor="duration">Duration (in min)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={data.duration}
              onChange={this.handleChange}
            />
            <FormInlineMessage content={errors.duration} type="error" />
          </div>
          <div className={errors.players ? "field error" : "field"}>
            <label htmlFor="players">Nb Items</label>
            <input
              type="text"
              id="players"
              name="players"
              value={data.players}
              onChange={this.handleChange}
            />
            <FormInlineMessage content={errors.players} type="error" />
          </div>
        </div>

        <div className="inline field">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={data.featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className={errors.publishers ? "field error" : "field"}>
          <label>Publishers</label>
          <select
            name="publisher"
            value={data.publisher}
            onChange={this.handleChange}
          >
            <option value="0">Choose Publisher</option>
            {this.props.publishers.map(publisher => (
              <option value={publisher._id} key={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.publishers} type="error" />
        </div>
        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Create
          </button>
          <div className="or" />
          <Link to="/items" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}
GameForm.propTypes = {
  publishers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  submit: PropTypes.func.isRequired,
  game: PropTypes.shape({
    _id:PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    players: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.number,
    featured: PropTypes.bool,
    description: PropTypes.string
  }).isRequired
};

export default GameForm;
