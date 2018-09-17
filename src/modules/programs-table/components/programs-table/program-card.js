import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableRow, div } from "modules/table/components";
import React from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";

const ProgramCard = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <div onClick={onExpandClick} className="programs-cards__card">
      <div className="programs-cards__card__row">
        <div className="programs-cards__card__row__avatar">
          <GVProgramAvatar
            url={fileService.getFileUrl(program.avatar)}
            level={program.level}
            alt={program.title}
            size="medium"
          />
        </div>
        <div className="programs-cards__card__row__names">
          <div className="programs-cards__card__row__title">
            {program.title}
          </div>
          <div className="programs-cards__card__row__name">Eddie Carr</div>
        </div>
        <div className="programs-cards__card__row__actions">...</div>
      </div>
      <div className="programs-cards__card__row">
        <div className="programs-cards__card__row__chart">
          <ProgramSimpleChart
            data={program.chart}
            isPositive={program.statistic.profitPercent >= 0}
          />
        </div>
        <div className="programs-cards__card__row__chart-info">
          <div className="programs-cards__card__row__chart-info--profit">
            <NumberFormat
              value={program.statistic.profitPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="programs-cards__card__row__chart-info--balance">
            {program.statistic.balanceInGVT.amount} GVT
          </div>
        </div>
      </div>
      <div className="programs-cards__card__table">
        <table>
          <tr>
            <th className="programs-cards__card__table--title">Balance </th>
            <th className="programs-cards__card__table--title">Investors</th>
            <th className="programs-cards__card__table--title">
              Av. to invest
            </th>
          </tr>
          <tr>
            <td>{program.statistic.balanceInGVT.amount}</td>
            <td>{program.statistic.investorsCount}</td>
            <td>{program.availableForInvestment}</td>
          </tr>
        </table>
      </div>
      <div className="programs-cards__card__table">
        <table>
          <tr>
            <th className="programs-cards__card__table--title">Trades</th>
            <th className="programs-cards__card__table--title">Period</th>
            <th className="programs-cards__card__table--title">D.down</th>
          </tr>
          <tr>
            <td>{program.statistic.tradesCount}</td>
            <td>
              <ProgramPeriodPie
                start={program.periodDateStart}
                end={program.periodDateEnd}
              />
            </td>
            <td>
              <NumberFormat
                value={program.statistic.drawdownPercent}
                suffix="%"
                decimalScale={2}
                displayType="text"
              />
            </td>
          </tr>
        </table>
      </div>
      {/*<div className="programs-cards__card__row">
        <div className="programs-cards__card__row__status">
          <div className="programs-cards__card__row--title">Status</div>
          <div className="programs-cards__card__row__status--text">Pending</div>
        </div>
        <div className="programs-cards__card__row__reinvest">
          <div className="programs-cards__card__row__reinvest__question">?</div>
          <div className="programs-cards__card__row__reinvest__test">Reinvest</div>
          <div className="programs-cards__card__row__reinvest__toggle"><input type="checkbox"/></div>
        </div>
      </div>*/}
      {/* <div className="programs-cards__card--title">
        <GVProgramAvatar
          url={fileService.getFileUrl(program.avatar)}
          level={program.level}
          alt={program.title}
        />
        {program.title}
      </div>
      <div className="programs-cards__card--balance">
        {program.statistic.balanceInGVT.amount}
      </div>
      <div className="programs-cards__card--currency">
        {program.currency}
      </div>
      <div className="programs-cards__card--investors">
        {program.statistic.investorsCount}
      </div>
      <div className="programs-cards__card--available-to-invest">
        {program.availableForInvestment}
      </div>
      <div className="programs-cards__card--trades">
        {program.statistic.tradesCount}
      </div>
      <div className="programs-cards__card--period">
        <ProgramPeriodPie
          start={program.periodDateStart}
          end={program.periodDateEnd}
        />
      </div>
      <div className="programs-cards__card--drawdown">
        <NumberFormat
          value={program.statistic.drawdownPercent}
          suffix="%"
          decimalScale={2}
          displayType="text"
        />
      </div>
      <div className="programs-cards__card--profit">
        <NumberFormat
          value={program.statistic.profitPercent}
          suffix="%"
          decimalScale={2}
          displayType="text"
        />
      </div>
      <div className="programs-cards__card--chart">
        <ProgramSimpleChart
          data={program.chart}
          isPositive={program.statistic.profitPercent >= 0}
        />
      </div>
      {isAuthenticated &&
      program.personalProgramDetails && (
        <div className="programs-cards__card--favorite">
          <FavoriteIcon
            toggleSelected={toggleFavorite}
            programId={program.id}
            selected={program.personalProgramDetails.isFavorite}
          />
        </div>
      )}*/}
    </div>
  );
};

export default ProgramCard;