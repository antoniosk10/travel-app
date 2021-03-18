/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from './tools/time';
import Weather from './tools/weather';
import AppMap from './tools/map';
import ExchangeRates from './tools/exchangeRates';
import Gallery from './Gallery';
import Video from './Video';
import CountryDataService from '../services/country.service';
import PlaceDataService from '../services/place.service';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      placesLoaded: false,
      country:
        {
          capitalLocation: {
            coordinates:
            [
              0, 0,
            ],
          },
          id: 1,
          ISOCode: '',
          currency: 'RUB',
          localizations: [
            {
              name: 'blank',
              capital: 'blank',
              lang: '',
            },
            {
              name: 'blank',
              capital: 'blank',
              lang: '',
            },
            {
              name: 'blank',
              capital: 'blank',
              lang: '',
            },
          ],
        },
      legend: [
        {
          capital: 'Capital: ',
        },
        {
          capital: 'Столица: ',
        },
        {
          capital: 'Столица: ',
        },
      ],
      places: [
        {
          photoUrl: '',
          localizations: [
            {
              lang: '',
              description: '',
              name: 'blank',
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.getCountry();
    this.getPlaces();
  }

  getCountry() {
    CountryDataService.get(this.props.id)
      .then((response) => {
        this.setState({
          country: response.data,
          dataLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPlaces() {
    PlaceDataService.get(this.props.id)
      .then((response) => {
        this.setState({
          places: response.data,
          placesLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const exchangeLoad = <ExchangeRates currency={this.state.country.currency}
                                        lang={this.props.lang}/>;
    const mapLoad = <AppMap Country={this.state.country.ISOCode}
    Coordinates={this.state.country.capitalLocation.coordinates}
    lang={this.state.country.localizations[this.props.lang].lang}/>;

    const timeLoad = <Time UTC={this.state.country.UTC} 
                          lang={this.props.lang}/>;
    const weatherLoad = <Weather lat={this.state.country.capitalLocation.coordinates[0]}
                                 lon={this.state.country.capitalLocation.coordinates[1]}
                                 lang={this.state.country.localizations[this.props.lang].lang}/>;
    const galleryLoad = <>
                          <Gallery arrAttractions={this.state.places} lang={this.props.lang}/>
                          <br></br>
                          <p>{this.props.lang === 0 
                          ? '* Double click gallery to go fullscreen mode'
                          : this.props.lang === 1 ? '* Двойной клик по галерее для перехода в полноэкранный режим'
                          : '* Двайны клік па галерэі для пераходу ў поўнаэкранны рэжым'}</p>
                        </>;
    const videoLoad = <Video videoUrl={this.state.country.videoUrl}/>;

    return (
     <section className="detail-page">
        <h1>Information about country</h1>

        <article className="info-country">

          <div className="info-wrap">
          <div className="img-wrap">
            <img src={this.state.country.imageUrl} alt={this.state.country._id} width="300" />
          </div>
          <div className="info">
          <h2>{this.state.country.localizations[this.props.lang].name}</h2>
            <h3>{this.state.legend[this.props.lang].capital}
            {this.state.country.localizations[this.props.lang].capital}</h3>
            <div className="vidgets">
            {this.state.dataLoaded ? timeLoad : ''}
            {this.state.dataLoaded ? weatherLoad : ''}
            {this.state.dataLoaded ? exchangeLoad : ''}
            </div>
          </div>
          </div>
          <div className="about">
            {this.state.dataLoaded ? videoLoad : ''}
            <p className="description">{this.state.country.localizations[this.props.lang].description}</p>
          </div>
        </article>

        <article className="country-common-info">
            {this.state.dataLoaded ? mapLoad : ''}
        </article>

        <article>
          {this.state.placesLoaded ? galleryLoad : ''}
        </article>

     </section>
    );
  }
}

DetailPage.propTypes = {
  lang: PropTypes.number.isRequired,
  Coordinates: PropTypes.array,
  Country: PropTypes.string,
  id: PropTypes.string,
};

export default DetailPage;
