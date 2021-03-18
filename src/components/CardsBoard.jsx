import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardCountry from './CardCountry';
import CountryDataService from '../services/country.service';

class CardsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [
        {
          id: 1,
          localizations: [
            {
              name: 'blank',
              capital: 'blank',
            },
            {
              name: 'blank',
              capital: 'blank',
            },
            {
              name: 'blank',
              capital: 'blank',
            },
          ],
        },
      ],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    this.retrieveCountries();
  }

  retrieveCountries() {
    CountryDataService.getAll()
      .then((response) => {
        this.setState({
          countries: response.data,
          dataLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <section className="cards-block">
        {// eslint-disable-next-line max-len
        this.state.countries.map((el, id) => (el.localizations[this.props.lang].name.toLowerCase().includes(this.props.filterValue.toLowerCase())
         // eslint-disable-next-line max-len
         || el.localizations[this.props.lang].capital.toLowerCase().includes(this.props.filterValue.toLowerCase())
          ? this.state.dataLoaded 
          ? <CardCountry
                key={id}
                nameCountry={el.localizations[this.props.lang].name}
                capitalCountry={el.localizations[this.props.lang].capital}
                // eslint-disable-next-line no-underscore-dangle
                id={el._id}
                imgSrc={el.imageUrl}
              />
          : 'Loading data...'
          : null))
        }
      </section>
    );
  }
}

CardsBoard.propTypes = {
  filterValue: PropTypes.string.isRequired,
  lang: PropTypes.number.isRequired,
};

export default CardsBoard;
