

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
        });
}

export default PostDislike
