/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { colors, type, breakpoints } from '../../constants';
import { storage, db } from '../../firebase';

const styles = {
  title: {
    color: colors.purple,
    font: type.h1,
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '200px',
    margin: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    font: type.bodySemibold,
    padding: '0px 100px',
  },
  paragraph: {},
};

const Home = () => {
  const [content, setContent] = useState();
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    db.collection('home')
      .doc('static')
      .get()
      .then((result) => {
        setContent(result.data());
      });
  }, []);

  useEffect(() => {
    content &&
      content.photos &&
      content.photos.forEach((photo) => {
        storage
          .child(photo)
          .getDownloadURL()
          .then((url) => {
            setImageUrls((prevState) => [...prevState, url]);
          });
      });
  }, [content]);

  return content ? (
    <div>
      <h1 css={styles.title}>{content.title}</h1>
      <div css={styles.images}>
        {imageUrls &&
          imageUrls.map((url, index) => {
            return <img src={url} css={styles.image} key={index} alt='selfy' />;
          })}
      </div>
      <div css={styles.content}>
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

export default Home;
