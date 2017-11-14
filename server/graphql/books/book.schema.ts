// book.js
import Author from '../authors/author.schema';

const Book = `
  type Book {
    title: String
    author: Author
  }

  extend type Mutation {
    createBook(title: String, author: String): Book
  }
`;

//Export dependencies too
export default () => [Book, Author];
