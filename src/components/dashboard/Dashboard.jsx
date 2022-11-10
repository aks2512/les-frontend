import api from '../../api';
import { GraficoColuna } from './partials/GraficoColuna';
import { GraficoPizza } from './partials/GraficoPizza';
import { Resultado } from './partials/Resultados';
import { useState, useEffect } from 'react';
import './style.scss';

export function Dashboard() {
    const [data, setData] = useState();
    const [params, setParams] = useState({
        start_date: new Date(),
        end_date: new Date(),
        timespan: '1 month',
        noGroup: true
    });

    async function loadDashboardData() {
        const response = await api.get('/dashboard', { params });
        setData(response.data);
    }

    useEffect(() => {
        loadDashboardData();
    }, [params]);

    return (
        <div className="dashboard">
            <div className="container py-4">
                <label htmlFor="start_date">Data Inicial</label>
                <input type="month" name="start_date" onChange={(e) => {
                    setParams({
                        ...params, start_date: e.target.value
                    })
                }} />
                <label htmlFor="end_date">Data Final</label>
                <input type="month" name="end_date" onChange={(e) => {
                    setParams({
                        ...params, end_date: e.target.value
                    })
                }} />
                <select name="timespan" onChange={(e) => {
                    setParams({
                        ...params, timespan: e.target.value
                    })
                }}>
                    <option value="1 month">1 Mês</option>
                    <option value="3 months">3 Meses</option>
                    <option value="6 months">6 Meses</option>
                    <option value="1 year">1 Ano</option>
                </select>
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