import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,} from '@fortawesome/free-solid-svg-icons';


let PostDelete = (e) => {
  alert("deleted");
  console.log("delete maaggle")
  e.preventDefault();


    async function deletePost() {
        await fetch('http://localhost:8000/api/post/:id', { method: 'DELETE' });
    }

    deletePost();

}

const  AddOneposts =  () => {

  const [data, setData] = useState ([])

  useEffect (() => {
    fetch("http://localhost:8000/api/post/")
    .then(res => {
      (res.json().then(aaaa => setData(aaaa) ))
    })
  },[])
  
  return (
    <div>

    {/* data.map = (comme boucle for mais pour tout ce qui se trouve) */}

    {data.length !== 0 && data.map((posts,i) =>  {
      return (
                <article key={i}>
                     <h2 className="all-names">{posts.name}&nbsp;{posts.forename}</h2>
                     <h2 className="job">{posts.job}</h2>
                     <div>
                     <img src={posts.imageUrl} alt=""/>
                     <p>{posts.post}</p>
                     
                     <div className="like-dislike">
                         <span>
                         {posts.likes}
                         <FontAwesomeIcon icon={faThumbsUp} />
                         </span>
                         <span>
                         {posts.dislikes}
                         <FontAwesomeIcon icon={faThumbsDown} />
                         </span>
                     </div>
                
                     </div>
                     <form>
                     <button type="submit" onClick={PostDelete}>Supprimer</button>
                     <button type="submit">Modifier (juste pour la personne ayant poster)</button>
                     </form>
                </article>
      )
    }
      )}
      </div>
  )
}



  export default AddOneposts

  