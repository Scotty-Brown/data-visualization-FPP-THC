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
    const generalCompanyInfo = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
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
  }, []);

  const createCompanyInfo = (data) => {
    setCompanyInfo({
      symbol: data.Symbol,
      name: data.Name,
      industry: data.Industry,
      sector: data.Sector,
      latestQuarter: data.LatestQuarter
    });
  }

  const createGraphLabels = (data) => {
    let labels = [];
    data?.quarterlyReports?.forEach((item) => {
      labels.push(item.fiscalDateEnding);
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
        label: "Quarterly Net Income",
        data: qtrlyNetIncome,
        fill: false,
        borderColor: "rgb(75, 192, 192)"
      },
      {
        label: "Quarterly Total Revenue",
        data: qtrlyTotalRevenue,
        fill: false,
        borderColor: "black"
      },
      {
        label: "Quarterly Shareholder Equity",
        data: qtrylSHEquity,
        fill: false,
        borderColor: "red"
      }
    ]
  };

  return (
    <div className="w-7/12 flex flex-col gap-5">
      <h1 className="text-2xl text-left mt-5 ml-10">Visualization Page</h1>

      {/* general info section */}
      <div className="flex w-full justify-around items-center text-left">
        <div className="w-10 h-10 bg-blue-900"></div>
        <div>
          <h2 className="font-extrabold">{companyInfo?.symbol}</h2>
          <p className="text-gray-custom">{companyInfo?.name}</p>
        </div>
        <div>
          <h3 className="text-gray-custom">Industry</h3>
          <p className="font-bold">{companyInfo?.industry}</p>
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
      <div className="h-full text-center rounded-lg border-2 border-blue-900 ml-5 mb-2">
        <Line data={lineChartData} />
      </div>
    </div>
  );
}
