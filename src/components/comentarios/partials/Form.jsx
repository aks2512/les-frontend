import { useState } from "react";

export function Form(props) {
    const [mensagem, setMensagem] = useState('');
    const [avaliacao, setAvaliacao] = useState('0');

    return (
        <div className="avaliacao-form">
            <form>
                <h4>Envie sua avaliação</h4>
                <fieldset>
                    <input type="text" id="mensagem" value={mensagem} placeholder="Escreva uma mensagem" onChange={(e) => setMensagem(e.target.value)} />
                    <input type="number" min="0" max="5" value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)} />
                </fieldset>

                <button className="submit-avaliacao">Enviar</button>
            </form>
        </div>
    );
}