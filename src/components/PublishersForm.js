import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const initialPublisher = {
  name: "",
  website: ""
};

class PublishersForm extends React.Component {
  state = {
    data: initialPublisher,
    errors:{}
  };

  componentDidMount() {
    if (this.props.publisher._id) {
      this.setState({ data: this.props.publisher });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.publisher._id &&
      nextProps.publisher._id !== this.state.data._id
    ) {
      this.setState({ data: nextProps.publisher });
    }
    if (!nextProps.publisher._id) {
      this.setState({ data: initialPublisher });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    // const errors = this.validate(this.state.data);
    // this.setState({ errors });
    //
    // console.log(errors);

    //if (Object.keys(errors).length === 0) {

    this.props.save(this.state.data).catch(err=>this.setState({
      errors:err.response.data.errors}));

    this.setState({ data: initialPublisher });

    //}
  };

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

  render() {
    // const {
    //   publishers,
    //   edit,
    //   save,
    //   cancel,
    //   deletePublisher,
    //   publisher
    // } = this.props;

    const data = this.state.data;
    return (
      <div className="three wide column">

        <table className="ui stackable table">
          <thead>
            <tr>
              <th>name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.publishers.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>
                  <a
                    className="ui small button "
                    onClick={() => this.props.edit(p)}
                  >
                    <i className="ui green icon edit" />
                  </a>
                  <a
                    className="ui small button "
                    onClick={() => this.props.deletePublisher(p)}
                  >
                    <i className="ui red icon trash" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form action="" className="ui form" onSubmit={this.handleSubmit}>
          <div className="ui grid one column">
            <div className="field">
              <label htmlFor="name"> Publisher Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="website"> Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={data.website}
                onChange={this.handleChange}
              />
            </div>

            <div className="ui fluid buttons">
              <button className="ui primary button submit" type="submit">
                Save
              </button>
              <div className="or" />
                <Link to="/publishers" className="ui button">
                  Cancel
                </Link>

            </div>
          </div>
        </form>
      </div>
    );
  }
}

PublishersForm.propTypes = {
  publishers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired
    })
  ).isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,

  deletePublisher: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    website: PropTypes.string
  })
};

export default PublishersForm;
