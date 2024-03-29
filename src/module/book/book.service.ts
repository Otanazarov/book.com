import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Like, Repository } from 'typeorm';
import { Category } from 'src/module/category/entities/category.entity';
import { log } from 'console';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async search(query) {
    return new ApiResponse(
      await this.bookRepo.find({
        where: {
          bookName: Like(`%${query}%`),
        },
      }),
    );
  }

  async create(createBookDto: CreateBookDto) {
    const { bookName, categoryID, desc, price,pdf } = createBookDto;
    console.log(pdf);
    
    const arrayOFUserObject = [];
    for (let id of categoryID) {
      const category = await this.categoryRepo.findOneBy({ id });
      if (!category) {
        throw new NotFoundException(`category with ${id} not found`);
      }
      arrayOFUserObject.push(category);
    }
    const category = await this.bookRepo.create({
      bookName,
      desc,
      price,
      pdf,
      category: arrayOFUserObject,
    });
    console.log(category);
    await this.bookRepo.save(category);
  }

  async findAll() {}

  async findOne(id: number) {
    const category = await this.bookRepo.findOne({
      relations: ['category'],
      where: { id: id },
    });
    return new ApiResponse(category);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.bookRepo.findOneBy({ id });
      if (!book) {
        throw new NotFoundException(`${id} not found`);
      }
      const { bookName, categoryID, desc, price } = updateBookDto;
      const updateCategory = [];
      for (let id of categoryID) {
        const category = await this.categoryRepo.findOneBy({ id });
        if (!category) {
          throw new NotFoundException(`${id} not found`);
        }
        updateCategory.push(category);
      }
      const updatebook = await this.bookRepo.update(
        { id },
        { bookName, category: updateCategory, desc, price },
      );
      console.log(updatebook);
      
      return 'succes';
    } catch (error) {
      throw  error;
    }
  }

  async remove(id: number) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`${id} not foundd`);
    }
    await this.bookRepo.remove(await this.bookRepo.findOneBy({ id: id }));
  }
}
