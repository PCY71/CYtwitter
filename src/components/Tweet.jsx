import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import styled from 'styled-components';

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delte this tweet?");
        if (ok) {
            //delete tweet\
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        } else {
            //cancel
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewTweet(value);
    }

    return (
        <TweetDiv>
            {editing ?
                <>
                    {isOwner &&
                        <>
                            <FormEdit onSubmit={onSubmit}>
                                <FormInput
                                    type="text"
                                    placeholder='Edit your Tweet'
                                    value={newTweet}
                                    onChange={onChange}
                                    required />
                                <FormBtn type="submit" value="Update Tweet" />
                            </FormEdit>
                            <CancelBtn onClick={toggleEditing}>Cancel</CancelBtn>
                        </>
                    }
                </>
                :
                (<>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} witdh="50px" height="50px" />}
                    {isOwner && (
                        <TweetActions>
                            <span onClick={onDeleteClick}>
                                <FaTrash />
                            </span>
                            <span onClick={toggleEditing}>
                                <FaPencilAlt />
                            </span>
                        </TweetActions>
                    )}
                </>)
            }
        </TweetDiv>
    );
}

export default Tweet;

const TweetDiv = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 40px;
background-color: white;
width: 100%;
max-width: 400px;
padding: 20px;
border-radius: 10px;
position: relative;
color: rgba(0, 0, 0, 0.8);
$ h4{
    font-size: 14px;
}
& img{
    position: absolute;
    right: -10px;
    top: 20px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
}
`;
const FormEdit = styled.form`
width: 100%;
max-width: 320px;
display: flex;
flex-direction: column;
cursor: pointer;
margin-top: 15px;
margin-bottom: 5px;
`;
const FormInput = styled.input`
width: 100%;
padding: 10px 20px;
border-radius: 20px;
border: 1px solid black;
text-align: center;
background-color: white;
color: black;
`;
const FormBtn = styled.input`
cursor: pointer;
width: 100%;
padding: 7px 20px;
text-align: center;
color: white;
border-radius: 20px;
background-color: #04aaff;
cursor: pointer;
`;
const CancelBtn = styled.span`
cursor: pointer;
width: 100%;
padding: 7px 20px;
text-align: center;
color: white;
border-radius: 20px;
background-color: tomato;
`;
const TweetActions = styled.div`
position: absolute;
right: 10px;
top: 10px;
& span {
    cursor: pointer;
}
& span:first-child {
    margin-right: 10px;
}
`;