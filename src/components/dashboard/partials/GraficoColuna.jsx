import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export function GraficoColuna({ data }) {
    const [chart, setChart] = useState();

    useEffect(() => {
        let columns = {
            sales: [],
            coupons: [],
            profit: [],
        };

        data && data.map(item => {
            columns.sales.push([
                item.timestamp, Number(item.value)
            ]);
            columns.coupons.push([
                item.timestamp, Number(item.coupomgen)
            ]);
            columns.profit.push([
                item.timestamp, (Number(item.value) - Number(item.coupomgen))
            ]);
        })

        console.log(data)
        console.log(columns);

        setChart({
            chart: {
                alignTicks: false
            },

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'AAPL Stock Volume'
            },

            series: [
                {
                    type: 'column',
                    name: 'Vendas',
                    data: columns.sales,
                    dataGrouping: {
                        units: [
                            [
                                'week', // unit name
                                [1] // allowed multiples
                            ],
                            [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]
                        ]
                    }
                },
                {
                    type: 'column',
                    name: 'Cupons',
                    data: columns.coupons,
                    dataGrouping: {
                        units: [
                            [
                                'week', // unit name
                                [1] // allowed multiples
                            ],
                            [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]
                        ]
                    }
                },
                {
                    type: 'column',
                    name: 'Perfil',
                    data: columns.profit,
                    dataGrouping: {
                        units: [
                            [
                                'week', // unit name
                                [1] // allowed multiples
                            ],
                            [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]
                        ]
                    }
                }
            ]
        });
    }, [data]);

    return (
        <div width="100%" className="grafico-barras" >
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={chart} />
        </div>
    );
}