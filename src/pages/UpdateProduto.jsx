import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from "../api";

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function UpdateProduto() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
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
                console.log(response.status)
                if(response.status === 200) {
                    setNome(response.data.name);
                    setPreco(response.data.price);
                    setDescricao(response.data.description);
                    setRequisitos(response.data.requirements);
                    setDesenvolvedora(response.data.developer);
                    setPublicadora(response.data.publisher);
                    setDataDeLancamento(response.data.release_date);
                    setIdioma(response.data.language);
                    setLegenda(response.data.subtitle);
                }
            } else {
                navigate('/admin-produtos');
            }
        }

        console.log('teste master')
        loadData();
    }, [id, navigate]);

    async function updateProduct(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('name', nome);
        fd.append('image', imagem, imagem.name);
        fd.append('description', descricao);
        fd.append('price', preco);
        fd.append('stock', 1);
        fd.append('requirements', requisitos);
        fd.append('publisher', publicadora);
        fd.append('developer', desenvolvedora);
        fd.append('language', idioma);
        fd.append('subtitle', legenda);
        fd.append('release_date', dataDeLancamento);

        try {
            await api.put(`products/${id}`, fd,
                {
                    onUploadProgress: progressEvent => {
                        console.log(Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
                    }
                }
            ).then(res => {
                console.log(res);
                if(res.status === 201) {
                    toast.success('Produto atualizado com sucesso!');
                    navigate('/admin-produtos');
                }
            })

            
        } catch (e) {
            toast.error(e?.response?.data?.message);
            navigate(`/update-produto?id=${id}`);
        }

    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">   

                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">

                    <AdminCustomForm onSubmit={updateProduct}>
                        <h4>Atualizar  produto</h4>

                        <div className="row justify-content-center">

                            <div className="col-12 col-md-6">
                                <p><strong>Dados do produto</strong></p>

                                <fieldset>
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="imagem">Imagem</label>
                                    <input 
                                        type="file" 
                                        id="imagem"
                                        required={true}
                                        onChange={(e) => setImagem(e.target.files[0])}
                                    />
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="preco">Preço</label>
                                    <input type="text" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="descricao">Descrição</label>
                                    <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="requisitos">Requisitos</label>
                                    <input id="requisitos" value={requisitos} onChange={(e) => setRequisitos(e.target.value)}/>
                                </fieldset>
                                
                            </div>

                            <div className="col-12 col-md-6">
                                <p><strong>Especifição</strong></p>

                                <fieldset>
                                    <label htmlFor="desenvolvedora">Desenvolvedora</label>
                                    <input id="desenvolvedora" value={desenvolvedora} onChange={(e) => setDesenvolvedora(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="publicadora">Publicadora</label>
                                    <input id="publicadora" value={publicadora} onChange={(e) => setPublicadora(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="data_de_lancamento">Data de lançamento</label>
                                    <input id="data_de_lancamento" value={dataDeLancamento} onChange={(e) => setDataDeLancamento(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="idioma">Idioma</label>
                                    <input id="idioma" value={idioma} onChange={(e) => setIdioma(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="legenda">Legenda</label>
                                    <input id="legenda" value={legenda} onChange={(e) => setLegenda(e.target.value)}/>
                                </fieldset>

                            </div>

                        </div>

                        <div className="btns">
                            <Link className="voltar" to="/admin-produtos">Voltar</Link>
                            <button className="submit">Atualizar</button>
                        </div>
                        
                    </AdminCustomForm>
                </div>
            </div>
        </main>
    );
}