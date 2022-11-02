import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'pie',
        data: [1, 2, 3]
    }]
}

export function GraficoPizza({ percentage }) {
    const [chart, setChart] = useState();

    useEffect(() => {
        setChart({
            title: {
                text: `Ranking anual dos ${percentage?.length} produtos mais lucrativos`
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