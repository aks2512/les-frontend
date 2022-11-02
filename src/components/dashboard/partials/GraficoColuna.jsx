import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export function GraficoColuna({ months }) {
    const [chart, setChart] = useState();

    useEffect(() => {
        setChart({
            title: {
                text: `Lucro bruto por mês nos últimos ${months?.length} meses`
            },
            xAxis: {
                categories: months && months.map(month => `${month.month}/${month.year}`)
            },
            series: [{
                type: 'column',
                name: 'Lucro (R$)',
                data: months && months.map(month => {
                    return {
                        name: month.month,
                        y: Number(month.total_sales)
                    }
                })
            }]
        });
    }, [months]);

    return (
        <div className="grafico-barras" >
            <HighchartsReact highcharts={Highcharts} options={chart} />
        </div>
    );
}