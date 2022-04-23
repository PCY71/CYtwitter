import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import TweetFactory from '../components/TweetFactory';
import { dbService, storageService } from '../fbase';

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot => {
            setTweets(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        })
    }, [])

    return (
        <div>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map(tweet =>
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    );
};

export default Home;