import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WeatherData: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.wetherGet();
    }
  }

  componentDidMount() {
    this.wetherGet();
  }

    wetherGet = () => {
      const urlQuery = `http://api.openweathermap.org/data/2.5/weather?lang=${this.props.lang}&lat=${this.props.lat}&lon=${this.props.lon}&appid=4146c38d01d60ac4249d0bbc80a1cffa`;

      // https://openweathermap.org/current#current_JSON
      fetch(urlQuery).then((weatherData) => weatherData.json())
        .then((data) => {
          this.setState({
            WeatherData: data,
          });
        });
    }

    render() {
      const { WeatherData } = this.state;

      if (WeatherData && WeatherData.weather) {
        const temp = Math.round(WeatherData.main.temp - 273);
        return (
                <div className='weather'>
                    <img src={`http://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`} />
                    <div>{ `${(+temp > 0) ? (`+${temp}`) : temp}C`} ({WeatherData.weather[0].description})</div>

                </div>
        );
      }
      return <div>nothing</div>;
    }
}

Weather.propTypes = {
  lang: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
