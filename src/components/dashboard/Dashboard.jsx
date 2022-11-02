import api from '../../api';
import { GraficoColuna } from './partials/GraficoColuna';
import { GraficoPizza } from './partials/GraficoPizza';
import { Resultado } from './partials/Resultados';
import { useState, useEffect } from 'react';
import './style.scss';

export function Dashboard() {
    const [data, setData] = useState();

    async function loadDashboardData() {
        const response = await api.get('/dashboard');
        setData(response.data);
    }

    useEffect(() => {
        loadDashboardData();
    }, []);

    return (
        <div className="dashboard">
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 pb-2">
                        <GraficoColuna months={data?.dated?.months} />
                    </div>
                    <div className="col-12 col-md-5 pb-2">
                        <Resultado data={data?.dated} />
                    </div>
                    <div className="col-12 col-md-7 pb-2">
                        <GraficoPizza percentage={data?.ranking} />
                    </div>
                </div>
            </div>
        </div>
    );
}