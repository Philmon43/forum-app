import React, { useEffect, useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/LogIn/Login";
import Question from "./Components/Question/Question";
import QuestionApi from "./Api/QuestionApi";
import Content from "./Components/Question/Content";


const App = () => {
  const [loginModal, setLogInModal ] = useState(false);
  const [qustionModal, setQuestionModal ] = useState(false);
  const [session, setSession] = useState(JSON.parse(localStorage.getItem("user")) || null );
  const [data, setData ] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await QuestionApi.get("/question");
      setData(data)
    }

    fetchData()
  }, [qustionModal]);

  useEffect(() => {
    if(localStorage.getItem("user")){
      setSession(JSON.parse(localStorage.getItem("user")))
    }
  }, []);

  const onLogInClick = () => {
    setLogInModal(true)
  }

  const onAnswerBtnClick = () => {
    console.log("asnwer btn clicked")
  }

  const onNewQuestionClick = () => {
    if(session){
      setQuestionModal(true)
    }
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
          handleButtonClick={onNewQuestionClick}
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
      <div className="main__content">
          <Content data={data} />
      </div>
      <div className="__rigth_sidebar"></div>
    </div>

    {loginModal&&<Modal cancelModal={ () => setLogInModal(false)}><Login onUserLogIn={handleUserLogIn} /></Modal>}
    {qustionModal&&<Modal cancelModal={ () => setQuestionModal(false)}><Question onCancelQuestionModal={() => setQuestionModal(false)} /></Modal>}
  </div>
}

export default App;