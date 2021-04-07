import React, { useEffect, useState } from "react";
import QuestionApi from "../Api/QuestionApi";
import { A } from "hookrouter";
import "./questions.css";

const QuestionNotAnswered = () => {
    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await QuestionApi.get("/question");
            const questionNoComments = data.filter(d => d.comment.length === 0);
            setQuestions(questionNoComments)
        }
        fetchData()
    }, []);

    return (
        <div className="links_container">
            {questions && questions.map((q) => {
                return <div key={q.id}><A href={`question/${q.id}`}>{q.question}</A></div>
            })}
        </div>
    )
}

export default QuestionNotAnswered;
