import React from 'react';
import Component from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      alreadyLiked: false,
      alreadyDisliked: false,
    }
  }

  handleLike = () => {
      if (this.state.alreadyLiked === false) {
        if (this.state.alreadyLiked === false) {
          this.setState({
            alreadyLiked: true
          })
          this.liked();
        } else {
          this.setState({
            alreadyLiked: false
          })
          this.liked();
        }
      } else {
      this.setState({
        alreadyDisliked: false,
        alreadyLiked: false
      })
    }

  }

  handleDislike = () => {
    if (this.state.alreadyLiked === false) {  
      if (this.state.alreadyDisliked === false) {
        this.setState({
          alreadyDisliked: true
        })
      } else {
        this.setState({
          alreadyDisliked: false
        })
      }
    } else {
      this.setState({
        alreadyDisliked: false,
        alreadyLiked: false
      })
    }
  }


  render() {
    return (
      <div>
        <button className = { this.state.alreadyLiked ? 'liked like-button' : 'like-button' } onClick = { this.handleLike }>
        Like | { this.state.likes } </button> 
        <button className = { this.state.alreadyDisliked ? 'disliked like-button' : 'dislike-button' } onClick = { this.handleDislike }>
        Dislike | { this.state.dislikes } </button> 
      </div> 
    );
  }
}

export default App;