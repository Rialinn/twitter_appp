import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./CreateTweetForm.module.css";
import { Button, Form } from "react-bootstrap";

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') {
      inputRef.current.focus();
      return
    }
    addTweet(content);
    setContent("");
    console.log(inputRef.current.value);
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      <Form.Label htmlFor="content">
        <h4>whats in you mind?</h4>
      </Form.Label>

      <Form.Control
      className="mb-4"
        type="text"
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={inputRef}
      />

      <Button type="submit">Tweet</Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func,
};

export default CreateTweetForm;