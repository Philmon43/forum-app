import React, { useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/LogIn/Login";
import "./app.css";

const App = () => {
  const [loginModal, setLogInModal ] = useState(false);
  const [session, setSession] = useState(JSON.parse(localStorage.getItem("user")) || null );

  const onLogInClick = () => {
    setLogInModal(true)
  }

  const onAnswerBtnClick = () => {
    console.log("asnwer btn clicked")
  }

  const askNewQuestion = () => {
    console.log("ask new question click");
  }

  const handleUserLogIn = () => {
    setLogInModal(false);
    setSession(JSON.parse(localStorage.getItem("user")))
  }
  
  const onProfileClick = () => {
    console.log("user")
  }

  return <div>
    <div className="header">
      <div className="title">Forum</div>

      <Input data={val => val} name="search" placeholder="Search " tooltip=" 🔍 " />
      <div className="ask__ans">
        <Button
          name="Ask"
          type="write"
          handleButtonClick={askNewQuestion}
        />

        <Button
          name="Answer"
          type="write"
          handleButtonClick={onAnswerBtnClick}
        />
      </div>

      {session?<Button
        type="user"
        handleButtonClick={onProfileClick}
      />:<Button
      name="LogIn"
      type="LogIn"
      handleButtonClick={onLogInClick}
    />}

    </div>
    <div className="main">
      <div className="__left_sidebar"></div>
      <div className="main__content"></div>
      <div className="__rigth_sidebar"></div>
    </div>

    {loginModal&&<Modal cancelModal={ () => setLogInModal(false)}><Login onUserLogIn={handleUserLogIn} /></Modal>}
  </div>
}

export default App;