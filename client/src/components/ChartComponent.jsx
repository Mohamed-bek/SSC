// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const ChartComponent = ({ data, options, type = "bar" }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");
//       if (ctx) {
//         if (chartInstance.current) {
//           chartInstance.current.destroy();
//         }
//         chartInstance.current = new Chart(ctx, {
//           type: type,
//           data: data,
//           options: options,
//         });
//       }
//     }
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [data, type, options]);

//   return <canvas ref={chartRef} />;
// };

// export default ChartComponent;
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data, options, type = "bar" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Safely destroy the previous instance
    try {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    } catch (e) {
      console.error("Error during chart cleanup:", e);
    }
    chartInstance.current = null;

    // Create a gradient for line charts
    const modifiedData = { ...data };
    if (type === "line") {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");

      modifiedData.datasets = modifiedData.datasets.map((dataset) => ({
        ...dataset,
        fill: true,
        backgroundColor: gradient,
        tension: 0.25,
      }));
    }

    // Create new chart
    try {
      chartInstance.current = new Chart(ctx, {
        type,
        data: modifiedData,
        options: {
          ...options,
          responsive: true,
        },
      });
    } catch (error) {
      console.error("Chart creation error:", error);
      chartInstance.current = null;
    }

    // Cleanup function
    return () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      } catch (e) {
        console.error("Error during cleanup:", e);
      }
      chartInstance.current = null;
    };
  }, [data, type, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
