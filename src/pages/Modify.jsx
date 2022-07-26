import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom';


const Modify = () => {

    const [post, setPost] = useState([])

    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8000/api/post/${id}`)
            .then(res => {
                (res.json()
                    .then(response => setPost(response)))
            })
    }, [])

    const [image, setImage] = useState("baseImage");
    const [text, setText] = useState(null);

    let imgUrl;
    if (image === "baseImage") {
        imgUrl = post.imageUrl
    } else if (image !== "baseImage" && image !== null) {
        imgUrl = URL.createObjectURL(image)
    }
    let txtafficher;
    if (text === null) {
        txtafficher = post.post
    } else {
        txtafficher = text
    }

    console.log(post.post)


    const formData = new FormData();
    formData.append("image", image);
    formData.append("post", text);
    formData.append("cookies", document.cookie)


    let PostModify = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/post/${post._id}`, formData,{headers:{'Authorization':`${document.cookie}`}});

    }





    return (
        <article key={post._id} id={post._id}>
            <form>
                <h2 className="all-names">{post.name}&nbsp;{post.forename}</h2>
                <h2 className="job">{post.job}</h2>
                <div >
                    {(image &&
                        <div>
                            <img alt="not fount" width={"250px"} src={imgUrl} />
                            <br />
                            <button onClick={() => setImage(null)}>Remove</button>
                        </div>
                    )}
                    <br />

                    <br />
                    <input
                        type="file"
                        name="myimage"
                        onChange={(event) => {
                            setImage(event.target.files[0]);
                        }}
                    />
                </div>
                <textarea className="text-addpost" value={txtafficher} onChange={(e) => setText(e.target.value)} name="text" rows="12" cols="35"></textarea>

                <button type="submit" onClick={PostModify} ><Link to={`/`}>Modifier</Link></button>

            </form>
        </article>
    )

}



export default Modify