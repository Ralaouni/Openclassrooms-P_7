function addpost () {
  const article = document.createElement("article")
  article.setAttribute("class","post")
  all-post.appendChild(article)
  
  const image = document.createElement("img")
  article.appendChild(image)
  
  const name = document.createElement("h2")
  name.innerText = &{value.name} &{value.forename}
  article.appendChild(name)
  
  const text = document.createElement("p")
  article.appendChild(text)
  
  const form = document.createElement("form")
  article.appendChild(form)
  
  const inputtext = document.createElement("input")
  inputtext.setAttribute("type","text")
  inputtext.setAttribute("value","text")
  inputtext.setAttribute("placeholder","text")
  form.appendChild(inputtext)
  
  const comment = document.createElement("button")
  button.setAttribute("type", "submit")
  button.innerText = "Commenter"
  form.appendChild(comment)
  
  const modify = document.createElement("button")
  modify.setAttribute("type", "submit")
  modify.innerText = "Commenter"
  form.appendChild(modify)
}