function createChart(element, chartType, labels, data, colors) {
  new Chart(element, {
      type: chartType,
      data: {
          labels: labels,
          datasets: [{
              label: `%`,
              data: data,
              borderWidth: 1,
              backgroundColor: colors,
              hoverOffset: 4
          }]
      }
  });
};

export default createChart;