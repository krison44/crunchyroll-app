import { faker } from '@faker-js/faker';
import { GENRE, MediaType } from './media.enum';
import { Media } from './media.interface';

export const createRandomMedia = (iterator: number): Media[] => {
  const medias: Media[] = [];
  for (let i = 1; i <= iterator; i++) {
    medias.push({
      id: i,
      title: faker.lorem.words({ min: 1, max: 3 }),
      type: Object.values(MediaType)[faker.number.int({ min: 0, max: 4 })],
      genre: Object.values(GENRE)[faker.number.int({ min: 0, max: 12 })],
      releaseYear: new Date(faker.date.past({ years: 25 })).getFullYear().toString(),
      rating: faker.number.float({ min: 1, max: 10, precision: 0.2 })
    })
  }
  return medias;
}
