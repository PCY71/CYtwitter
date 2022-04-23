import React, { useState } from 'react';
import { authService } from '../fbase';

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
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required value={password}
                    onChange={onChange}
                />
                <input type='submit' value={newAccount ? "Create Account" : "Log In"} />
                <div>
                    {error}
                </div>
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        </>
    );
}

export default AuthForm;