import React, { useState } from 'react';
import { authService } from '../fbase';
import styled from 'styled-components';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let data
        try {
            if (newAccount) {
                //create user
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                )
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
            console.log(error.message)
        }
    }

    return (
        <>
            <Container onSubmit={onSubmit}>
                <AuthInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required value={email}
                    onChange={onChange}
                />
                <AuthInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required value={password}
                    onChange={onChange}
                />
                <AuthSubmit
                    type='submit'
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {error && <AuthError>{error}</AuthError>}
            </Container>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        </>
    );
}

export default AuthForm;

const Container = styled.form`
display: flex;
width: 100%;
max-width: 320px;
flex-direction: column;
`;

const AuthInput = styled.input`
max-width: 320px;
width: 100%;
padding: 10px;
border-radius: 30px;
border: none;
background-color: rgba(255, 255, 255, 1);
margin-bottom: 10px;
font-size: 12px;
color: black;
`;

const AuthSubmit = styled(AuthInput)`
text-align: center;
background: #04aaff;
color: white;
margin-top: 10;
cursor: pointer;
`;

const AuthError = styled.span`
`;