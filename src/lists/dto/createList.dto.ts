export class CreateListDto {
  id: string;
  userId: string;
  name: string;
  games: CreateGameDto;
}

export class CreateGameDto {
  [id: string]: Game;
}

export class Game {
  name: string;
  id: string;
}
