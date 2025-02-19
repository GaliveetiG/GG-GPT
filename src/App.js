import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/gayathri_g.png";
import gptImgLogo from "./assets/chatgpt.svg";
import { sendMsgToOpenAI } from "./openai";
import { useEffect, useState, useRef } from "react";

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState(""); //Api
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am GG GPT.",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text); //Api
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  }
    const handleEnter = async (e) => {
       if(e.key === 'Enter') await handleSend();

    }

const handelQuery = async (e) =>{
  const text = e.target.value;
    setMessages([...messages,
       { text, isBot: false }
      ]);
    const res = await sendMsgToOpenAI(text); //Api
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
}


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="imagelogo " className="logo" />
            <span className="brand">GG GPT</span>{" "}
          </div>
          <button className="midBtn"onClick={()=>{window.location.reload()}}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>

          <div className="uppserSideBottom">
            <button className="query" onClick={handelQuery} value={"what is programming?"}>
              <img src={msgIcon} alt="icon" />
              what is programming?
            </button>
            <button className="query" onClick={handelQuery} value={"How to use an API?"}>
              <img src={msgIcon} alt="icon" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="listItemsImg" />
            Home{" "}
          </div>
          <div className="listItems">
            <img src={saved} alt="saved" className="listItemsImg" />
            Saved{" "}
          </div>
          <div className="listItems">
            <img src={rocket} alt="rocket" className="listItemsImg" />
            Upgrade to Pro{" "}
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatImg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt="icon"
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message.."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="send " />
            </button>
          </div>

          <p>GG GPT can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
