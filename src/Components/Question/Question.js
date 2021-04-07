import React, { useState } from "react";
import Button from "../Button";
import "./quesion.css";
import QuestionApi from "../../Api/QuestionApi";

const Question  = ({onCancelQuestionModal}) => {
    const [val, setVal ] = useState("");
    const [ option , setOption ] = useState("");


    const onPostNewQuestion = async () => {
        // eslint-disable-next-line no-unused-vars
        const { data } = await QuestionApi.post("/question", {
            createdBy: JSON.parse(localStorage.getItem("user")).name,
            comment: [],
            dislikes: [],
            likes: [],
            question: val,
            createdAt: Date.now(),
            topic: option
          })
        onCancelQuestionModal()
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
            <select value={option} onChange={e => setOption(e.target.value)}>
                <option>select topic</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JAVASCRIPT</option>
                <option value="react">REACT</option>
                <option value="nodejs">NODEJS</option>
            </select>
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