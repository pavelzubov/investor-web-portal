import React, { Component } from "react";

import ProgramTableRowDetailed from "./program-table-row-detailed";
import ProgramTableRowShort from "./program-table-row-short";

class ProgramTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
  }

  openProgramDetail = () => {
    this.setState({ isDetailed: true });
  };

  closeProgramDetail = () => {
    this.setState({ isDetailed: false });
  };

  render() {
    const { program, isAuthenticated, toggleFavorite } = this.props;
    const { isDetailed } = this.state;
    if (isDetailed)
      return (
        <ProgramTableRowDetailed
          program={program}
          onCollapseClick={this.closeProgramDetail}
          isAuthenticated={isAuthenticated}
          toggleFavorite={toggleFavorite}
        />
      );
    return (
      <ProgramTableRowShort
        program={program}
        onExpandClick={this.openProgramDetail}
        toggleFavorite={toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

export default ProgramTableRow;
