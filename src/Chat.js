import "./Chat.css";

import React, { useEffect, useRef, useState } from "react";
import { selectChannelId, selectChannelName } from "./features/appSlice";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ChatHeader from "./ChatHeader";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector(selectUser);

  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    scrollToBottom();

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} channelId={channelId} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key={message.timestamp}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              channelName ? `Message #${channelName}` : `Select a channel`
            }
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
