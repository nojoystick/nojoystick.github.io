/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../constants';
import Resume from '../assets/resume.pdf';

const Navbar = ({ width, height }) => {
  // const [showNav, setShowNav] = useState(false);
  const styles = {
    navbar: {
      margin: '0px',
      listStyleType: 'none',
      display: 'flex',
      flexDirection: 'horizontal',
      justifyContent: 'flex-end',
    },
    navbarMobile: {
      display: 'none',
    },
    navItem: {
      margin: '10px',
      backgroundColor: colors.pink,
      transition: 'background-color 1s',
      a: {
        color: colors.purple,
        font: type.h4,
        transition: 'color 1s',
      },
      '&:hover': {
        backgroundColor: colors.purple,
        a: {
          color: colors.white,
          transition: 'color 1s',
        },
        transition: 'background-color 1s',
      },
    },
  };

  return (
    <ul css={width > breakpoints.tablet ? styles.navbar : styles.navbarMobile}>
      <li css={styles.navItem}>
        <Link to='/'>home</Link>
      </li>
      <li css={styles.navItem}>
        <Link to='/blog'>blog</Link>
      </li>
      <li css={styles.navItem}>
        <Link to='/projects'>projects</Link>
      </li>
      <li css={styles.navItem}>
        <Link to='/music'>music</Link>
      </li>
      <li css={styles.navItem}>
        <a href={Resume} target='__blank'>
          resume
        </a>
      </li>
    </ul>
  );
};

Navbar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Navbar;
