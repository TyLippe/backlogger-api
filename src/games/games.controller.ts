import { Controller, Get, Query } from '@nestjs/common';

import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getGamesByName(@Query('gameTitle') gameTitle): Promise<any> {
    if (!gameTitle) return;

    return await this.gamesService.getGameData(gameTitle);
  }

  @Get('/namesByIds')
  async getGameNamesById(@Query('ids') ids): Promise<any> {
    if (!ids.length) return;

    return await this.gamesService.getGameNamesById(ids);
  }
}
