import Book from './book.schema';

const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;

//Export dependencies too
export default () => [Author, Book];
