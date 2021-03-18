import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';

export default class ExchangeRates extends Component {
  render() {
    const { currency, lang } = this.props;
    const currencyList = ['EUR', 'USD', 'RUB'];
    const currencyOutput = currencyList.map(
      (curr) => <Currency arrives={currency} key={curr} out={curr} lang={lang}/>,
    );

    return (
            <div>
               {currencyOutput}
            </div>
    );
  }
}

ExchangeRates.propTypes = {
  currency: PropTypes.string.isRequired,
  lang: PropTypes.number.isRequired,
};
