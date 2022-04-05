import { GraficoColuna } from './partials/GraficoColuna';
import { GraficoPizza } from './partials/GraficoPizza';
import { Resultado } from './partials/Resultados';

import './style.scss';

export function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 pb-2">
                        <GraficoColuna/>
                    </div>
                    <div className="col-12 col-md-5 pb-2">
                        <Resultado/>
                    </div>
                    <div className="col-12 col-md-7 pb-2">
                        <GraficoPizza/>
                    </div>
                </div>
            </div>
        </div>
    );
}