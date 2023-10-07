import { useEffect, useState } from "react"
import { Post } from "../Home/components/Post"
import { useParams } from "react-router-dom";
import axios from "axios";




const PostView = () => {

    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState({})

    const {usernameParam} = useParams();
    const {postId} = useParams



    useEffect(() => {

        try {
            axios.post('http://localhost:8082/') 
        } catch(err) {

        }



    }, [])

    return (<div>
                <Post />
            </div>
    
    )
}