import React, { useState, useEffect } from "react";
import ChartComponent from "../../components/ChartComponent";
import Loader from "../../components/Loader";
import useAxios from "../../hooks/useAxios";

function Analytics() {
  const API = useAxios();
  const [departmentPie, setDepartmentPie] = useState([
    "Freelance & Business",
    "External Relations",
    "Sessions & Workshops",
    "Events & Activities",
    "Social Media & Marketing",
  ]);
  const [countPie, setCountPie] = useState([0, 0, 0, 0, 0]);
  const [totalVisitsAnalyticsBar, setTotalVisitsAnalyticsBar] = useState([0]);
  const [uniqueVisitsAnalyticsBar, setUniqueVisitsAnalyticsBar] = useState([0]);
  const [month, setMonths] = useState(["Jan"]);
  const [projectAnalytics, setprojectAnalytics] = useState([0]);
  const [projectMonths, setProjectMonths] = useState(["Jan"]);
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const [isLoading, setIsLoading] = useState(true);

  const GetDepartmentPieData = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(
        `${process.env.REACT_APP_API_URL}dashboard-analytics`
      );
      setDepartmentPie(data.MemberAnalytics.map((item) => item.department));
      setCountPie(data?.MemberAnalytics.map((item) => item.count));
      setprojectAnalytics(data.ProjectAnalytics?.counts);
      setProjectMonths(data?.ProjectAnalytics?.months);
      setTotalVisitsAnalyticsBar(
        data?.VisitorAnalytics?.monthlyStats?.map((item) => item.totalVisits)
      );
      setUniqueVisitsAnalyticsBar(
        data?.VisitorAnalytics?.monthlyStats?.map((item) => item.uniqueVisitors)
      );
      setMonths(
        data?.VisitorAnalytics?.monthlyStats?.map((item) => item.month)
      );
    } catch (error) {
      console.error("Failed to fetch pie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetDepartmentPieData();
  }, []);

  const pieData = {
    labels: departmentPie,
    datasets: [
      {
        data: countPie,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: month || ["Jan"],
    datasets: [
      {
        label: "Total Visits",
        data: totalVisitsAnalyticsBar || [],
        backgroundColor: "#37a2eb",
        borderWidth: 0,
        fill: true,
      },
      {
        label: "Unique Visitors",
        data: uniqueVisitsAnalyticsBar || [],
        backgroundColor: "#ff6485",

        borderWidth: 0,
        fill: true,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Website Traffic Analytics",
        color: "#ffffff",
        font: {
          size: 24,
          weight: 400,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (context) =>
            context.tick.value === 0 ? "#eee" : "transparent",
          drawTicks: false,
          drawBorder: true,
        },
        ticks: { color: "#eee" },
      },
      x: {
        beginAtZero: true,
        grid: {
          color: (context) =>
            context.tick && context.index === 0 ? "#eee" : "transparent",
          drawTicks: false,
          drawBorder: true,
        },
        ticks: { color: "#eee" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barTotalData = {
    labels: ["Total Visits", "Unique Visitors"],
    datasets: [
      {
        label: "total visits VS unique visitors",
        data: [509, 7],
        backgroundColor: ["#37a2eb", "#ff6485"],
        borderWidth: 0,
      },
    ],
  };

  const barTotalOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 17,
            weight: 400,
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const barProjectsData = {
    labels: projectMonths,
    datasets: [
      {
        label: "Projects Analytics",
        data: projectAnalytics,
        backgroundColor: "#37a2eb",
        borderWidth: 0,
      },
    ],
  };

  const barProjectsOptions = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // Removes grid lines inside the chart
          drawTicks: false, // Removes small tick marks on the axis
        },
        ticks: {
          color: "#eee",
        },
        border: {
          display: true, // Show the y-axis line
          color: "#eee",
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // Removes grid lines inside the chart
          drawTicks: false, // Removes small tick marks on the axis
        },
        ticks: {
          color: "#eee",
        },
        border: {
          display: true, // Show the x-axis line
          color: "#eee",
        },
      },
    },
  };

  return (
    <div className="w-full h-full rounded-lg p-3 bg-[#ffffff00] overflow-hidden">
      {isLoading && <Loader />}
      <div className="w-full h-full rounded-lg flex flex-col gap-3">
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-therd h-full rounded-lg flex items-center py-3 justify-between">
            <div className="pl-3">
              {departmentPie.map((dep, i) => (
                <div
                  className="flex items-center gap-1 text-nowrap py-2"
                  key={dep}
                >
                  <span
                    style={{ backgroundColor: colors[i] }}
                    className="w-7 h-3.5 border-[0.5px] border-secondary block rounded-[1px]"
                  ></span>
                  {`${dep}`}
                  <span className="font-bold text-lg">{countPie[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex-1 flex justify-center items-center h-full">
              {!isLoading && (
                <ChartComponent
                  options={pieOptions}
                  data={pieData}
                  type="pie"
                />
              )}
            </div>
          </div>
          <div className="flex-1 bg-therd h-full p-3 rounded-lg">
            <ChartComponent
              className="h-full w-full"
              options={{
                ...barProjectsOptions,
                maintainAspectRatio: false,
              }}
              data={barProjectsData}
              type="bar"
            />
          </div>
        </div>
        <div className="flex flex-1 gap-3 overflow-hidden">
          <div className="w-[300px] p-3 bg-therd h-full rounded-lg">
            <ChartComponent
              className="h-full w-full"
              options={{
                ...barTotalOptions,
                maintainAspectRatio: false,
              }}
              data={barTotalData}
              type="bar"
            />
          </div>
          <div className="flex-1 bg-therd h-full overflow-hidden py-1 px-2 rounded-lg">
            {" "}
            <ChartComponent
              className="h-full w-full"
              options={{
                ...barOptions,
                maintainAspectRatio: false,
              }}
              data={barData}
              type="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
