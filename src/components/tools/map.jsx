import React, { useState, useEffect } from 'react';
import {
  YMaps, Map, FullscreenControl, Placemark, ZoomControl,
} from 'react-yandex-maps';
import PropTypes from 'prop-types';

export default function AppMap(props) {
  const COLOR = '#49C0B5';
  const langList = ['en', 'ru', 'uk', 'tr'];
  const mapRef = React.createRef(null);
  const [lang, setLang] = useState(
    (langList.includes(props.lang)) ? `${props.lang}_RU` : 'ru_RU',
  );

  useEffect(() => {
    setLang((langList.includes(props.lang)) ? `${props.lang}_RU` : 'ru_RU');
  }, [props.lang]);

  const mapState = {
    center: props.Coordinates,
    zoom: 6,
    controls: [],
  };

  const getRegions = (ymaps) => {
    if (mapRef && mapRef.current) {
      const objectManager = new ymaps.ObjectManager();
      ymaps.borders
        .load('001', {
          lang: 'ru',
          quality: 2,
        })
        .then((result) => {
          const countrysAll = result.features;

          /* eslint-disable-next-line */
          for (const value of countrysAll) {
            if (value.properties.iso3166 === props.Country) {
              value.id = value.properties.iso3166;
              value.options = {
                fillOpacity: 0.6,
                strokeColor: '#FFF',
                strokeOpacity: 0.5,
              };
              value.options.fillColor = COLOR;
              objectManager.add(value);
              mapRef.current.geoObjects.add(objectManager);
              break;
            }
          }
        });
    }
  };

  return (
    <div className="map">
      <YMaps key={lang} query={{ lang }}>
        <Map width={'100%'}
        height={'100%'}
          // Создаем ссылку на инстанс мапа, чтобы использовать его
          instanceRef={mapRef}
          state={mapState}
          // Используем коллбэк функцию при загрузке карты
          onLoad={(ymaps) => getRegions(ymaps)}
          // Подключаем модули регионов и ObjectManager
          modules={['borders', 'ObjectManager']}>
               <FullscreenControl />
                <ZoomControl />
                <Placemark defaultGeometry={props.Coordinates} />
          </Map>
      </YMaps>
    </div>
  );
}

AppMap.propTypes = {
  lang: PropTypes.string.isRequired,
  Coordinates: PropTypes.array.isRequired,
  Country: PropTypes.string.isRequired,
};
