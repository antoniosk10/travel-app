import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Search from './Search';
import LanguageToggle from './LanguageToggle';

class Header extends Component {
  render() {
    return (
  <header>
    <Logo logoLink={this.props.logoLink}/>
    {this.props.searchVisible ? <Search lang={this.props.lang}
    changeFilter={this.props.changeFilter}/> : null}
    <LanguageToggle toggleLang={this.props.toggleLang} lang={this.props.lang}/>
  </header>
    );
  }
}

Header.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  logoLink: PropTypes.bool.isRequired,
  lang: PropTypes.number.isRequired,
  toggleLang: PropTypes.func.isRequired,
};

export default Header;
