import React from "react";
import ContentLoader from "react-content-loader";
import "./content.css";
import moment from "moment";

const Loader = () => {
    return (
        <ContentLoader
            speed={2}
            width={476}
            height={124}
            viewBox="0 0 476 124"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
        <rect x="48" y="8" rx="3" ry="3" width="900" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="20" cy="20" r="20" />
        </ContentLoader>
    )
}

const ContentCard = ({data}) => {
    return(
        data.sort((a, b) => b.createdAt - a.createdAt).map((content) => {
            return <div className="content__container" key={content.id} onClick={() => console.log("rout to", content.id)}>
                        <div className="user_icon"></div>
                        <div className="user_name"><span>asked by </span>{content.createdBy}</div>
                        <div className="card_body">{content.question}</div>
                        <div className="card_item">
                            <div>{content.likes} likes</div>
                            <div>{content.dislikes} Dislikes</div>
                            <div>{content.comment.length} Comments</div>
                            <div>{moment(content.createdAt).startOf('hour').fromNow()}</div>
                        </div>
                    </div>
        })
    )
}

const Content = ({data}) => {
    return (
        <div className="container">
            {!data||data.length===0?[...Array(6)].map((e, i) => <Loader key={i} />):<ContentCard data={data}/>}
        </div>
    )
}

export default Content;