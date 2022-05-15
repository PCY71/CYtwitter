import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from '../fbase';
import styled from 'styled-components';

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    }

    const getMyTweets = async () => {
        const tweets = await dbService
            .collection("tweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt", "asc")
            .get();
    };

    useEffect(() => {
        getMyTweets();
    }, [])

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    return (
        <div className='twitter_container' style={{ maxWidth: 400, flexDirection: "column" }}>
            <ProfileForm onSubmit={onSubmit}>
                <FormInput
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <FormBtn type="submit" value="Update Profile" />
            </ProfileForm>
            <LogOutBtn onClick={onLogOutClick}>Log Out</LogOutBtn>
        </div>
    );
};

export default Profile;

const ProfileForm = styled.form`
border-bottom: 1px solid rgba(255, 255, 255, 0.9);
padding-bottom: 30px;
margin-bottom: 20px;
width: 100%;
display: flex;
flex-direction: column;
`;
const FormInput = styled.input`
width: 100%;
padding: 10px 20px;
margin-bottom: 10px;
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
const LogOutBtn = styled.span`
cursor: pointer;
width: 100%;
margin-bottom: 10px;
padding: 7px 20px;
text-align: center;
color: white;
border-radius: 20px;
background-color: tomato;
`