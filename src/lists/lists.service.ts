import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lists } from './entity/list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/createList.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(Lists) private readonly listRepository: Repository<Lists>,
  ) {}

  async getUserLists(userId: string) {
    const listData = {};
    const res = await this.listRepository.findBy({ userId });
    for (let list of res) {
      listData[list.name] = {
        ...list,
        games: JSON.parse(list.games) || {},
      };
    }
    return listData;
  }

  createList(listDto: CreateListDto) {
    return this.listRepository.save({
      ...listDto,
      games: JSON.stringify(listDto.games),
    });
  }
}
