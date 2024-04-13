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
import SAICbs from "../mockData/SAIC-bs.json";
import SAICgi from "../mockData/SAIC-gi.json";
import SAICis from "../mockData/SAIC-is.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MainContent({ searchResults }) {
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState({});
  const [graphLabels, setGraphLabels] = useState([]);
  const [dataPointLabels, setDataPointLabels] = useState([]);
  const [qtrlyNetIncome, setQtrylNetIncome] = useState([]);
  const [qtrlyTotalRevenue, setQtrylTotalRevenue] = useState([]);
  const [qtrylSHEquity, setQtrylSHEquity] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (searchResults === "SAIC") {
      createCompanyInfo(SAICgi);
      createGraphLabels(SAICis);
      createQuarterlyNetIncomePoints(SAICis);
      createQuarterlyTotalRevenuePoints(SAICis);
      createQtySHEquityDataPoints(SAICbs);
      setIsLoading(false);
    } else {
      const generalCompanyInfo = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchResults}&apikey=demo`;
      const incomeStatement = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${searchResults}&apikey=demo`;
      const balanceSheet = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${searchResults}&apikey=demo`;

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
          createDataPointLabelTitle(incomeStatementData);
          createQuarterlyNetIncomePoints(incomeStatementData);
          createQuarterlyTotalRevenuePoints(incomeStatementData);
          createQtySHEquityDataPoints(balanceSheetData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [searchResults]);

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

  const createDataPointLabelTitle = (data) => {
    let labels = [];
    data?.quarterlyReports?.forEach((item) => {
      labels.push(item.fiscalDateEnding);
    });
    setDataPointLabels(labels.reverse());
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

  const refreshBrowser = () => {
    window.location.reload();
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
          text: searchResults + " - Quarterly Financials",
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
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            dataPointLabels.map((item, index) => {
              if (tooltipItem[0].dataIndex === index) {
                return item;
              }
            });
            return dataPointLabels[tooltipItem[0].dataIndex];
          }
        }
      }
    }
  };

  return (
    <div className="w-7/12 h-screen flex flex-col gap-5 pb-5">
      <h2 id="visualization-page" className="text-2xl text-left pt-4 ml-10">
        Visualization Page
      </h2>

      {/* general info section */}
      <div className="flex w-full max-h-20 justify-around items-start text-left">
        <div className="w-10 h-10 bg-blue-900"></div>
        <div>
          <h2 id="company-symbol" className="font-extrabold">
            {companyInfo?.symbol}
          </h2>
          <p
            id="company-name"
            className="text-gray-custom max-w-56 max-h-20 overflow-hidden text-ellipsis">
            {companyInfo.name ? companyInfo?.name : "N/A"}
          </p>
        </div>
        <div>
          <h3 id="industry-title" className="text-gray-custom ">
            Industry
          </h3>
          <p id="industry-body" className="font-bold max-w-56 text-ellipsis">
            {companyInfo.industry ? companyInfo?.industry : "N/A"}
          </p>
        </div>
        <div>
          <h3 id="sector-title" className="text-gray-custom">
            Sector
          </h3>
          <p id="sector-body" className="font-bold">
            {companyInfo.sector ? companyInfo?.sector : "N/A"}
          </p>
        </div>
        <div>
          <h3 id="latest-q-title" className="text-gray-custom">
            Latest Quarter
          </h3>
          <p id="latest-q-body" className="font-bold">
            {companyInfo.latestQuarter ? companyInfo?.latestQuarter : "N/A"}
          </p>
        </div>
      </div>

      {/* line graph */}
      {!isLoading ? (
        <div className="h-5/6 contain-size text-center rounded-lg border-2 border-blue-900 ml-5 shadow-2xl">
          {qtrlyNetIncome.length > 0 ||
          qtrlyTotalRevenue.length > 0 ||
          qtrylSHEquity.length > 0 ? (
            <Line options={lineChartOptions} data={lineChartData} />
          ) : (
            <div>
              <p id="oops-message" className="text-center mt-60">
                Oops, something went wrong, please refresh the page and try
                again.
              </p>
              <button
                id="refresh-button"
                className="w-20 bg-white rounded-lg border border-blue-900 hover:bg-blue-100 hover:scale-105 mt-5"
                onClick={refreshBrowser}>
                Refresh
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center mt-60">Loading...</p>
      )}
    </div>
  );
}
