import { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import Button from "react-bootstrap/Button";
import UpdateTweetForm from "../UpdateTweetForm";

function Tweet({ tweet, removeTweet, updateTweet }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* MODAL  */}
      {showModal &&
        createPortal(
          <UpdateTweetForm onClose={() => setShowModal(false)} tweet={tweet} updateTweet={updateTweet}/>,
          document.body,
        )}

      <div className="border p-3 my-3">
        <div>@{tweet.username}</div>
        <div className="h6">{tweet.content}</div>

        <div className="d-flex">
          <div className="mx-2">
            <FaHeart /> {tweet.likes}
          </div>
          <div>
            <LiaRetweetSolid size={22} /> {tweet.retweets}
          </div>
        </div>

        <div className="mt-2">
          <Button
            variant="danger"
            className="mx-2"
            onClick={() => removeTweet(tweet._id)}
          >
            delete
          </Button>
          <Button
            variant="info"
            className="mx-2"
            onClick={() => setShowModal(true)}
          >
            update
          </Button>
        </div>
      </div>
    </>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.object,
  removeTweet: PropTypes.func,
  updateTweet: PropTypes.func,
};

export default Tweet;