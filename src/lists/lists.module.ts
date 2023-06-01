import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { Lists } from './entity/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lists])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
