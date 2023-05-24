import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { getTwitchToken } from '../utils/getTwitchToken';

@Injectable()
export class GamesService {
  twitchAPI = 'https://api.igdb.com/v4/games';
  client_id = process.env.IGDB_CLIENT_ID;

  async getGamesByName(gameTitle: string): Promise<any> {
    const twitchToken = await getTwitchToken();

    return await axios
      .post(
        `${this.twitchAPI}/search=${gameTitle}&fields=name,id`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Client-ID': this.client_id,
            Authorization: `Bearer ${twitchToken.access_token}`,
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
