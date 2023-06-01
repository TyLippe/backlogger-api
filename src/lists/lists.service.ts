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

  getAllLists() {
    return this.listRepository.find();
  }

  getUserLists(userId: string) {
    return this.listRepository.findBy({ userId });
  }

  createList(listDto: CreateListDto) {
    return this.listRepository.save(listDto);
  }
}
