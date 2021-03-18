import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo.png';

const Logo = (props) => {
  const styles = {
    cursor: props.logoLink ? 'pointer' : 'default',
  };

  if (props.logoLink) {
    return <Link className="logo" to='/' style={styles}><img src={logo} alt="" /></Link>;
  }

  return <div className="logo" style={styles}>
    <img src={logo} alt="" />
  </div>;
};

Logo.propTypes = {
  logoLink: PropTypes.bool.isRequired,
};

export default Logo;
