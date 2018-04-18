import React from "react";
import PublishersForm from "./PublishersForm";
//import PropTypes from "prop-types";
import api from "../api";

class PublishersPage extends React.Component {
  state= {
    publishers: [],
    selectedPublisher:{}
  };

  componentDidMount() {

    api.publishers
      .fetchAll()
      .then(publishers => this.setState({ publishers: publishers }));

  }

  //***********
  //PUBLISHERS
  //***********
  selectPublisherForEditing = p => {
    this.setState({ selectedPublisher: p });
  };

  savePublisher = publisher => {
    return (publisher._id
      ? this.updatePublisher(publisher)
      : this.addPublisher(publisher)
    ).then(() => this.props.history.push("/publishers"));
  };

  updatePublisher = publisher =>
    api.publishers.update(publisher).then(res =>
      this.setState({
        publishers: this.state.publishers.map(
          item => (item._id === publisher._id ? publisher : item)
        )
      })
    ).then(() => this.setState({selectedPublisher:{}}));

  addPublisher = publisher => {
    console.log(publisher);
    return api.publishers
      .create(publisher)
      .then(res =>
        this.setState({ publishers: [...this.state.publishers, res] })
      )
      .catch(err => console.log(err));
  };

  deletePublisher = publisher =>
    api.publishers.delete(publisher).then(() =>
      this.setState({
        publishers: this.state.publishers.filter(
          item => item._id !== publisher._id
        )
      })
    );

  render() {
    return (
      <div className="ui container">
        <div className="six wide column">
          <PublishersForm
            publishers={this.state.publishers}
            edit={this.selectPublisherForEditing}
            save={this.savePublisher}
            deletePublisher={this.deletePublisher}
            publisher={this.state.selectedPublisher|| {}}
          />
        </div>
      </div>
    );
  }
}

export default PublishersPage;
