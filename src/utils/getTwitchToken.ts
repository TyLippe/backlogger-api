import axios from 'axios';

export const getTwitchToken = async () => {
  const client_id = process.env.IGDB_CLIENT_ID;
  const client_secret = process.env.IGDB_CLIENT_SECRET;
  const grant_type = process.env.IGDB_GRANT_TYPE;

  return await axios
    .post('https://id.twitch.tv/oauth2/token', {
      client_id,
      client_secret,
      grant_type,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('Error while getting Twitch Token: ', err);
    });
};
