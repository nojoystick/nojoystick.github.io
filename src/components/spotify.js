import axios from 'axios';
import qs from 'qs';

const {
  REACT_APP_SPOTIFY_CLIENT_ID,
  REACT_APP_SPOTIFY_CLIENT_SECRET,
  REACT_APP_SPOTIFY_AUTHORIZE_URI,
} = process.env;

/**
 * A simple class for interfacting with the Spotify API
 */

const getToken = () => {
  (async () => {
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: REACT_APP_SPOTIFY_CLIENT_ID,
        password: REACT_APP_SPOTIFY_CLIENT_SECRET,
      },
    };
    const data = {
      grant_type: 'client_credentials',
    };
    try {
      const response = await axios.post(
        REACT_APP_SPOTIFY_AUTHORIZE_URI,
        qs.stringify(data),
        headers
      );
      console.log('get the token', response.data);
      let res = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers,
        params: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        },
      });
      console.log('hey', res);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  })();
};

class spotify {
  static token = getToken();

  getProfile() {
    (async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  getRecentlyPlayed() {
    console.log('here goes');
    console.log('with token', spotify.token);
    const getHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    (async () => {
      try {
        let response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/player/recently-played',
          getHeaders,
          params: {
            access_token: spotify.token.access_token,
            refresh_token: spotify.token.refresh_token,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }
}

export default spotify;
