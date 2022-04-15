import React, { useState } from 'react';
import { dbService } from '../fbase';

const Home = () => {
    const [tweet, setTweet] = useState("");
    
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createAt: Date.now(),
        });
        setTweet("");
    };
    const onChange = (event) =>{
        const {target:{value}} = event;
        setTweet(value);
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What's on your mind?" value={tweet} maxLength={120} onChange={onChange} />
            <input type="submit" value="Tweet" />
        </form>
    </div>
    );
};

export default Home;