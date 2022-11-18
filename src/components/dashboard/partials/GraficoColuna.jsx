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

        data && data.items.map(item => {
            columns.sales.push([
                Number(item.timestamp), Number(item.value)
            ]);
            columns.coupons.push([
                Number(item.timestamp), Number(item.coupomgen) || 0
            ]);
            columns.profit.push([
                Number(item.timestamp), (Number(item.value) - Number(item.coupomgen))
            ]);
        })

        console.log(data)
        console.log(columns);

        setChart({
            chart: {
                alignTicks: false
            },

            rangeSelector: {

                buttons: [{
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 4
            },

            title: {
                text: 'Totalização de vendas'
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