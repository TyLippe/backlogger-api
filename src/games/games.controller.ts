import { Controller, Get, Query } from '@nestjs/common';

import { GamesService } from './games.service';
import { GameDTO, GamesDTO } from './dto/games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getGamesByName(@Query('gameTitle') gameTitle): Promise<any> {
    if (!gameTitle) return;
    let gameData: GamesDTO = {
      id: new GameDTO(),
    };

    // Get game metadata
    gameData = await this.gamesService.getGamesByName(gameTitle);
    // Get game cover art
    gameData = await this.gamesService.getGameCoverArt(gameData);
    return gameData;
  }
}
