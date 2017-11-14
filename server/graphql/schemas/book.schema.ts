// book.js
import Author from './author.schema';

const Book = `
  type Book {
    title: String
    author: Author
  }
`;

//Export dependencies too
export default () => [Book, Author];
