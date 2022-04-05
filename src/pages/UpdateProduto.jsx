import { useState } from "react";

import { AdminCustomForm } from "../components/adminCustomForm/AdminCustomForm";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function UpdateProduto() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [item1, setItem1] = useState('');
    const [item2, setItem2] = useState('');
    const [garantia, setGarantia] = useState('');
    const [desenvolvedora, setDesenvolvedora] = useState('');
    const [publicadora, setPublicadora] = useState('');
    const [dataDeLancamento, setDataDeLancamento] = useState('');
    const [idioma, setIdioma] = useState('');
    const [legenda, setLegenda] = useState('');
    const [idadeRecomendada, setIdadeRecomendada] = useState('');
    const [jogadoresOffline, setJogadoresOffline] = useState('');
    const [jogadoresOnline, setJogadoresOnline] = useState('');
    const [resolucao, setResolucao] = useState('');

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">   

                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">

                    <AdminCustomForm>
                        <h4>Atualizar  produto</h4>

                        <div className="row justify-content-center">

                            <div className="col-12 col-md-6">
                                <p><strong>Dados do produto</strong></p>

                                <fieldset>
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
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

                                <fieldset>
                                    <label htmlFor="item1">Itens inclusos</label>
                                    <input id="item1" value={item1} onChange={(e) => setItem1(e.target.value)}/>
                                    <input id="item2" value={item2} onChange={(e) => setItem2(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="garantia">Garantia</label>
                                    <input id="garantia" value={garantia} onChange={(e) => setGarantia(e.target.value)}/>
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

                                <fieldset>
                                    <label htmlFor="idade_recomendada">Idade recomendada</label>
                                    <input id="idade_recomendada" value={idadeRecomendada} onChange={(e) => setIdadeRecomendada(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="jogadores_offline">Numero de jogadores offline</label>
                                    <input id="jogadores_offline" value={jogadoresOffline} onChange={(e) => setJogadoresOffline(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="jogadores_online">Numero de jogadores online</label>
                                    <input id="jogadores_online" value={jogadoresOnline} onChange={(e) => setJogadoresOnline(e.target.value)}/>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="resolucao">Resolução</label>
                                    <input id="resolucao" value={resolucao} onChange={(e) => setResolucao(e.target.value)}/>
                                </fieldset>

                            </div>

                        </div>

                        <div className="btns">
                            <button className="voltar">Voltar</button>
                            <button className="submit">Atualizar</button>
                        </div>
                        
                    </AdminCustomForm>
                </div>
            </div>
        </main>
    );
}