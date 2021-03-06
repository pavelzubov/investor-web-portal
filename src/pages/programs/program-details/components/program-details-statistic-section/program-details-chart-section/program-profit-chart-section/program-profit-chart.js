import ProgramChartGradient, {
  gradientOffset
} from "components/chart/chart-gradient/chart-gradient";
import { GVColors } from "gv-react-components";
import moment from "moment";
import React, { PureComponent } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import ProgramProfitTooltip from "./program-profit-tooltip";

class ProgramProfitChart extends PureComponent {
  render() {
    const { equityChart, pnlChart, currency } = this.props;
    if (equityChart.length === 0 || pnlChart.length === 0) return null;
    const equity = equityChart.map(x => ({
      date: x.date.getTime(),
      value: x.value
    }));
    const pnl = pnlChart.map(x => ({
      date: x.date.getTime(),
      value: x.value
    }));
    const off = gradientOffset(equity.map(x => x.value));
    return (
      <ResponsiveContainer>
        <ComposedChart data={pnl}>
          <defs>
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartStroke"
              positiveColor={GVColors.$positiveColor}
              negativeColor={GVColors.$negativeColor}
              startOpacity={1}
              stopOpacity={1}
            />
            <ProgramChartGradient
              offset={off}
              name="equityProgramChartFill"
              positiveColor={GVColors.$positiveColor}
              negativeColor={GVColors.$negativeColor}
              startOpacity={0.1}
              stopOpacity={0.01}
            />
          </defs>
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={(date, i) => moment(date).format("ll")}
            allowDuplicatedCategory={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            dataKey="value"
            data={equity}
            orientation="left"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            tickFormatter={x => x.toFixed(2)}
            unit="%"
            width={50}
          />
          <YAxis
            yAxisId="right"
            dataKey="value"
            data={pnl}
            orientation="right"
            axisLine={false}
            tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
            unit={currency}
            tickFormatter={x => x.toFixed(4)}
            width={80}
          />
          <Tooltip content={ProgramProfitTooltip} />
          <CartesianGrid vertical={false} strokeWidth={0.1} />
          <Bar
            dataKey="value"
            data={pnl}
            unit={` ${currency}`}
            barSize={6}
            fill={GVColors.$labelColor}
            stroke={GVColors.$labelColor}
            yAxisId="right"
          />
          <Area
            dataKey="value"
            type="monotone"
            data={equity}
            connectNulls={true}
            stroke={`url(#equityProgramChartStroke)`}
            fill={`url(#equityProgramChartFill)`}
            strokeWidth={3}
            dot={false}
            yAxisId="left"
            unit=" %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ProgramProfitChart;
