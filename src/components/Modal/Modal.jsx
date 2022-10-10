import './style.scss';

export function Modal({ children, isOpen, onClose }) {
    if(isOpen){
        return (
            <div className="modal">
                <div className={`modal-close`} onClick={(e) => {
                    onClose();
                    }}>X</div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
