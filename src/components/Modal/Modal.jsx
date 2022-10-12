import './style.scss';

export function ModalTest({ isOpen, setIsOpen , children }) {
    return (
        <>
            {
                isOpen && (
                    <div className="modal-custom container">
                        <button className='modal-fechar' onClick={() => setIsOpen(false)}>X</button>
                        <div className="modal-content">
                            {children}
                        </div>
                    </div>
                )
            }
        </>
    );
}