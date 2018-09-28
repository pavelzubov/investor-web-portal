import "./program-trades.scss";

import Profitability from "components/profitability/profitability";
import { TableCell, TableHeadCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import {
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../../../program-details.constants";
import * as service from "../../../services/program-details.service";

class ProgramTrades extends Component {
  fetchProgramTrades = filters => {
    const { programId, currency } = this.props;

    return service
      .getProgramTrades({ programId, currency, filters })
      .then(({ data }) => {
        return { items: data.trades, total: data.total };
      });
  };

  render() {
    const { t, trades } = this.props;
    let data = { trades: null, total: 0 };
    if (trades) {
      data.items = trades.trades;
      data.total = trades.total;
    }

    return (
      <TableModule
        fetchOnMount={false}
        data={data}
        getItems={this.fetchProgramTrades}
        defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
        filtering={PROGRAM_TRADES_FILTERS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={PROGRAM_TRADES_COLUMNS}
        renderHeader={column => (
          <TableHeadCell
            key={column.name}
            className={`program-details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`program-details-page.history.trades.${column.name}`)}
          </TableHeadCell>
        )}
        renderBodyRow={trade => (
          <TableRow className="program-details-trades__row">
            <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              <Profitability
                isPositive={trade.direction === "Buy"}
                isNegative={trade.direction === "Sell"}
              >
                {trade.direction}
              </Profitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--symbol">
              {trade.symbol}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--volume">
              <NumberFormat
                value={trade.volume}
                decimalScale={8}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={trade.price}
                decimalScale={8}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--profit">
              <Profitability value={trade.profit}>
                <NumberFormat
                  value={Math.abs(trade.profit)}
                  decimalScale={8}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--date">
              {moment(trade.date).format("DD-MM-YYYY, hh:mm a")}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--ticket">
              {trade.ticket}
            </TableCell>

            <TableCell className="program-details-trades__cell program-details-trades__cell--entry">
              {trade.entry}
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(ProgramTrades);