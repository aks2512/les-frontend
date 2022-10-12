import './style.scss';

export function ModalTest({ isOpen, onClose , children }) {
    return (
        <>
            {
                isOpen && (
                    <div className="modal-custom container">
                        <button className='modal-fechar' onClick={onClose}>X</button>
                        <div className="modal-content">
                            {children}
                        </div>
                    </div>
                )
            }
        </>
    );
}