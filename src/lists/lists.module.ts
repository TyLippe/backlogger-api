import { Module } from '@nestjs/common';

import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}