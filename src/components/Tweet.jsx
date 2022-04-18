import React, { useState } from 'react';
import { dbService } from '../fbase';

const Tweet = ({tweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delte this tweet?");
        if(ok){
            //delete tweet\
            console.log(tweetObj.id);
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }else{
            //cancel
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    }
    const onChange = (event) =>{
        const {target:{value}} = event;
        setNewTweet(value);
    }

    return (
    <div>
        {
            editing
            ? 
            <>
                {isOwner &&
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                            type="text" 
                            placeholder='Edit your Tweet'
                            value={newTweet} 
                            onChange={onChange}
                            required />
                            <input type="submit" value="Update Tweet"/>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                }
            </>
            :
            (<>
                <h4>{tweetObj.text}</h4>
                {
                    isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Tweet</button>
                        <button onClick={toggleEditing}>Edit Tweet</button>
                    </>
                )}
            </>)
        }
    </div>
    );}

export default Tweet;