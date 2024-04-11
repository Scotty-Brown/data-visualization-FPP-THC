import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


// MOCK DATA USED TO CHECK STYLING FOR DIFFERENT SYMBOLS SINCE API HAS 25 REQUEST/DAY LIMIT
// import SAICbs from "../mockData/SAIC-bs.json";
// import SAICgi from "../mockData/SAIC-gi.json";
// import SAICis from "../mockData/SAIC-id.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function MainContent() {
  const [companyInfo, setCompanyInfo] = useState({});
  const [graphLabels, setGraphLabels] = useState([]);
  const [qtrlyNetIncome, setQtrylNetIncome] = useState([]);
  const [qtrlyTotalRevenue, setQtrylTotalRevenue] = useState([]);
  const [qtrylSHEquity, setQtrylSHEquity] = useState([]);

  useEffect(() => {
    const generalCompanyInfo =
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
    const incomeStatement =
      "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo";
    const balanceSheet =
      "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo";

    Promise.all([
      fetch(incomeStatement).then((res) => res.json()),
      fetch(balanceSheet).then((res) => res.json()),
      fetch(generalCompanyInfo).then((res) => res.json())
    ])
      .then((data) => {
        const incomeStatementData = data[0];
        const balanceSheetData = data[1];
        const companyData = data[2];
        createCompanyInfo(companyData);
        createGraphLabels(incomeStatementData);
        createQuarterlyNetIncomePoints(incomeStatementData);
        createQuarterlyTotalRevenuePoints(incomeStatementData);
        createQtySHEquityDataPoints(balanceSheetData);
      })
      .catch((error) => console.log(error));


// MOCK DATA USED TO CHECK STYLING FOR DIFFERENT SYMBOLS SINCE API HAS 25 REQUEST/DAY LIMIT
    // createCompanyInfo(SAICgi);
    // createGraphLabels(SAICis);
    // createQuarterlyNetIncomePoints(SAICis);
    // createQuarterlyTotalRevenuePoints(SAICis);
    // createQtySHEquityDataPoints(SAICbs);


  }, []);

  const createCompanyInfo = (data) => {
    setCompanyInfo({
      symbol: data.Symbol,
      name: data.Name,
      industry: data.Industry,
      sector: data.Sector,
      latestQuarter: data.LatestQuarter
    });
  };

  const createGraphLabels = (data) => {
    let labels = [];
    data?.quarterlyReports?.forEach((item) => {
      let year = item.fiscalDateEnding.split("-")[0];
      labels.push(year);
    });
    setGraphLabels(labels.reverse());
  };

  const createQuarterlyNetIncomePoints = (data) => {
    let quarterlyNetIncome = [];
    data?.quarterlyReports?.forEach((item) => {
      quarterlyNetIncome.push(item.netIncome);
    });
    setQtrylNetIncome(quarterlyNetIncome.reverse());
  };

  const createQuarterlyTotalRevenuePoints = (data) => {
    let quarterlyRevenue = [];
    data?.quarterlyReports?.forEach((item) => {
      quarterlyRevenue.push(item.totalRevenue);
    });
    setQtrylTotalRevenue(quarterlyRevenue.reverse());
  };

  const createQtySHEquityDataPoints = (data) => {
    let quarterlySHEquity = [];
    data?.quarterlyReports?.forEach((item) => {
      quarterlySHEquity.push(item.totalShareholderEquity);
    });
    setQtrylSHEquity(quarterlySHEquity.reverse());
  };

  const lineChartData = {
    labels: graphLabels,
    datasets: [
      {
        label: "Total Revenue",
        data: qtrlyTotalRevenue,
        fill: false,
        borderColor: "rgb(46, 139, 87)"
      },
      {
        label: "Net Income",
        data: qtrlyNetIncome,
        fill: false,
        borderColor: "rgb(154, 205, 50)"
      },
      {
        label: "Shareholder Equity",
        data: qtrylSHEquity,
        fill: false,
        borderColor: "rgb(230, 126, 34)"
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 35
    },
    axis: "y",
    mode: "nearest",
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 20,
            weight: "bold"
          }
        },
        ticks: {
          maxTicksLimit: 15,
          padding: 10,
          font: {
            size: 15
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "USD $",
          font: {
            size: 20,
            weight: "bold"
          }
        },
        ticks: {
          padding: 2,
          callback: function (value) {
            let num = value / 1000000000;
            return num + "B";
          },
          font: {
            size: 15
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        onHover: (e) => {
          e.native.target.style.cursor = "pointer";
        },
        onLeave: (e) => {
          e.native.target.style.cursor = "default";
        },
        title: {
          display: true,
          text: "Quarterly Financials",
          font: {
            size: 20,
            weight: "bold"
          }
        },
        labels: {
          font: {
            size: 15
          }
        }
      }
    }
  };

  return (
    <div className="w-7/12 h-screen flex flex-col gap-5 pb-5">
      <h1 className="text-2xl text-left pt-4 ml-10">Visualization Page</h1>

      {/* general info section */}
      <div className="flex w-full justify-around items-start text-left">
        <div className="w-10 h-10 bg-blue-900"></div>
        <div>
          <h2 className="font-extrabold">{companyInfo?.symbol}</h2>
          <p className="text-gray-custom max-w-56">{companyInfo?.name}</p>
        </div>
        <div>
          <h3 className="text-gray-custom ">Industry</h3>
          <p className="font-bold max-w-56">{companyInfo?.industry}</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Sector</h3>
          <p className="font-bold">{companyInfo?.sector}</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Latest Quarter</h3>
          <p className="font-bold">{companyInfo?.latestQuarter}</p>
        </div>
      </div>

      {/* line graph */}
      <div className="h-5/6 contain-size text-center rounded-lg border-2 border-blue-900 ml-5 shadow-2xl">
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </div>
  );
}
