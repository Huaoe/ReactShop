import React from 'react'
import GameDetails from "./GameDetails"
import api from '../api';

class ShowGamePage extends React.Component {

state = {
  game:{},
  loading:true
};

componentDidMount(){
  api.items
    .fetchById(this.props.match.params._id)
    .then(game => this.setState({game, loading:false}));
}

  render () {
  return <div>
      {
      this.state.loading?(<p>Loading...</p>):(<GameDetails game={this.state.game}/>)
      }
  </div>
};
}

export default ShowGamePage;
