import { FormasDePagamento } from "./FormasDePagamento";
import { Logo } from "./Logo";
import { RazaoSocial } from "./RazaoSocial";
import { RedesSociais } from "./RedesSociais";
import { Sobre } from "./Sobre";

export function Top() {
    return (
        <section className="top">
            <div className="column">
                <Logo/>
            </div>
            <div className="column ">
                <RedesSociais/>
                <FormasDePagamento/>
            </div>
            <div className="column ">
                <Sobre/>
            </div>
            <div className="column ">
                <RazaoSocial/>
            </div>
        </section>
    );
}