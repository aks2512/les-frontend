import { useState } from 'react';

import { Comentario } from './partials/Comentario';
import { Form } from './partials/Form';

import './style.scss';

export function Comentarios() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleForm() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="comentarios row jsutify-content-center">
            <h4>Comentarios</h4>

            <div className="comentarios-container">
                <Comentario/>
                <Comentario/>
            </div>

            <button className="btn-avaliacao" onClick={toggleForm}>Escrever Avialação</button>

            {isOpen && <Form toggleForm={toggleForm} />}
        </div>
    );
}