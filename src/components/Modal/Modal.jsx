import './style.scss';

const Modal = ({ setIsOpen }) => (
    <div className="modal">
        <div className={`modal-close`} onClick={(e) => {setIsOpen(false)}}>X</div>
        <div className="modal-content">
            Tester
        </div>
    </div>
)

export { Modal };
