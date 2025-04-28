import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { Book } from 'src/schemas/book/book.schema';
import {
  BookService,
  PikkukirjastoBook,
} from '../../services/book/book.service';
import { AuthGuard } from '../../services/auth/auth.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @UseGuards(AuthGuard)
  @Get()
  async getAllBook(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get('/author/:author')
  async findBookByAuthor(@Param('author') author: string): Promise<Book[]> {
    return this.bookService.findBookByAuthor(author);
  }

  @Get('/title/:title')
  async findBookByTitle(@Param('title') title: string): Promise<Book[]> {
    return this.bookService.findBookByTitle(title);
  }

  @Get('/isbn/:isbn')
  async findBookByIsbn(@Param('isbn') isbn: string): Promise<Book | null> {
    return this.bookService.findBookByIsbn(isbn);
  }

  @Post('/')
  async createBook(@Body() createBookDto: PikkukirjastoBook): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }
}
