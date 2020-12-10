/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../constants';
import { storage, db } from '../firebase';

const Navbar = ({ width, height }) => {
  const [content, setContent] = useState();
  const [resume, setResume] = useState([]);
  useEffect(() => {
    db.collection('general')
      .doc('static')
      .get()
      .then((result) => {
        setContent(result.data());
      });
  }, []);

  useEffect(() => {
    content &&
      content.resume &&
      storage
        .child(content.resume)
        .getDownloadURL()
        .then((url) => {
          setResume(url);
        });
  }, [content]);
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
        transition: 'color 0.5s',
      },
      '&:hover': {
        backgroundColor: colors.purple,
        a: {
          color: colors.white,
          transition: 'color 1s',
        },
        transition: 'background-color 0.5s',
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
        <a href={resume} target='__blank'>
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
