import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'



const Modify = () => {

    const navigate = useNavigate()

    const [post, setPost] = useState([])

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/post/${id}`)
            .then(res => {
                (res.json()
                    .then(response => setPost(response)))
            })
    }, )

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

    const formData = new FormData();
    formData.append("image", image);
    formData.append("post", text);
    formData.append("cookies", document.cookie)

    let PostModify = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/post/${post._id}`, formData,{headers:{'Authorization':`${document.cookie}`}});

        setTimeout(() => {
            navigate("/Home")
        }, 2000);
    }

    return (
        <article className="modify-article" key={post._id} id={post._id}>
            <form className="modify-form">
                <h2 className="all-names modify-names">{post.name}&nbsp;{post.forename}</h2>
                <h2 className="job modify-job">{post.job}</h2>
                <div className="img-input">
                    {(image &&
                        <div className="img-create-post" >
                            <img alt="not fount" width={"250px"} src={imgUrl} />
                            <br />
                            
                        </div>
                    )}
                    <br />

                    <br />
                    <div className="input-img">
                        <input
                            className="img-button"
                            type="file"
                            name="myimage"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <textarea className="text-addpost" value={txtafficher} onChange={(e) => setText(e.target.value)} name="text" rows="12" cols="35"></textarea>

                <button className="post-button modify-button modify-page-button" type="submit" onClick={PostModify} >Modifier</button>

            </form>
        </article>
    )

}



export default Modify