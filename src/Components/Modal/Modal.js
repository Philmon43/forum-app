import "./modal.css"
const Modal = ({children, cancelModal}) => {
    return <div className="modal">
        <div className="modal__box">
            <div className="cancel__modal" onClick={cancelModal}> ✖️ </div>
            {children}
        </div>
    </div>
}

export default Modal;