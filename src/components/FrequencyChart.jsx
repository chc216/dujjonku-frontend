import ReactApexChart from "react-apexcharts";

function FrequencyChart({
  frequency,
  type = "area",
  color = "#69cf24",
  ygrid_show = true,
  show_axis = true,
}) {
  const entries = Object.entries(frequency).reverse();
  const list = [{ name: "빈도수", data: entries.map(([, count]) => count) }];

  const options = {
    chart: {
      type: type,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Plus Jakarta Sans",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    colors: [color],
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: ygrid_show },
      },
    },
    markers: { size: 0 },
    xaxis: {
      categories: entries.map(([week]) => {
        const n = week.replace("week", "");
        return n === "1" ? "이번 주" : `${n - 1}주 전`;
      }),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9e9e9e", fontSize: "12px" },
        show: show_axis,
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9e9e9e", fontSize: "12px" },
        show: show_axis,
      },
    },
    tooltip: { theme: "light" },
  };

  return (
    <ReactApexChart
      options={options}
      series={list}
      type={type}
      height="100%"
      width="100%"
    />
  );
}

export default FrequencyChart;
