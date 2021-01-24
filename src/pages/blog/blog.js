/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from 'prop-types';
import { colors, type, breakpoints } from '../../constants';
import { jsx } from '@emotion/react';
import Post from './post';

const styles = {
  parent: {
    padding: '0px 0px 30px',
    backgroundColor: colors.pink,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: colors.purple,
    font: type.h1,
    margin: '0px 0px 20px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  subtitle: {
    color: colors.purple,
    font: type.h3,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    font: type.bodySemibold,
    padding: '0px 100px',
  },
  contentMobile: {
    padding: '0px 30px',
  },
};

const Blog = ({ width, content, photos }) => {
  let isMobile = width < breakpoints.tablet;

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>blog</h1>
      {content.blogs.map((project, index) => {
        return (
          <Post
            isMobile={isMobile}
            {...project}
            photos={
              photos &&
              photos[project.title] &&
              Object.values(photos[project.title])
            }
            key={index}
            index={index}
          />
        );
      })}
    </div>
  ) : (
    <div />
  );
};

Blog.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
};

export default Blog;
