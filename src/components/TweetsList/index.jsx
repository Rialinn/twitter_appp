import { Suspense, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import { ErrorBoundary } from "react-error-boundary";
import Tweet from "../Tweet";
import CreateTweetForm from "../CreateTweetForm";
// import { data } from "../../data/data";
import axios from "axios";

import "./TweetsList.module.css";

// vite env vars -> https://vitejs.dev/guide/env-and-mode
console.log(import.meta.env.MODE);
const serverUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "https://rtt-11-twitter-backend.onrender.com";


function TweetsList() {
  const [tweets, setTweets] = useState(null); // initial value is now null

  // useEffect is used to fetch the tweets when the component is rendered
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`${serverUrl}/tweets`);
        console.log(res.data);
        setTweets([...res.data]); // here the data is set to the state
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // addTweet will make a POST request and create a new tweet
  const addTweet = async (newTweet) => {
    try {
      const res = await axios.post(`${serverUrl}/tweets`, {
        newTweet,
        username: "rlt423",
      });
      console.log(res.data);
      setTweets([res.data, ...tweets]); // new tweet is added to the state
    } catch (error) {
      console.log(error);
    }
  };

  // removeTweet will make a DELETE request and delete a tweet by the id
  const removeTweet = async (tweetId) => {
    try {
      const res = await axios.delete(`${serverUrl}/tweets/${tweetId}`);
      // if request was 'ok' remove from app state
      if (res.status === 200) {
        setTweets(tweets.filter((t) => t._id !== tweetId));
      } else {
        throw Error("Error deleting tweet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTweet = async (tweetId, newTweetContent) => {
    try {
      const res = await axios.put(`${serverUrl}/tweets/${tweetId}`, {newTweetContent});

      // if request was 'ok' remove from app state
      if (res.status === 200) {
        setTweets(
          tweets.map((t) => {
            if (t._id === tweetId) {
              return {
                ...t,
                content:res.data.content,
              };
            } else {
              return t;
            }
          }),
        );
      } else {
        throw Error("Error updating tweet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <CreateTweetForm addTweet={addTweet} />

      <ErrorBoundary fallback={<div>Error loading Tweets!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            {tweets &&
              tweets.map((item) => (
                <Tweet
                  tweet={item}
                  key={item._id}
                  removeTweet={removeTweet}
                  updateTweet={updateTweet}
                />
              ))}
          </section>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TweetsList;
