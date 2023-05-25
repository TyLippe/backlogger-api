import axios from 'axios';
import igdb from 'igdb-api-node';
import { Injectable } from '@nestjs/common';

import { getTwitchToken } from '../utils/getTwitchToken';
import { GameDTO, GamesDTO } from './dto/games.dto';

@Injectable()
export class GamesService {
  client = null;

  async setTwitchToken() {
    if (!this.client) {
      console.log('Setting igdb client...');
      const client_id = process.env.IGDB_CLIENT_ID;
      const twitchToken = await getTwitchToken();
      this.client = igdb(client_id, twitchToken.access_token);
      console.log('Successfully set igdb client!');
    }
  }

  async getGamesByName(gameTitle: string): Promise<GamesDTO> {
    await this.setTwitchToken();

    return await this.client
      .fields('name,id,cover')
      .limit(100)
      .search(gameTitle)
      .request('/games')
      .then((res) => {
        const gameData = {};
        for (let game of res.data) {
          gameData[game.id] = game;
        }
        return gameData;
      })
      .catch((err) => console.log(err));
  }

  async getGameCoverArt(gameData: any): Promise<GamesDTO> {
    await this.setTwitchToken();

    return await this.client
      .fields('url,game')
      .limit(Object.keys(gameData).length)
      .where(
        `id=(${Object.values(gameData)
          .filter((e: GameDTO) => e.cover)
          .map((e: GameDTO) => e.cover)
          .join(',')})`,
      )
      .request('/covers')
      .then((res) => {
        for (let game of res.data) {
          gameData[game.game].coverURL = game.url.replace(
            '_thumb',
            '_cover_big',
          );
        }
        return gameData;
      })
      .catch((err) => console.log(err));
  }
}
