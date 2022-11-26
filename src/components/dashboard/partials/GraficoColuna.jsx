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

        console.log(data);

        data && data?.months?.map(item => {
            columns.sales.push([
                item.timestamp, Number(item.total_sales) || 0
            ]);
            columns.coupons.push([
                item.timestamp, Number(item.total_coupons) || 0
            ]);
            columns.profit.push([
                item.timestamp, (Number(item.total_sales) - Number(item.total_coupons)) || 0
            ]);
        })

        // setChart({
        //     title: {
        //         text: `Grafíco de Vendas`
        //     },
        //     chart: {
        //         alignTicks: false
        //     },
        //     xAxis: {
        //         categories: data && data?.months?.map(month => month.month)
        //     },
        //     series: [{
        //         type: 'column',
        //         name: 'Lucro (R$)',
        //         data: columns.sales
        //     },
        //     {
        //         type: 'column',
        //         name: 'Cupons de troca (R$)',
        //         data: columns.coupons

        //     }, {
        //         type: 'column',
        //         name: 'Lucro líquido (R$)',
        //         data: columns.profit
        //     }]
        // });

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