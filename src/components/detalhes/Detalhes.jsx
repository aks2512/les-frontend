import lego from '../../assets/imgs/lego.svg';
import star from '../../assets/imgs/star.svg';

import './style.scss';

export function Detalhes() {
    return (
        <div className="produto-detalhes row">
            <div className="col-12 col-md-4">

                <div className="produto-img">
                    <img src={lego} alt="" />
                </div>

                <div className="information">
                    <h4>Requisitos</h4>
                    <div>
                        <p><span><strong>Playstation</strong></span></p>
                    </div>
                </div>

                <div className="information">
                    <h4>Itens Inclusos</h4>
                    <div>
                        <p><span><strong>Encarte</strong></span></p>
                        <p><span><strong>Mídia</strong></span></p>
                    </div>
                </div>

                <div className="information">
                    <h4>Garantia</h4>
                    <div>
                        <p><span><strong>3 meses contra defeitos de fabricação</strong></span></p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8">
                <h4 className="titulo">Jogo Uma Aventura LEGO 2 Videogame - PS4</h4>

                <ul className="stars">
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                </ul>

                <h4 className="preco">R$ 59,89</h4>

                <button className="buy">Comprar</button>
                
                <div className="descricao">
                    <h4>Descrição</h4>
                    <p>The LEGO Movie Videogame 2 é um jogo de aventura em terceira pessoa que retrata os acontecimentos do segundo longa-metragem de sucesso da franquia LEGO. O jogo é ambientado em um cenário composto em sua totalidade pelas peças de plástico montáveis que fazem sucesso pelo mundo todo tanto no público infantil quanto no adulto.

Os invasores alienígenas deixaram a cidade de Bricksburg em ruínas e sequestraram os amigos de Emmet, o construtor. Para salvar seus amigos, o protagonista e um grupo de heróis devem ir além do seu mundo e encarar os estranhos habitantes do sistema Systar. Aventure-se no espaço, descubra novos planetas e teste suas habilidades de Mestre Construtor com peças extraterrestres.</p>
                </div>

                <div className="information">
                    <h4>Especificações</h4>
                    <div className="even">
                        <div>
                            <p><strong>Desenvolvedora</strong></p>
                            <p>Lego</p>
                        </div>
                        <div>
                            <p><strong>Publicadora</strong></p>
                            <p> WB Games</p>
                        </div>
                        <div>
                            <p><strong>Data de lançamento</strong></p>
                            <p>27/02/2019</p>
                        </div>
                        <div>
                            <p><strong>Idioma</strong></p>
                            <p>Português BR</p>
                        </div>
                        <div>
                            <p><strong>Legendado</strong></p>
                            <p>Português BR</p>
                        </div>
                        <div>
                            <p><strong>Idade recomendada</strong></p>
                            <p>Livre para todas as idades</p>
                        </div>
                        <div>
                            <p><strong>Numero de jogadores offine</strong></p>
                            <p>1 até 2</p>
                        </div>
                        <div>
                            <p><strong>Numero de jogadores online</strong></p>
                            <p>-</p>
                        </div>
                        <div>
                            <p><strong>Resolução</strong></p>
                            <p>Até 1080p</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}