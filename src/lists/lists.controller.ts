import { Body, Controller, Get, Param, Put } from '@nestjs/common';

import { ListsService } from './lists.service';
import { CreateListDto } from './dto/createList.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  getLists() {
    return this.listsService.getAllLists();
  }

  @Get(`userId/:userId`)
  getListsByUserId(@Param('userId') userId: string) {
    return this.listsService.getUserLists(userId);
  }

  @Put()
  createList(@Body() listDto: CreateListDto) {
    return this.listsService.createList(listDto);
  }
}
