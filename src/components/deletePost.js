
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown,} from '@fortawesome/free-solid-svg-icons';


let PostDelete = (posts) => {
        

    async function deletePost() {
        await fetch(`http://localhost:8000/api/post/${posts._id}`, { 
          method: 'delete',
        });
    }
    console.log("delete maaggle")

    deletePost();

}



export default PostDelete

