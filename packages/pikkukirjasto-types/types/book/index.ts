import { Borrow } from "../borrow";
export interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  _id: string;
  borrows: Borrow[];
}

export type BookLanguage = "English" | "Finnish";

export interface BookData {
  numOfPages: number;
  rate: string;
  language: string;
  isAvaliable: boolean;
  overview: string;
}
