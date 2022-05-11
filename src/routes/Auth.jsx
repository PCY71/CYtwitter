import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from 'styled-components'
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstance } from '../fbase';

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }

    return (
        <AuthContainer>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <AuthBtns>
                <AuthBtn name="google" onClick={onSocialClick}>
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </AuthBtn>
                <AuthBtn name="github" onClick={onSocialClick}>
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </AuthBtn>
            </AuthBtns>
        </AuthContainer>
    );
};
export default Auth;

//styled
const AuthContainer = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
justify-content: center;
align-items: center;
`;

const AuthBtns = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
max-width: 320px;
`;

const AuthBtn = styled.button`
cursor: pointer;
border-radius: 20px;
border: none;
padding: 10px 0px;
font-size: 12px;
text-align: center;
width: 150px;
background: white;
`;