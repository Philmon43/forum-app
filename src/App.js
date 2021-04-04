import React, { useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/LogIn/Login";
import "./app.css";

const App = (props) => {

  const [modal, setModal] = useState(null)

  const onLogInClick = () => {
    setModal(<Login />)
  }

  const onAnswerBtnClick = () => {
    console.log("asnwer btn clicked")
  }

  const onAsNewQuestionClick = () => {
    console.log("ask new question click")
  }
  
  return <div>
    <div className="header">
      <div className="title">Forum</div>

      <Input name="search" placeholder="Search " tooltip=" 🔍 " />
      <div className="ask__ans">
        <Button
          name="Ask"
          type="write"
          handleButtonClick={onAsNewQuestionClick}
        />

        <Button
          name="Answer"
          type="write"
          handleButtonClick={onAnswerBtnClick}
        />
      </div>

      <Button
        name="LogIn"
        type="LogIn"
        handleButtonClick={onLogInClick}
      />

    </div>
    <div className="main__body">
      <div className="__left_sidebar"></div>
      <div className="__main">

      </div>
      <div className="__rigth_sidebar"></div>
    </div>

    {modal && <Modal cancelModal={() => setModal(null)}>{modal}</Modal>}
  </div>
}

export default App;