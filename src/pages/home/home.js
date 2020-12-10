/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../../constants';

const styles = {
  parent: {
    position: 'absolute',
    left: '0px',
    top: '100px',
    height: 'calc(100% - 100px)',
  },
  title: {
    color: colors.purple,
    font: type.h1,
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  image: {
    width: '200px',
    margin: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    font: type.bodySemibold,
    padding: '0px 100px',
  },
  contentMobile: {
    padding: '0px 30px',
  },
  paragraph: {},
};

const Home = ({ width, images, content }) => {
  let isMobile = width < breakpoints.mobile;

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>{content.title}</h1>
      <div css={styles.images}>
        {images &&
          Object.values(images).map((image, index) => {
            if (!isMobile || (isMobile && index === 0)) {
              return <img src={image.src} css={styles.image} alt='selfy' />;
            }
            return null;
          })}
      </div>
      <div
        css={
          isMobile
            ? {
                ...styles.content,
                ...styles.contentMobile,
              }
            : styles.content
        }
      >
        {content.content &&
          content.content.map((paragraph, index) => {
            return (
              <p css={styles.paragraph} key={index}>
                {paragraph}
              </p>
            );
          })}
      </div>
    </div>
  ) : (
    <div />
  );
};

Home.propTypes = {
  width: PropTypes.number,
  images: PropTypes.object,
  content: PropTypes.object,
};

export default Home;
