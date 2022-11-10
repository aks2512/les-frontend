import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export function GraficoPizza({ percentage }) {
    const [chart, setChart] = useState();

    useEffect(() => {
        setChart({
            title: {
                text: `Ranking dos ${percentage?.length} produtos mais lucrativos`
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [{
                name: '%',
                type: 'pie',
                data: percentage && percentage.map(product => {
                    return {
                        name: product.product_name,
                        y: Number(product.percentage_product)
                    }
                })
            }]
        });
    }, [percentage]);

    return (
        <div className="grafico-pizza">
            <HighchartsReact highcharts={Highcharts} options={chart} />
        </div>
    );
}