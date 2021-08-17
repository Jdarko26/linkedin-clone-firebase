import React, { useEffect, useState } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import InputOption from './InputOption';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import { db } from "./firebase";
import firebase from 'firebase';
import {  useSelector } from 'react-redux';
import { selectUser} from './features/userSlice';
import FlipMove from 'react-flip-move';




export default function Feed() {
    
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
   
    const user = useSelector(selectUser);

    
    useEffect(() => {
        db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )));
        });
    }, []);

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl : user.photoURL || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    };
   
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input type="text"  placeholder="Post something" value={input} onChange={e => setInput(e.target.value)} />
                        <button onClick = {sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#7085f9" />
                 <InputOption Icon={SubscriptionsIcon} title="View"  color="#E7A33E"/>
                <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                 <InputOption Icon={CalendarViewDayIcon} title="Write article"  color="#77C15E"/>
                </div>
                
            </div>
            <FlipMove> 
            {posts.map(({id,data :{ name, description,message, photoUrl, timestamp}}) => ( 
                < Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                    timestamp= {timestamp}
                />
        ))}
      </FlipMove>  
        </div>
    )
}
