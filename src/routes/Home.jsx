import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { dbService } from '../fbase';

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() =>{
        dbService.collection("tweets").onSnapshot(snapshot => {
            setTweets(snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data()
            })));
        })
    }, [])

    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.multiFactor.user.uid,
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
        <div>
            {tweets.map(tweet => 
                    <Tweet 
                    key={tweet.id} 
                    tweetObj={tweet} 
                    isOwner={tweet.creatorId === userObj.uid}/>
                )}
        </div>
    </div>
    );
};

export default Home;