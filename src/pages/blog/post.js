/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { colors, type } from '../../constants';
import PropTypes from 'prop-types';
import moment from 'moment';

const styles = {
  title: {
    color: colors.purple,
    font: type.h1,
    margin: '0px 0px 20px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  postTitle: {
    color: colors.purple,
    font: type.h2,
    width: '100%',
    padding: '0px',
    margin: '0px',
  },
  postSubtitle: {
    color: colors.purple,
    font: type.h4,
    fontStyle: 'italic',
  },
  project: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: colors.boxShadow,
    backgroundColor: colors.white,
    borderRadius: '4px',
    margin: '0px 100px 20px 100px',
    padding: '30px',
    transition: 'box-shadow 1s',
    maxWidth: '1000px',
    '&:hover': {
      transition: 'box-shadow 1s',
      boxShadow: colors.boxShadowLight,
    },
  },
  projectMobile: {
    margin: '0px 30px 20px',
  },
  projectHeader: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '10px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  projectBody: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  projectBodyMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  para: {
    margin: '0px 0px 32px 0px',
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
  highlightedText: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    margin: '0px 0px 32px 0px',
  },
  highlightedTextRegular: {
    font: type.h5,
    fontStyle: 'italic',
    color: colors.purple,
  },
  highlightedTextLarge: {
    font: type.h4,
    fontStyle: 'italic',
    color: colors.purple,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'scale-down',
  },
  caption: {
    font: type.bodySemibold,
    fontStyle: 'italic',
    float: 'right',
  },
  imageParent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
  },
};

const Post = ({
  isMobile,
  title,
  subtitle,
  date,
  photos,
  body,
  highlighted_text,
}) => {
  console.log(date);
  let d = moment(date.toDate());
  return (
    <div
      css={
        isMobile
          ? {
              ...styles.project,
              ...styles.projectMobile,
            }
          : styles.project
      }
    >
      <div css={styles.projectHeader}>
        <span css={styles.header}>
          <h1 css={styles.postTitle}>{title}</h1>
          <h2 css={styles.postSubtitle}>{d.format('DD.MM.YYYY')}</h2>
        </span>
        <h2 css={styles.postSubtitle}>{subtitle}</h2>
      </div>
      <div
        css={
          isMobile
            ? {
                ...styles.projectBody,
                ...styles.projectBodyMobile,
              }
            : styles.projectBody
        }
      >
        <div
          css={{
            ...styles.content,
            ...styles.contentMobile,
          }}
        >
          {body &&
            body.map((p, index) => {
              return (
                <React.Fragment key={index}>
                  <p css={styles.para} key={index}>
                    {p}
                  </p>
                  {index === 0 && (
                    <HighlightedText highlighted_text={highlighted_text} />
                  )}
                </React.Fragment>
              );
            })}
          {photos &&
            photos.map((photo, index) => {
              console.log(photo);
              return (
                <div css={styles.imageParent} key={index}>
                  <span css={styles.caption}>{photo.alt}</span>
                  <img src={photo.src} css={styles.image} alt={photo.alt} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const HighlightedText = ({ highlighted_text }) => {
  const highlightedTextArr = highlighted_text.split('<br />');
  highlightedTextArr.map((el) => {
    return el.replace('<br />', '');
  });
  return (
    <div css={styles.highlightedText}>
      {highlightedTextArr.map((text, index) => {
        return (
          <span
            css={
              index === 0
                ? styles.highlightedTextLarge
                : styles.highlightedTextRegular
            }
            key={index}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
};

HighlightedText.propTypes = {
  highlighted_text: PropTypes.string,
};

Post.propTypes = {
  isMobile: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  photos: PropTypes.array,
  index: PropTypes.number,
  highlighted_text: PropTypes.string,
  body: PropTypes.array,
  date: PropTypes.object,
};

export default Post;
