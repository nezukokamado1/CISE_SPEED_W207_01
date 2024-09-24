import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';
@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get('/test')
    test() {
        return this.bookService.test();
    }// Get all books
    @Get('/')
    async findAll() {
        try {
            return this.bookService.findAll();
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Books found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
    // Get a book by title (new route)
    @Get('/title/:title')
    async findByTitle(@Param('title') title: string) {
        try {
            const books = await this.bookService.findByTitle(title);
            if (books.length === 0) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: `No books found with title: ${title}`,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            return books;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching books by title',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    // Get one book via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.bookService.findOne(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Book found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
    // Create/add a book
    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'Book added successfully' };
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to add this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }
    // Update a book
    @Put('/:id')
    async updateBook(
        @Param('id') id: string,
        @Body() createBookDto: CreateBookDto,
    ) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'Book updated successfully' };
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to update this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }
    // Delete a book via id
    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
        try {
            return await await this.bookService.delete(id);
        } catch {
            throw new HttpException(

                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No such a book',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
}