import React, { useState } from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../fbase';
import styled from 'styled-components';

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();

        }
        const tweetObj = {
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setTweet(value);
    };
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);

    return (
        <FactoryForm onSubmit={onSubmit}>
            <FactoryContainer>
                <FactoryInput
                    type="text"
                    placeholder="What's on your mind?"
                    value={tweet}
                    maxLength={120}
                    onChange={onChange}
                />
                <FactoryArrow type="submit" value="&rarr;" />
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </FactoryContainer>
            <FactoryInputLabel for="attach-file">
                <FaPlus />
                <span> Add photos</span>
            </FactoryInputLabel>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <FactoryFormAttachment>
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <FactoryFormClear>
                        <span>Remove</span>
                        <FaTimes />
                    </FactoryFormClear>
                </FactoryFormAttachment>
            )}
        </FactoryForm>
    );
}

export default TweetFactory;

const FactoryForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`;

const FactoryContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
align-items: center;
flex-wrap: wrap;
position: relative;
margin-bottom: 20px;
`;

const FactoryInput = styled.input`
flex-grow: 1;
height: 40px;
padding: 0px 20px;
color: white;
border: 1px solid #04aaff;
border-radius: 20px;
font-weight: 500;
font-size: 12px;
`;

const FactoryArrow = styled.input`
position: absolute;
right: 0;
background-color: #04aaff;
height: 40px;
width: 40px;
padding: 10px 0px;
text-align: center;
border-radius: 20px;
border:none;
color: white;
`;

const FactoryInputLabel = styled.label`
color: #04aaff;
cursor: pointer;
`;

const FactoryFormAttachment = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const FactoryFormClear = styled.div`
color: #04aaff;
cursor: pointer;
text-align: center;
`;