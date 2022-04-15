import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    
    const getTweets = async () =>{
        const data = await dbService.collection("tweets").get();
        data.forEach((doc) => {
            const docObj = {
                // keys : createAt, tweet, id
                ...doc.data(),
                id : doc.id,
            }
            setTweets((prev) => [...prev, docObj]);
        })        
    };

    useEffect(() =>{
        getTweets();
    }, [])

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

    console.log(tweets)

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What's on your mind?" value={tweet} maxLength={120} onChange={onChange} />
            <input type="submit" value="Tweet" />
        </form>
        <div>
            {tweets.map(tweet => 
                    <div key={tweet.id}>
                        <h4>{tweet.tweet}</h4>
                    </div>
                )}
        </div>
    </div>
    );
};

export default Home;