import ReactApexChart from "react-apexcharts";

function FrequencyChart({ frequency }) {
  const entries = Object.entries(frequency).reverse();
  const list = [{ name: "빈도수", data: entries.map(([, count]) => count) }];

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Plus Jakarta Sans",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#69cf24"],
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    markers: { size: 0 },
    xaxis: {
      categories: entries.map(([week]) => {
        const n = week.replace("week", "");
        return n === "1" ? "이번 주" : `${n - 1}주 전`;
      }),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#9e9e9e", fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: "#9e9e9e", fontSize: "12px" } },
    },
    tooltip: { theme: "light" },
  };

  return (
    <ReactApexChart
      options={options}
      series={list}
      type="area"
      height="100%"
      width="100%"
    />
  );
}

export default FrequencyChart;
