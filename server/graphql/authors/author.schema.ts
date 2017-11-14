import Book from '../books/book.schema';

const Author = `
  type Author {
    id: Int
    firstName: String
    lastName: String
    books: [Book]
  }

  extend type Mutation {
    createAuthor(firstName: String, lastName: String): Author
  }
`;

//Export dependencies too
export default () => [Author, Book];
