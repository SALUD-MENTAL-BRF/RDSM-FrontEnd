import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  TimeScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { socialHabilityHistoryDto } from '../../../../types/activity/socialHability.dto';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  TimeScale,
  LineElement,
  PointElement
);

interface ChartsProps {
  activities: socialHabilityHistoryDto[];
}

export const GraphicsSocialHability: React.FC<ChartsProps> = ({ activities }) => {
  const [pieDataState, setPieData] = useState({
        labels: ['Respuestas Correctas', 'Respuestas Incorrectas'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
  })

  const complexityCount = activities.reduce((acc, activity) => {
    acc[activity.complexity] = (acc[activity.complexity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);


const actividadesPorMes = activities.reduce((acc, activity) => {
    const mes = new Date(activity.createdAt).getMonth(); 
    acc[mes] = (acc[mes] || 0) + 1; 
    return acc;
  }, Array(12).fill(0));
  
  const barData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: 'Número de Actividades',
        data: actividadesPorMes, // Usamos los datos calculados
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const handleChangeFilterPie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    
    let filterHistory: socialHabilityHistoryDto[] = activities;
  

    if (value === "Normal" || value === "Fácil" || value === "Difícil") {
      filterHistory = activities.filter((activity) => activity.complexity === value);
    }
  

    if (filterHistory.length < 1) {
      setPieData({
        labels: ['Respuestas Correctas', 'Respuestas Incorrectas'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      });
      return;
    }
  

    const correctAnswers = filterHistory.filter(
      (activity) => activity.answer.toString() === activity.correctResponse
    ).length;
    const incorrectAnswers = filterHistory.length - correctAnswers;

    setPieData({
      labels: ['Respuestas Correctas', 'Respuestas Incorrectas'],
      datasets: [
        {
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    });
  };
  

  useEffect(() => {
    const correctAnswers = activities.filter(
        (activity) => activity.answer.toString() === activity.correctResponse
      ).length;
      const incorrectAnswers = activities.length - correctAnswers;
    
      const pieData = {
        labels: ['Respuestas Correctas', 'Respuestas Incorrectas'],
        datasets: [
          {
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };

      setPieData(pieData)
  },[activities])
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row justify-content-center">
              <h5 className="card-title w-100 text-center">Distribución de Respuestas</h5>
              <table className="text-center" id="myTable">
                    <thead>
                        <tr>
                            <th>Complejidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td valign="top" width="50" align="center">
                                <select
                                    style={{ textTransform: "none" }}
                                    className="w-25 text-center"
                                    onChange={handleChangeFilterPie}
                                >
                                    <option value="0">--</option>
                                    <option value="Fácil">Fácil</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Difícil">Difícil</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
              <div className="w-50">
                <Pie key={`pie-${pieDataState.datasets[0].data[0]}-${pieDataState.datasets[0].data[1]}`} data={pieDataState} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 mt-2">
        <div className="card">
          <div className="card-body">
            <div className='d-flex row justify-content-center'>
                <h5 className="card-title w-100 text-center">Actividad</h5>
                    <Bar key={`bar-${Object.keys(complexityCount).join('-')}`} data={barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
