import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Contents = () => {
  const [confirmedData, setconfirmedData] = useState({
    labels: ['9월', '10월', '11월'],
    datasets: [
      {
        label: '국내 누적 확진자',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        'https://api.covid19api.com/total/dayone/country/kr',
      );
      makeData(res.data);
    };

    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.recovered;

        const findItem = acc.find((a) => a.year === year && a.month === month);
        if (!findItem) {
          acc.push({ year, month, date, confirmed, active, death, recovered });
        }
        if (findItem && findItem.date < date) {
          findItem.active = active;
          findItem.death = death;
          findItem.date = date;
          findItem.year = year;
          findItem.month = month;
          findItem.recovered = recovered;
          findItem.confirmed = confirmed;
        }
        return acc;
      }, []);

      const labels = arr.map((a) => `${a.month + 1}월`);
      setconfirmedData({
        labels,
        datasets: [
          {
            label: '국내 누적 확진자',
            data: arr.map((a) => a.confirmed),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchEvents();
  });

  const options = {
    title: {
      display: true,
      text: '누적 확진자 추이',
      fontSize: 16,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
  };

  return (
    <div className="section">
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div className="bar">
          <Bar data={confirmedData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Contents;
