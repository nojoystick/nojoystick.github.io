/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../../constants';
import { Linkbar } from '../../components';
import { storage } from '../../firebase';
import './audio.css';

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

  document.addEventListener(
    'play',
    function (e) {
      var audios = document.getElementsByTagName('audio');
      for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] !== e.target) {
          audios[i].pause();
        }
      }
    },
    true
  );

  useEffect(() => {
    content &&
      content.albums &&
      content.albums.forEach((album) => {
        album.songs.forEach((song) => {
          if (song.file) {
            storage
              .child(song.file)
              .getDownloadURL()
              .then((url) => {
                setAudioUrls((prevState) => [
                  ...prevState,
                  { album: album.title, title: song.title, url: url },
                ]);
              });
          }
        });
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
      {content.albums.map((album, index) => {
        return (
          <Album
            isMobile={isMobile}
            album={album}
            image={
              photos &&
              photos[album.title] &&
              Object.values(photos[album.title])
            }
            key={index}
            audio={audioUrls.filter((el) => el.album === album.title)}
          />
        );
      })}
    </div>
  ) : (
    <div />
  );
};

const Album = ({ isMobile, album, image, audio }) => {
  const styles = {
    project: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'unset',
      minWidth: isMobile ? 'unset' : '500px',
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
      justifyContent: 'space-between',
      padding: '0px 10px',
    },
    subtitle: {
      color: colors.lightred,
      font: type.h3,
      width: '100%',
      textAlign: isMobile ? 'center' : 'right',
    },
    image: {
      margin: '0px 10px 0px 0px',
      width: '250px',
      height: '250px',
    },
    songcontainer: {
      maxHeight: '400px',
      overflowY: 'scroll',
      padding: '5px 15px',
      backgroundColor: colors.offpink,
    },
  };
  return (
    <div css={styles.project}>
      {image && <img css={styles.image} src={image[0].src} alt='album art' />}
      <div css={styles.column}>
        <h1 css={styles.subtitle}>{album.title}</h1>
        <div css={styles.songcontainer}>
          {audio &&
            audio.map((song, index) => {
              return <Song {...song} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Song = ({ title, url }) => {
  return (
    <div>
      <h3>{title}</h3>
      <audio controls>
        <source css={styles.player} src={url} type='audio/mpeg' />
      </audio>
    </div>
  );
};

Song.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

Album.propTypes = {
  isMobile: PropTypes.bool,
  album: PropTypes.object,
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
