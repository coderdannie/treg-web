import React from 'react';
import Chart from 'react-apexcharts';

const AreaChart = ({ dates = [], totals = [] }) => {
  const options = {
    maintainAspectRatio: false,
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: '16px',
      },
      theme: 'dark',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: dates,
      labels: {
        show: true,
        style: {
          colors: '#475467',
          fontSize: '13px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    grid: {
      show: true,
      borderColor: '#F2F2F2',
    },
    fill: {
      colors: '#2463EB',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#2463EB'],
  };

  const series = [
    {
      name: 'Transactions',
      data: totals,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="290px"
      />
    </div>
  );
};

export default AreaChart;
