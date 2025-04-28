import { Book } from "../book";
import { User } from "../user";

export interface BorrowBookDto {
  user: string;
  isbn: string;
}

export interface Borrow {
  book: Book;
  isbn: string;
  isBorrowed: boolean;
  user: User;
}
