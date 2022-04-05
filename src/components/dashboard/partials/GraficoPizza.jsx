import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'pie',
        data: [1, 2, 3]
    }]
}

export function GraficoPizza() {

    return (
        <div className="grafico-pizza">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}