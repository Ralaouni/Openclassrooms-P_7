
import { useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown,} from '@fortawesome/free-solid-svg-icons';


let PostDelete =(e) => {
  alert("deleted");
  console.log("delete maaggle")
  e.preventDefault();
  useEffect(() => {

    async function deletePost() {
        await fetch('http://localhost:8000/api/post/:id', { method: 'DELETE' });
    }

    deletePost();
}, []);
}


function postinDOM (value, i){
  const article = document.createElement("article")
  article.setAttribute("class","post")
  document.getElementById("all-post").appendChild(article)
  
  const image = document.createElement("img")
  // image.innerHTML = `<img src=${value[i]["imageUrl"]}>`;
  article.appendChild(image)
  
  const name = document.createElement("h2")
  name.innerText = `${value[i]["name"]} ${value[i]["forename"]}`
  article.appendChild(name)

  const divtextlike = document.createElement("div")
  article.appendChild(divtextlike)
  
  const text = document.createElement("p")
  text.innerText = `${value[i]["post"]}`
  divtextlike.appendChild(text)

  const likedislike = document.createElement("div")
  likedislike.setAttribute("className", "like-dislike")
  divtextlike.appendChild(likedislike)

  const plike = document.createElement("p")
  likedislike.appendChild(plike)
  plike.innerText = `${value[i]["likes"]}`

  plike.innerHTML = `<FontAwesomeIcon icon={faThumbsUp}/>`

  const pdislike = document.createElement("p")
  likedislike.appendChild(pdislike)
  pdislike.innerText = `${value[i]["dislikes"]}`

  pdislike.innerHTML = `<FontAwesomeIcon icon={faThumbsUp}/>`
  
  const form = document.createElement("form")
  article.appendChild(form)

  const suppr = document.createElement("button")
  suppr.setAttribute("type", "submit")
  suppr.setAttribute("onClick",PostDelete)
  suppr.innerText = "Supprimer"
  form.appendChild(suppr)

  const modify = document.createElement("button")
  modify.setAttribute("type", "submit")
  modify.innerText = "Modifier"
  form.appendChild(modify)
}


function Allposts () {

  useEffect (() => {
    fetch("http://localhost:8000/api/post/")
    .then(function(res){
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value){
      for (let i = value.length-1 ; i >= 0; i--) {
        postinDOM(value, i)
      }
    })
  .catch(function(err){
    console.log('une erreur est survenue')
  })
  }, [])
}

export default Allposts

