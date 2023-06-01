import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  userId: string;

  @Column({
    nullable: false,
  })
  name: string; // Name of list

  @Column({
    nullable: true,
  })
  games: string; // Stringified Obj
}
