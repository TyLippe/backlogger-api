import igdb from 'igdb-api-node';
import { Injectable } from '@nestjs/common';

import { getTwitchToken } from '../utils/getTwitchToken';
import { GameDTO, GamesDTO } from './dto/games.dto';
import { Platforms } from '../cache/platformsCache';

@Injectable()
export class GamesService {
  client = null;
  gameData: GamesDTO = new GamesDTO();
  platforms = new Platforms();

  async setTwitchToken() {
    if (!this.client) {
      console.log('Setting igdb client...');
      const client_id = process.env.IGDB_CLIENT_ID;
      const twitchToken = await getTwitchToken();
      this.client = igdb(client_id, twitchToken.access_token);
      console.log('Successfully set igdb client!');
    }
  }

  async getGameData(gameTitle: string): Promise<GamesDTO> {
    await this.setTwitchToken();

    this.gameData = new GamesDTO();
    await this.getGamesByName(gameTitle);
    const gameMetadataPromises = [
      this.getGameCoverArt(),
      this.getGamePlatforms(),
    ];
    await Promise.all(gameMetadataPromises);
    return this.gameData;
  }

  async getGamesByName(gameTitle: string): Promise<GamesDTO> {
    return await this.client
      .fields('name,id,cover,release_dates,platforms')
      .limit(250)
      .search(gameTitle)
      .request('/games')
      .then((res) => {
        for (let game of res.data) {
          this.gameData[game.id] = game;
        }
      })
      .catch((err) => console.log(err));
  }

  async getGameCoverArt(): Promise<any> {
    const start = performance.now();
    await this.client
      .fields('url,game')
      .limit(Object.keys(this.gameData).length)
      .where(
        `id=(${Object.values(this.gameData)
          .filter((e: GameDTO) => e.cover)
          .map((e: GameDTO) => e.cover)
          .join(',')})`,
      )
      .request('/covers')
      .then((res) => {
        for (let game of res.data) {
          this.gameData[game.game].coverURL = game.url.replace(
            '_thumb',
            '_cover_big',
          );
        }
      })
      .catch((err) => console.log(err));

    console.log('getGameCoverArt took: ', performance.now() - start);
  }

  async getGamePlatforms(): Promise<any> {
    const start = performance.now();
    await this.platforms.getPlatforms(this.client);

    for (let gameData of Object.values(this.gameData)) {
      if (gameData?.platforms && gameData.platforms.length) {
        this.gameData[gameData.id].platforms = this.platforms.getBulkNames(
          gameData.platforms,
        );
      }
    }

    console.log('getGamePlatforms took: ', performance.now() - start);
  }

  async getGameReleaseDates(): Promise<any> {
    for (let gameData of Object.values(this.gameData)) {
      await this.client
        .fields('y')
        .limit(50)
        .where(`id=(${gameData.release_dates.join(',')})`)
        .request('/release_dates')
        .then((res) => {
          this.gameData[gameData.id].releaseDates = [];
          for (let releaseDates of res.data) {
            this.gameData[gameData.id].releaseDates.push(releaseDates.y);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  async getGameNamesById(ids): Promise<any> {
    return await this.client
      .fields('name')
      .limit(ids.length)
      .where(`id=(${ids.join(',')})`)
      .request('/games')
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  }
}
