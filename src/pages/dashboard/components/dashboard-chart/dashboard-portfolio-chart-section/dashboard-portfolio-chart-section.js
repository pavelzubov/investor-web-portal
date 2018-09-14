import "./dashboard-portfolio-chart-section.scss";

import ChartPeriod from "components/chart-period/chart-period";
import moment from "moment";
import React, { Component } from "react";

import DashboardPortfolioChart from "./dashboard-portfolio-chart";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const composeChartData = (chart, bars) => {
  const data = [
    ...chart.map(x => ({ profitValue: x.value, date: x.date.getTime() })),
    ...bars.map(x => ({
      assetValue: x.value,
      assets: x.assets,
      date: moment(x.date)
        .startOf("day")
        .valueOf()
    }))
  ];

  return data.sort((a, b) => {
    //return a.date - b.date;
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};
class DashboardPortfolioChartSection extends Component {
  componentDidMount() {
    this.props.service.getPortfolioChart();
  }
  render() {
    const { data, isPending, currency } = this.props;
    if (data.chart === undefined) return null;
    return (
      <div className="dashboard-portfolio-chart-section">
        <DashboardPortfolioChartStat
          currency={currency}
          value={data.value}
          valueCurrency={data.valueCurrency}
          changeValue={data.changeValue}
          changeValueCurrency={data.changeValueCurrency}
        />
        <ChartPeriod />
        <div className="dashboard-portfolio-chart-section__chart">
          <DashboardPortfolioChart
            data={composeChartData(data.chart, data.bars)}
          />
        </div>
      </div>
    );
  }
}

export default DashboardPortfolioChartSection;
