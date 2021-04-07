import React, { useEffect, useState } from "react";
import { usePath } from 'hookrouter';
import QuestionApi from "../Api/QuestionApi";
import "./pagbyid.css";
import moment from "moment";
import PageLoading from "../Components/PageLoading";
import Button from "../Components/Button";

const TextArea = ({ children, value }) => {
    const [val, setVal] = useState("")
    const handleChange = (e) => {
        setVal(e.target.value)
        value(e.target.value)
    }
    return (
            <>
                <textarea value={val} onChange={handleChange} className="comment_textarea" placeholder="Your answer..."></textarea>
                {children}
            </>
    )
}
const FontAwesomButton = ({data, type, handleClick}) => {
    return (
        <div>{data} <i className={type} onClick={handleClick}></i></div>
    )
}

const Card = ({ question, children }) => {
    return (
        <div className="container">
            <div className="content__container">
                <div className="user_icon"></div>
                <div className="user_name"><span>asked by </span>{question.createdBy}</div>
                <div className="card_body">{question.question}</div>
                <div className="card_item">
                    {children}
                </div>
            </div>
        </div>
    )
}

const Comments = ({ data }) => {
    return (
        <div className="comment_cards">
            {data&&data.map((item, i) => {
                 return  <div className="comment_card" key={i}>
                            <div className="user_icon"></div>
                            <div className="user_name">{ item }</div>
                        </div>
            })}
        </div>
    )
}


const PageById = () => {
    const path = usePath();
    const [question, setQuestion] = useState(null)
    const [update, setUpdate] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [ comment, setComment ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await QuestionApi.get(path);
            setQuestion(data)
        }
        fetchData()
    }, [path], [update])

     
    const onLikeClick = async () => {
        const email = JSON.parse(localStorage.getItem("user")).email
        const likes = question.likes
        if (!likes.includes(email)) {
            likes.push(email)
            const { data } = await QuestionApi.put(path, { likes })
            setUpdate(data)
        }
    }
    const onDisLikeClick = async () => {
        const email = JSON.parse(localStorage.getItem("user")).email
        const dislikes = question.dislikes
        if (!dislikes.includes(email)) {
            dislikes.push(email)
            const { data } = await QuestionApi.put(path, { dislikes })
           setUpdate(data)
        }
    }
    const onCommentClick = () => {
        setShowComment(true)
    }

    const onCancelComment = () => setShowComment(false)

    const onComent = async () => {
        const preComment = question.comment;
        preComment.push(comment)
        const { data } = await QuestionApi.put(path, { comment: preComment });
        setUpdate(data)
        onCancelComment()
    }


    return (
        <div className="comment_section">
            {question ?
                <Card question={question}>
                    <FontAwesomButton data={question.likes.length} type="fas fa-thumbs-up" handleClick={ onLikeClick } />
                    <FontAwesomButton data={question.dislikes.length} type="fas fa-thumbs-down" handleClick={ onDisLikeClick } />
                    <FontAwesomButton data={question.comment.length}  type="fas fa-comment" handleClick={ onCommentClick } />
                    <div>{moment(question.createdAt).startOf('hour').fromNow()}</div>
                </Card>
                : <PageLoading />}
            {showComment &&
                <TextArea value={val => setComment(val)}>
                <div className="comment__btns">
                    <Button
                        name="Cancel"
                        type="write"
                        handleButtonClick={onCancelComment}
                    />
                    <Button
                        name="Done"
                        type="write"
                        handleButtonClick={onComent}
                    />
                </div>
            </TextArea>
            }
            <Comments data={question && question.comment} />
        </div>
    )
}

export default PageById;