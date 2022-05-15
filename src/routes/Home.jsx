import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import TweetFactory from '../components/TweetFactory';
import { dbService, storageService } from '../fbase';
import styled from 'styled-components';

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
        <div className='twitter_container'>
            <Wrapper>
                <TweetFactory userObj={userObj} />
                <div>
                    {tweets.map(tweet =>
                        <Tweet
                            key={tweet.id}
                            tweetObj={tweet}
                            isOwner={tweet.creatorId === userObj.uid} />
                    )}
                </div>
            </Wrapper>
        </div>
    );
};

export default Home;

const Wrapper = styled.div`
width: 100%;
max-width: 400px;
display: flex;
flex-direction: column;
`;