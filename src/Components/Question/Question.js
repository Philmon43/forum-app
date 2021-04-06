import React, { useState } from "react";
import Button from "../Button";
import "./quesion.css";
import QuestionApi from "../../Api/QuestionApi";

const Question  = ({onCancelQuestionModal}) => {
    const [val, setVal ] = useState("");


    const onPostNewQuestion = async () => {
        const { data } = await QuestionApi.post("/question", {
            createdBy: JSON.parse(localStorage.getItem("user")).name,
            comment: [],
            poll: 0,
            dislikes: 0,
            likes: 0,
            question: val,
          })
        onCancelQuestionModal()
        console.log( data )
    }

    return <div className="quesion">
        <div className="q_header">
           <h4>Tips on getting good answers quickly</h4>
           <ul>
               <li>Make sure your question has not been asked already</li>
               <li>Keep your question short and to the point</li>
               <li>Double-check grammar and spelling</li>
           </ul>
        </div>
        <div className="q_body">
            <textarea value={val} onChange={e => setVal(e.target.value)} placeholder='"Start your question with "What", "How", "Why", etc."'></textarea>
        </div>
        <div className="q_button">
            <Button
             name= "Cancel" 
             type="write"
             handleButtonClick={onCancelQuestionModal}
             />

            <Button
             name= "Post" 
             type="write"
             handleButtonClick={onPostNewQuestion}
             />
        </div>
    </div>
}

export default Question;