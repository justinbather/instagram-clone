import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TopNav } from "./components/TopNav";
import { Stories } from "./components/Stories";
import { Feed } from "./components/Feed";
import { Navbar } from "../components/Navbar";

export const Home = () => {
    const [feed, setFeed] = useState([])
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const fetchFeed = async () => {
        try {
          const response = await axios.get('http://localhost:8082/user/home', {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
      
          // Assuming res.data.following and res.data.users are valid properties in the response
          setFeed(response.data.following);
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error fetching feed:", error);
          // Handle the error or display a user-friendly message
        }
      };

      const followUser = async (username) => {
        try {
            await axios.post(`http://localhost:8082/user/follow`, {username:username}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((res) => {
                alert(`Follow Successful`)
            })
        } catch (err) {
            alert("Failed to follow user")
        }
      }

      const handleLogout = async () => {
        await axios.get('http://localhost:8082/auth/logout', 
        {
            headers: {
                "Content-Type": "application/json",
                withCredentials: true
            }
        })
        .then((res) => {
            navigate('/login');
        })
        .catch((err) => {
            alert(`Error logging user out code: ${err}`)
        })
      }

    useEffect(() => {
        fetchFeed();
    }, [])

    return (
        <>
        <div className="flex flex-col w-screen h-screen bg-black">
            <div>
                <TopNav />
            </div>
            <div>
                <Stories />
            </div>
            <div>
                <Feed />
            </div>
            
            <a onClick={handleLogout}>Logout</a>
            <h1>Your feed</h1>
            {feed && feed.map((user) => (<a  className="text-lg text-white">{user}</a>))}
            { users && users.map((user) => (<a onClick={(e) => followUser(user.username)}>{user.username}</a>))}
        </div>
        <div className="w-full bottom-0 fixed">
            <Navbar />
        </div>
    </>
    )
};