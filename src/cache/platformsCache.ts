export class PlatformsDTO {
  id: PlatformDTO;
}

export class PlatformDTO {
  id: string;
  name: string;
}

export class Platforms {
  platforms: PlatformsDTO = new PlatformsDTO();

  async getPlatforms(client) {
    if (Object.keys(this.platforms).length) return this.platforms;

    console.log('CACHE EMPTY GETTING PLATFORMS');

    await client
      .fields('name')
      .limit(500)
      .request('/platforms')
      .then((res) => {
        for (let platform of res.data) {
          this.platforms[platform.id] = platform.name;
        }
      })
      .catch((err) => console.log(err));

    return this.platforms;
  }

  getBulkNames(ids) {
    const platformNames = [];
    for (let id of ids) {
      platformNames.push(this.platforms[id]);
    }
    return platformNames;
  }
}
