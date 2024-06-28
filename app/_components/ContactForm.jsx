'use client'
import React, { useState, useRef, useEffect } from "react";

const ContactForm = () => {
  const [message, setMessage] = useState({ name: "", email: "", text: "" });
  const [showMailInput, setShowMailInput] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showMailError, setShowMailError] = useState(false);
  const [showTextError, setShowTextError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);

  const nameInputElement = useRef(null);
  const mailInputElement = useRef(null);
  const textInputElement = useRef(null);

  useEffect(() => {
    nameInputElement.current.focus();
  }, []);

  const onNameSubmit = () => {
    const nameIsValid = validateName();
    if (nameIsValid) {
      setShowMailInput(true);
      setTimeout(() => {
        mailInputElement.current.focus();
      }, 1);
    }
  };

  const onMailSubmit = () => {
    const mailIsValid = validateMail();
    if (mailIsValid) {
      setShowTextInput(true);
      setTimeout(() => {
        textInputElement.current.focus();
      }, 1);
    }
  };

  const validateName = () => {
    if (message.name.trim().length < 2) {
      setShowNameError(true);
      return false;
    } else {
      setShowNameError(false);
      return true;
    }
  };

  const validateMail = () => {
    if (
      message.email.trim().length < 6 ||
      !message.email.includes("@") ||
      !message.email.includes(".")
    ) {
      setShowMailError(true);
      return false;
    } else {
      setShowMailError(false);
      return true;
    }
  };

  const validateText = () => {
    if (message.text.trim().length < 6) {
      setShowTextError(true);
      return false;
    } else {
      setShowTextError(false);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textIsValid = validateText();
    if (textIsValid && !showMailError && !showTextError) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        if (response.ok) {
          alert('Message sent successfully!');
          setMessage({ name: "", email: "", text: "" });
          setShowMailInput(false);
          setShowTextInput(false);
        } else {
          alert('Failed to send message.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    } else {
      setShowTextError(true);
    }
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <div className="bg-black text-sm w-4/5 max-w-2xl min-h-96 rounded-md border border-gray-600 mx-auto my-8 font-mono">
      <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-t-md">
        <button className="bg-red-500 w-3 h-3 rounded-full" />
        <button className="bg-yellow-500 w-3 h-3 rounded-full" />
        <button className="bg-green-500 w-3 h-3 rounded-full" />
        <p className="text-white ">Contact@ShankarGanesh</p>
      </div>
      <div className="my-2">
        <p className="text-white"> Hey there! I am excited to connect with you</p>
      </div>

      <form name="contact" onSubmit={handleSubmit} className="p-4">
        <input type="hidden" name="form-name" value="contact" />
        <div className="mb-1">
          <p className="text-white mb-2">~$ To start, could you give us <span className="text-purple-300">your name?</span></p>
          <div className="flex items-center gap-2">
            <p className="text-slate-500"><span className="text-green-400">~</span> Enter Name:</p>
            <input
              type="text"
              name="name"
              value={message.name}
              ref={nameInputElement}
              onChange={(e) => setMessage({ ...message, name: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, onNameSubmit)}
              className="w-3/5 p-2 rounded-lg bg-transparent outline-0 text-white"
            />
          </div>
          {showNameError && (
            <div className="text-red-500 mt-2">I bet your name has more than one letter</div>
          )}
        </div>
        {showMailInput && (
          <div className="mb-1">
            <p className="text-white mb-2">~$ Awesome! What's <span className="text-purple-300">your email?</span></p>
            <div className="flex items-center gap-2">
              <p className="text-slate-500"><span className="text-green-400">~</span> Enter email:</p>
              <input
                type="email"
                name="mail"
                ref={mailInputElement}
                value={message.email}
                onChange={(e) => setMessage({ ...message, email: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, onMailSubmit)}
                className="w-3/5 p-2 rounded-lg bg-transparent outline-0 text-white"
              />
            </div>
            {showMailError && (
              <div className="text-red-500 mt-2">
                Your email is too short or doesn't contain crucial characters
              </div>
            )}
          </div>
        )}

        {showTextInput && (
          <div className="mb-1">
            <p className="text-white mb-2">~$ How can I <span className="text-purple-300">help you?</span></p>
            {showTextError && (
              <div className="text-red-500 mb-2">Please write a <span className="text-purple-300">bit more?</span></div>
            )}
            <p className="text-slate-500"><span className="text-green-400">~</span> Enter Text:</p>
            <textarea
              name="Text"
              cols="15"
              rows="2"
              ref={textInputElement}
              value={message.text}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              className="w-full p-2 rounded-lg bg-transparent outline-none text-white"
            />
            <button
              className="bg-white text-gray-800 p-2 rounded-lg mt-4 hover:bg-red-500 hover:text-white transition"
              type="submit"
            >
              Send message
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
