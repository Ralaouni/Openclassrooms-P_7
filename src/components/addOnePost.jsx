import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,} from '@fortawesome/free-solid-svg-icons';




const  AddOneposts =  () => {


  let date = Date().slice(0,15)

  console.log(Date())

  const [data, setData] = useState ([])
  const [alreadyliked, setAlreadyliked] = useState (false)
  

  const userId = document.cookie.split('; ')
  .find(row => row.startsWith('userId'))
  .split('=')[1]

  
  useEffect (() => {
    fetch("http://localhost:8000/api/post/")
    .then(res => {
      (res.json().then(response => setData(response.reverse()) ))
    })
  },[alreadyliked])

  let PostLike = (e) => {

    e.preventDefault()
  
      let button = e.currentTarget
      let article = button.closest("article")
      let likesend = {
          userId : document.cookie.split('; ')
          .find(row => row.startsWith('userId'))
          .split('=')[1],
          like : 1
      }
      
          fetch(`http://localhost:8000/api/post/${article.id}/like`, {
            method: "POST",
            body: JSON.stringify(likesend),
            headers: { 
              'Authorization':`${document.cookie}`,
              'Content-Type': 'application/json' 
            }
          })
          .then((res) => {
              if (alreadyliked === false) {
                setAlreadyliked(true)
              } else {
                setAlreadyliked(false)
              }
          })
  }

  let PostDislike = (e) => {

    e.preventDefault()
    
      let button = e.currentTarget
      let article = button.closest("article")
      let likesend = {
          userId : document.cookie.split('; ')
          .find(row => row.startsWith('userId'))
          .split('=')[1],
          like : -1
      }
          fetch(`http://localhost:8000/api/post/${article.id}/like`, {
            method: "POST",
            body: JSON.stringify(likesend),
            headers: { 
              'Authorization':`${document.cookie}`,
              'Content-Type': 'application/json' 
            }
          })
          .then((res) => {
            if (alreadyliked === false) {
              setAlreadyliked(true)
            } else {
              setAlreadyliked(false)
            }
          })
  }



  return (
    <div>

    {/* data.map = (comme boucle for mais pour tout ce qui se trouve dans l'array) */}

    {data.length !== 0 && data.map((posts,i) =>  {

      console.log((posts.date[0]))

      let d = posts.date[0].slice(0,15)
      let today = posts.date[0].slice(16,24)
      

      let PostDelete = () => {
        async function deletePost() {
            await fetch(`http://localhost:8000/api/post/${posts._id}`, { 
              method: 'delete',
              headers:{ 
                'Authorization':`${document.cookie}`,
                'Content-Type': 'application/json' 
              }
            });
        }
        deletePost();
      }




      return (
                <article key={posts._id} id={posts._id} className="posts-article">
                <form >
                     <h2 className="all-names">{posts.name}&nbsp;{posts.forename}</h2>
                     <h2 className="job">{posts.job}</h2>
                     {(() => {
                      if(date===d){
                        return (
                          <p className="posts-date">{today}</p>
                        )
                      } else {
                        return (
                          <p className="posts-date">{d}</p>
                        )
                      }
                     })()}
                     <div>
                      <img className="posts-image" src={posts.imageUrl} alt=""/>
                      <p className="posts-text">{posts.post}</p>
                      {(() => {
                            if ( posts.usersLiked.includes(userId) ) {
                              return (
                                <div className="like-dislike">
                                    <span className="span-like span-like-dislike">
                                    {posts.likes}
                                    </span>
                                    <button className = 'liked like-button' onClick = {PostLike} >
                                    <FontAwesomeIcon icon={faThumbsUp} /> </button> 
                                    <button className = 'dislike-button'  onClick = {PostDislike}>
                                    <FontAwesomeIcon icon={faThumbsDown} /> </button>
                                    <span className="span-dislike span-like-dislike">
                                    {posts.dislikes}
                                    </span>
                                </div>                
                              )
                            }
                            else if (posts.usersDisliked.includes(userId)){
                              return (
                                <div className="like-dislike">
                                    <span className="span-like span-like-dislike">
                                    {posts.likes}
                                    </span>
                                    <button className = 'like-button' onClick = {PostLike}>
                                    <FontAwesomeIcon icon={faThumbsUp} /> </button> 
                                    <button className = 'disliked dislike-button'  onClick = {PostDislike}>
                                    <FontAwesomeIcon icon={faThumbsDown} /> </button>
                                    <span className="span-dislike span-like-dislike">
                                    {posts.dislikes}
                                    </span>
                                </div>                
                              )
                              }
                              else {
                                return (
                                <div className="like-dislike">
                                    <span className="span-like span-like-dislike">
                                    {posts.likes}
                                    </span>
                                    <button className = 'like-button' onClick = {PostLike}>
                                    <FontAwesomeIcon icon={faThumbsUp} /> </button> 
                                    <button className = 'like-button dislike-button'  onClick = {PostDislike}>
                                    <FontAwesomeIcon icon={faThumbsDown} /> </button>
                                    <span className="span-dislike span-like-dislike">
                                    {posts.dislikes}
                                    </span>
                                </div>                
                              )
                              }
                        })()}
                
                     </div>
                     {(() => {
                          if ( posts.userId === userId || userId === "62ded2ffb75bb970f2a22a66" ) {
                            return (
                              <div className="modify-delete">
                                <button type="submit" className="post-button delete-button" onClick={PostDelete}>Supprimer</button>
                                <button className="post-button modify-button" type="submit"><Link className="link-modify" to={`/Modify/${posts._id}`}>Modifier</Link></button>
                              </div>
                              
                            )
                          }
                      })()}
                    
                     
                     </form>
                </article>
      )
    }
      )}
      </div>
  )
}



  export default AddOneposts

  