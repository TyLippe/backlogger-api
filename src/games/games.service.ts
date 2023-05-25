import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { getTwitchToken } from '../utils/getTwitchToken';

@Injectable()
export class GamesService {
  twitchToken = null;
  twitchAPI = 'https://api.igdb.com/v4/games';
  client_id = process.env.IGDB_CLIENT_ID;

  async setTwitchToken() {
    if (!this.twitchToken) {
      console.log('Twitch Token not set...');
      console.log('Getting token...');
      this.twitchToken = await getTwitchToken();
    }
  }

  async getGamesByName(gameTitle: string): Promise<any> {
    await this.setTwitchToken();

    return await axios
      .post(
        `${this.twitchAPI}/?search=${gameTitle}&fields=name,id`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Client-ID': this.client_id,
            Authorization: `Bearer ${this.twitchToken.access_token}`,
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('Error searhing for game: ', err);
      });
  }
}
