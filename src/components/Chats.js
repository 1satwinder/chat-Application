import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);
    const handleLogout = async() => {
        await firebase.auth().signOut();
        history.push('/');
    }
    const getFile = async (url) => { 
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect( () => {
        if(!user){
            history.push('/');
            return;
        }  
        axios.get('https://api.chatengine.io/users/me', {
            headers : {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then( ()=> {
            setLoading(false);
        }).catch( () => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL).then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users',formdata, 
                { headers : { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}})
                .then( () =>  setLoading(false))
                .catch( (error) => console.log(error))
            })
        })
    }, [user,history]);

    if( !user || loading) return 'Loading...';

    return (
        <div className="chats-page">
             <div className="nav-bar">
                 <div className="logo-tab">
                     Unichat
                 </div>
                 <div className="logout-tab" onClick={handleLogout}>
                     Logout
                 </div>
             </div>
             <ChatEngine height="calc(100vh - 66px)"
              projectID = "c0c3708b-0354-4ff9-b0b9-e8e26fb5c86e"
              userName = {user.email}
              userSecret = {user.uid}/>
        </div>
    )
}

export default Chats;
