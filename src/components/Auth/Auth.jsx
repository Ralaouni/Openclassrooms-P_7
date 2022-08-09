
import { useNavigate } from "react-router-dom";



let Auth = async() => {

    const navigate = useNavigate()

    try {
        let res = await fetch("http://localhost:8000/api/auth/verify", {
        method: "GET",
        Accept: "application/json",
        headers:
        { 
          'Authorization':`${document.cookie}`,
          'Accept': 'multipart/form-data',
        },
      });
      let resJson = await res.json()
      console.log(resJson)
      if (resJson !== true) {
        navigate('/')
        return;
      }

    } catch (error) {
        navigate('/')
    }


}
export default Auth