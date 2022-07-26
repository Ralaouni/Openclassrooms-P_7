import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,} from '@fortawesome/free-solid-svg-icons';

class Likedislike extends React.Component {
  constructor() {
    super()
    this.state = {
      alreadyLiked: false,
      alreadyDisliked: false,
    }
  }

  handleLike = (e) => {
    e.preventDefault()
    let button = e.currentTarget
    let article=button.closest("article")
    
    let like = 0
      if (this.state.alreadyLiked === false) {
        if (this.state.alreadyDisliked === false) {
          this.setState({
            alreadyLiked: true
          })
          like = 1
        } else {
          this.setState({
            alreadyLiked: false,
            alreadyDisliked:false
          })
          like = 0
        }
      } else {
      this.setState({
        alreadyDisliked: false,
        alreadyLiked: false
      })
      like = 0
    }

    let credentials = JSON.parse(localStorage.credentials)

    let likesend = {
        userId : credentials[0].userId,
        like : like
    }


    let postLike = () => {
            fetch(`http://localhost:8000/api/post/${article.id}/like`, {
              method: "POST",
              body: JSON.stringify(likesend),
              headers: { 
                'Authorization':`${document.cookie}`,
                'Content-Type': 'application/json' 
              }
            });
    }

    postLike()

  }

  handleDislike = (e) => {
    e.preventDefault()
    let button = e.currentTarget
    let article=button.closest("article")
    
    let like = 0
    if (this.state.alreadyLiked === false) {  
      if (this.state.alreadyDisliked === false) {
        this.setState({
          alreadyDisliked: true
        })
         like = -1
      } else {
        this.setState({
          alreadyDisliked: false
        })
         like = 0
      }
    } else {
      this.setState({
        alreadyDisliked: false,
        alreadyLiked: false
      })
       like = 0
    }

    let credentials = JSON.parse(localStorage.credentials)

    let dislikesend = {
        userId : credentials[0].userId,
        like : like
    }


    let postDislike = () => {
            fetch(`http://localhost:8000/api/post/${article.id}/like`, {
              method: "POST",
              body: JSON.stringify(dislikesend),
              headers: { 
                'Authorization':`${document.cookie}`,
                'Content-Type': 'application/json' 
              }
            });
    }

    postDislike()

  }



  render() {
    return (
      <div>
        <button className = { this.state.alreadyLiked ? 'liked like-button' : 'like-button' } onClick = { this.handleLike }>
        <FontAwesomeIcon icon={faThumbsUp} /> </button> 

        <button className = { this.state.alreadyDisliked ? 'disliked like-button' : 'dislike-button' } onClick = { this.handleDislike }>
        <FontAwesomeIcon icon={faThumbsDown} /> </button>
        <style> { `
            .like-button, .dislike-button {
              font-size: 1rem;
              padding: 5px 10px;
              color:   #585858;
            }
            .liked, .disliked {
              font-weight: bold;
              color: #1565c0;
            }
          ` } 
          </style> 
      </div> 
    );
  }
}

export default Likedislike;