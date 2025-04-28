import createFakeIsbn from './isbn';
import { faker } from '@faker-js/faker';

interface ICreateRandomBooks {
  amount: number;
}

function createRandomBooks({ amount }: ICreateRandomBooks) {
  const books = Array.from({ length: amount }).map(() => ({
    isbn: createFakeIsbn(),
    author: faker.person.fullName(),
    title: faker.lorem.words({
      min: 1,
      max: 3,
    }),
    cover: faker.image.url(),
  }));

  return books;
}

export default createRandomBooks;
