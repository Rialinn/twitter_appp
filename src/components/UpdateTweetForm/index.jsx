import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

function UpdateTweetForm({ tweet, setShowModal, updateTweet }) {
  const [newTweetContent, setNewTweetContent] = useState(tweet.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTweet(tweet.id, newTweetContent);
    setShowModal(false);
  };

  return (
    <div
      className="modal show"
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal.Dialog style={{minWidth: '500px'}}>
        <IoMdClose className="m-2 " onClick={() => setShowModal(false)} />
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              value={newTweetContent}
              onChange={(e) => setNewTweetContent(e.target.value)}
            />

            <Button type="submit" variant="success" className="mt-2">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

UpdateTweetForm.propTypes = {
  tweet: PropTypes.object,
  setShowModal: PropTypes.func,
  updateTweet: PropTypes.func,
};

export default UpdateTweetForm;