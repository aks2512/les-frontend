import './style.scss';

export function Modal({ isOpen, onClose, children }) {
    return (
        <>
            {
                isOpen && (
                    <div className="modal__custom">
                        <div className="modal__custom__content">
                            {
                                onClose && (
                                    <button className="modal__custom__fechar" onClick={onClose}>X</button>
                                )
                            }
                            <div className="modal__custom__box">
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}