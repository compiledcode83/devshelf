import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let booksService: BooksService;
  const book = {
    id: 1,
    title: '',
    description: '',
    authorId: 2,
    categoryId: 1,
    publishedDate: new Date(),
    averageRating: 2,
    ratingsCount: 2,
    thumbnail: '',
    language: '',
    linkToRead: '',
    isPublic: true,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  describe('findAll', () => {
    it('returns list of books', async () => {
      const books = [book];

      jest.spyOn(booksService, 'findAll').mockImplementation(() => Promise.resolve(books));
      expect(await booksService.findAll()).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('returns book with given id', async () => {
      const testBook = {
        ...book,
        reviews: [{ id: 1, bookId: 1, authorId: 1, content: '', rating: 1 }],
      };
      jest.spyOn(booksService, 'findOne').mockImplementation(() => Promise.resolve(testBook));
      expect(await booksService.findOne({ id: 1 })).toEqual(testBook);
    });
  });

  describe('create', () => {
    it('creates new book', async () => {
      jest.spyOn(booksService, 'create').mockImplementation(() => Promise.resolve(book));
      expect(await booksService.create({ title: 'test', authorId: 1, linkToRead: '' })).toEqual(
        book,
      );
    });
  });

  describe('update', () => {
    it('updates a book', async () => {
      jest.spyOn(booksService, 'update').mockImplementation(() => Promise.resolve(book));

      expect(await booksService.update({ where: { id: 1 }, data: book })).toEqual(book);
    });
  });

  describe('remove', () => {
    it('removes a book', async () => {
      jest.spyOn(booksService, 'remove').mockImplementation(() => Promise.resolve(book));

      expect(await booksService.remove({ id: 1 })).toEqual(book);
    });
  });
});
