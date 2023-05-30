export class GamesDTO {
  id: GameDTO;
}

export class GameDTO {
  name: string;
  id: number;
  cover: number;
  coverURL: string;
  platforms: string[];
  releaseDates: string;
}
