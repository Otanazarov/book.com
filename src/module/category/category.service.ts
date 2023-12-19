import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { Book } from 'src/module/book/entities/book.entity';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllCategoryDto } from './dto/findAll-category.dto';
import { Pagination } from 'src/common/util/pagination';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    const category = this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(category);
  }

  async findAll(findAllCategoryDto: FindAllCategoryDto) {
    const totalPageCount = await this.categoryRepo.count();
    const { limit, page } = findAllCategoryDto;
    const pagination = new Pagination(limit, page, totalPageCount);
    console.log(page)
    const posts = await this.categoryRepo.find({
      take: pagination.limit,
      skip: pagination.offset
    });
    // return posts.map((v) => {
    //   return { name: v.categoryName, id: v.id };
    // });
    return new ApiResponse(posts, pagination);
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      relations: ['book'],
      where: { id: id },
    });
    return category.book.map((v) => {
      return { name: v.bookName, price: v.price, desc: v.desc,id:v.id };
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepo.findOneBy({ id });
      console.log(category);
      if (!category) {
        throw new NotFoundException(`${category} Category not found`);
      }
      const updateCategory = await this.categoryRepo.update(
        { id },
        updateCategoryDto,
      );
      return 'succes';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepo.findOneBy({ id });
      if (!category) {
        throw new NotFoundException(`${category} Category not found`);
      }
      await this.categoryRepo.remove(
        await this.categoryRepo.findOneBy({ id: id }),
      );
    } catch (error) {
      throw error;
    }
  }
}
