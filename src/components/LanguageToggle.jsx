import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LanguageToggle extends Component {
  toggleLanguage = (e) => {
    this.props.toggleLang(+e.target.value);
  }

  render() {
    return (
    <div>
      <select onChange={this.toggleLanguage} value={this.props.lang}>
        <option value="0">EN</option>
        <option value="1">RU</option>
        <option value="2">BY</option>
      </select>
    </div>
    );
  }
}

LanguageToggle.propTypes = {
  toggleLang: PropTypes.func.isRequired,
  lang: PropTypes.number.isRequired,
};

export default LanguageToggle;
