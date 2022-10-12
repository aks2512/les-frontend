import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { CarrinhoEnderecos } from "../components/carrinhoEnderecos/CarrinhoEnderecos";
import { CarrinhoProdutos } from "../components/carrinhoProdutos/CarrinhoProdutos";
import { CartBody } from "../components/cartBody/CartBody";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Pagamento } from "../components/pagamento/Pagamento";
import { WhiteBox } from "../components/whiteBox/WhiteBox";
import { Context } from "../contexts/AuthContext";

export function Carrinho() {
    return (
        <>
            <Header/>
            <main>
                <div className="container py-5">
                    <CartBody />
                </div>
            </main>
            <Footer/>
        </>
    );
}