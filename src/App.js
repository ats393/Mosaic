import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEarningsByTicker } from './actions/earnings.action';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      skip: 0
    };

  }

  handleChange(event) {
    this.setState({ticker: event.target.value});
  }

  submitSearch(e) {
    e.preventDefault();
    this.setState({
      skip: 0
    });
    this.props.dispatch(getEarningsByTicker(this.state.ticker));
  }

  handlePagination(paginationType) {
    if (paginationType === 'prev') {
      if (this.state.skip === 0) {
        return;
      }
      this.setState({
        skip: this.state.skip - 10
      });
    } else if (paginationType === 'next') {
      const { stock } = this.props;
      if (stock.earnings.length <= this.state.skip) {
        return;
      }
      this.setState({
        skip: this.state.skip + 10
      });
    }
  }

  renderTable() {
    const { stock } = this.props;
    const result = [];

    stock.earnings.map((ele, i) => {
      if (i >= this.state.skip && i <= this.state.skip + 10) {
        result.push(
          <tr key={i}>
            <td>{i}</td>
            <td>{ele.EPSReportDate}</td>
            <td>{ele.fiscalPeriod}</td>
            <td>{ele.actualEPS}</td>
            <td>{ele.consensusEPS}</td>
          </tr>
        )
      }
    });
    
    return result;
  }

  render() {
    return (
      <div className="App">
        <h1>Mosaic - Coding Challenge</h1>
        <div>
          <h3>Enter stock ticker:</h3>
          <form onSubmit={(e) => this.submitSearch(e)}>
            <input type="text" value={this.state.ticker} onChange={(e) => this.handleChange(e)} />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div>
          <table style={{'margin': '0 auto'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Report Date</th>
                <th>Fiscal Period</th>
                <th>Actual EPS</th>
                <th>Consensus EPS</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
          <div>
            <button onClick={() => this.handlePagination('prev')}>Prev</button>
            <button onClick={() => this.handlePagination('next')}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.earnings
  }
}

export default connect(mapStateToProps)(App);
