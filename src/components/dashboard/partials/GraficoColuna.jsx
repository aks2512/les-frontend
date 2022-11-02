import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export function GraficoColuna({ months }) {
    const [chart, setChart] = useState();

    useEffect(() => {
        let columns = {
            sales: [],
            coupons: [],
            profit: [],
        };

        months && months.map(month => {
            columns.sales.push({
                name: month.month,
                y: Number(month.total_sales)
            });
            columns.coupons.push({
                y: Number(month.total_coupomgen)
            });
            columns.profit.push({
                y: Number(month.total_sales) - Number(month.total_coupomgen)
            });
        })

        setChart({
            title: {
                text: `Lucro por mês nos últimos ${months?.length} meses`
            },
            xAxis: {
                categories: months && months.map(month => `${month.month}/${month.year}`)
            },
            series: [{
                type: 'column',
                name: 'Lucro (R$)',
                data: columns.sales
            }, {
                type: 'column',
                name: 'Cupons de troca (R$)',
                data: columns.coupons
            }, {
                type: 'column',
                name: 'Lucro líquido (R$)',
                data: columns.profit
            }]
        });
    }, [months]);

    return (
        <div className="grafico-barras" >
            <HighchartsReact highcharts={Highcharts} options={chart} />
        </div>
    );
}