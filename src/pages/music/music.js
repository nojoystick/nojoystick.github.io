/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../../constants';
import { Linkbar } from '../../components';
import { storage } from '../../firebase';

const styles = {
  parent: {
    padding: '0px 0px 30px',
    backgroundColor: colors.pink,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'background-color 1s',
  },
  title: {
    color: colors.lightred,
    font: type.h1,
    margin: '10px',
    display: 'flex',
    maxWidth: '100%',
    textAlign: 'center',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
};

const Music = ({ width, photos, content, icons }) => {
  const [audioUrls, setAudioUrls] = useState([]);

  useEffect(() => {
    content &&
      content.songs &&
      content.songs.forEach((song) => {
        if (song.file) {
          storage
            .child(song.file)
            .getDownloadURL()
            .then((url) => {
              setAudioUrls((prevState) => [
                ...prevState,
                { title: song.title, url: url },
              ]);
            });
        }
      });
  }, [content]);
  let isMobile = width < breakpoints.tablet;
  const links = [];
  const imgs = [];
  if (content) {
    content.links.forEach((obj) => {
      links.push(obj.link);
      imgs.push(icons[obj.title] && Object.values(icons[obj.title])[0].src);
    });
  }
  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>{content.title}</h1>
      <Linkbar links={links} images={imgs} backed={true} />
      {content.songs.map((song, index) => {
        return (
          <Song
            isMobile={isMobile}
            song={song}
            image={
              photos && photos[song.title] && Object.values(photos[song.title])
            }
            audio={audioUrls.find((el) => el.title === song.title)}
            key={index}
          />
        );
      })}
    </div>
  ) : (
    <div />
  );
};

const Song = ({ isMobile, song, image, audio }) => {
  const styles = {
    project: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'unset',
      boxShadow: colors.boxShadow,
      backgroundColor: colors.white,
      borderRadius: '4px',
      margin: isMobile ? '0px 30px 20px' : '0px 100px 20px 100px',
      padding: '30px',
      transition: 'box-shadow 1s',
      '&:hover': {
        transition: 'box-shadow 1s',
        boxShadow: colors.boxShadowLight,
      },
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    subtitle: {
      color: colors.lightred,
      font: type.h3,
      width: '100%',
      textAlign: isMobile ? 'center' : 'right',
    },
    image: {
      margin: '10px',
      width: '250px',
    },
  };
  return (
    <div css={styles.project}>
      {image && <img css={styles.image} src={image[0].src} alt='album art' />}
      <div css={styles.column}>
        <h1 css={styles.subtitle}>{song.title}</h1>
        {audio && (
          <audio controls>
            <source css={styles.player} src={audio.url} type='audio/mpeg' />
          </audio>
        )}
      </div>
    </div>
  );
};

Song.propTypes = {
  isMobile: PropTypes.bool,
  song: PropTypes.object,
  image: PropTypes.array,
  audio: PropTypes.object,
};

Music.propTypes = {
  width: PropTypes.number,
  photos: PropTypes.object,
  content: PropTypes.object,
  icons: PropTypes.object,
};

export default Music;
