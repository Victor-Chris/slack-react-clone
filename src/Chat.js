import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatInput from './ChatInput';
import { useParams } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined"
import db from './firebase';
import Message from './Message';

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setroomDetails] = useState(null);
    const [roomMessages, setroomMessages] = useState([]);

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setroomDetails(snapshot.data())
            ))
        }

        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => (
            setroomMessages(
                snapshot.docs.map(doc => doc.data())
            )
        ))
    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>
            <div className="chat__mesasages">
                {/** Loop through messages */}
                {roomMessages.map(({ message, timestamp, user, userImage }) => (
                    <Message 
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>
            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
        </div>
    );
}

export default Chat;
