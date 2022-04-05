import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'column',
        data: [1, 2, 3]
    }]
}

export function GraficoColuna() {

    return (
        <div className="grafico-barras">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}