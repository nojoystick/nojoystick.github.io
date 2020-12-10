/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { colors } from '../../constants';

const styles = {
  image: {
    maxWidth: '100%',
    margin: '10px 0px',
    objectFit: 'contain',
    boxShadow: colors.boxShadowDark,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
  },
  player: {
    backgroundColor: colors.lightblue,
    color: colors.lightblue,
  },
};

const MediaColumn = ({ audio, photos, title }) => {
  return (
    <div css={styles.column}>
      {audio && (
        <audio controls>
          <source css={styles.player} src={audio.url} type='audio/mpeg' />
        </audio>
      )}
      {photos &&
        photos.map((photo, index) => {
          return (
            <img src={photo.src} css={styles.image} alt={title} key={index} />
          );
        })}
    </div>
  );
};

MediaColumn.propTypes = {
  audio: PropTypes.object,
  photos: PropTypes.array,
  title: PropTypes.string,
};

export default MediaColumn;
