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
import { Book } from './book.schema'; // Import the Book type

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get('/test')
    test() {
        return this.bookService.test();
    }

    @Get('/')
    async findAll() {
        try {
            return await this.bookService.findAll();
        } catch (error) {
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

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.bookService.findOne(id);
        } catch (error) {
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

    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            const newBook = await this.bookService.create(createBookDto);
            return { message: 'Book added successfully', book: newBook };
        } catch (error) {
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

    @Put('/:id')
    async updateBook(
        @Param('id') id: string,
        @Body() createBookDto: CreateBookDto,
    ) {
        try {
            const updatedBook = await this.bookService.update(id, createBookDto);
            return { message: 'Book updated successfully', book: updatedBook };
        } catch (error) {
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

    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
        try {
            const deletedBook = await this.bookService.delete(id);
            return { message: 'Book deleted successfully', book: deletedBook };
        } catch (error) {
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

    @Post(':id/rate')
    async rateBook(
        @Param('id') id: string,
        @Body('rating') rating: number,
    ): Promise<{ averageRating: number }> {
        return this.bookService.rateBook(id, rating);
    }

    @Post('check-duplicates')
    async checkDuplicates(@Body() book: Partial<Book>) {
        const duplicates = await this.bookService.checkDuplicates(book);
        return { duplicates };
    }

    @Get('recent')
    async getRecentBooks() {
        try {
            const recentBooks = await this.bookService.getRecentBooks();
            return recentBooks;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error occurred while fetching recent books',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}