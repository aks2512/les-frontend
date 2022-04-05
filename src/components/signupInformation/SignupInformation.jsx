import { Link } from "react-router-dom";

import './style.scss'

export function SignupInformation() {
    return (
        <div className="signup-information">
            <h3>Ainda não sou cadastrado</h3>

            <div className="content">
                <p><strong>Primeiro acesso?</strong><br/>faça aqui seu primeiro cadastro</p>
                <Link to="/signup">Cadastrar</Link>
            </div>

            <div className="disclaimer">
                <p>Em nossa Loja Virtual Trabalhamos com Produtos de alto giro e produtos de edições Limitadas, o qual se esgotam rapidamente.</p>
                
                <p>Todos nossos produtos são enviados com toda comodidade através dos Correios.</p>
                
                <p>trabalhamos apenas com produtos originais e novos.</p>
                
                <p>Somente vendemos produtos Originais, garantindo assim a satisfação total de nossos clientes. Buscamos os melhores fornecedores e os melhores e mais atualizados produtos para que o nosso público encontre a variedade, a seleção e a qualidade que procura.</p>
            </div>
        </div>
    );
}