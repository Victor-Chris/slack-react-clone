import React, { useState } from 'react';
import firebase from 'firebase';
import './ChatInput.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import { Input } from '@material-ui/core';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const sendMessage = e =>{
        e.preventDefault();

        if(channelId){
            db.collection('rooms').doc(channelId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp,
                user: user.displayName,
                UserImage: user.photoURL
            })
        }

        setInput("");
    };

    return (
        <div className="chatInput">
            <form>
                <input 
                    value={input}
                    onChange={e => setInput()}
                    placeholder={`Message #${channelName}`}
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
}

export default ChatInput;