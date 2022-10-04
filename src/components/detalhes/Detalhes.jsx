import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api';
import star from '../../assets/imgs/star.svg';

import './style.scss';

export function Detalhes() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [nome, setNome] = useState('');
    const [image, setImage] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [desenvolvedora, setDesenvolvedora] = useState('');
    const [publicadora, setPublicadora] = useState('');
    const [dataDeLancamento, setDataDeLancamento] = useState('');
    const [idioma, setIdioma] = useState('');
    const [legenda, setLegenda] = useState('');

    useEffect(() => {
        async function loadData() {
            if(id) {
                const response = await api.get(`/products/${id}`);
                if(response.status === 201) {
                    setNome(response.data.name);
                    setImage(response.data.image);
                    setPreco(response.data.price);
                    setDescricao(response.data.description);
                    setRequisitos(response.data.requirements);
                    setDesenvolvedora(response.data.developer);
                    setPublicadora(response.data.publisher);
                    setDataDeLancamento(response.data.release_date);
                    setIdioma(response.data.language);
                    setLegenda(response.data.subtitle);
                }
            }
        }
        loadData();
    }, [id]);

    return (
        <div className="produto-detalhes row">
            <div className="col-12 col-md-4">

                <div className="produto-img">
                    <img src={'http://localhost:3333/files' + '/' + image} alt="" />
                </div>

                <div className="information">
                    <h4>Requisitos</h4>
                    <div>
                        <p><span><strong>{requisitos}</strong></span></p>
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
                <h4 className="titulo">{nome}</h4>

                <ul className="stars">
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                    <li className="star"><img src={star} alt="" /></li>
                </ul>

                <h4 className="preco">R$ {preco}</h4>

                <button className="buy">Comprar</button>
                
                <div className="descricao">
                    <h4>Descrição</h4>
                    <p>{descricao}</p>
                </div>

                <div className="information">
                    <h4>Especificações</h4>
                    <div className="even">
                        <div>
                            <p><strong>Desenvolvedora</strong></p>
                            <p>{desenvolvedora}</p>
                        </div>
                        <div>
                            <p><strong>Publicadora</strong></p>
                            <p>{publicadora}</p>
                        </div>
                        <div>
                            <p><strong>Data de lançamento</strong></p>
                            <p>{dataDeLancamento}</p>
                        </div>
                        <div>
                            <p><strong>Idioma</strong></p>
                            <p>{idioma}</p>
                        </div>
                        <div>
                            <p><strong>Legendado</strong></p>
                            <p>{legenda}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}