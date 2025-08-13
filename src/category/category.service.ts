import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { successResponse } from 'src/utils/succes-response';
import { handleError } from 'src/utils/handle-error';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly fileService: FileService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    try {
      const existsCategory = await this.categoryModel.findOne({
        name: createCategoryDto.name,
      });
      const image = await this.fileService.createFile(file);
      if (existsCategory) {
        throw new ConflictException('Category name already exists');
      }

      const category = new this.categoryModel({ ...createCategoryDto, image });
      await category.save();
      return successResponse(category);
    } catch (error) {
      handleError(error);
    }
  }
  async findAll() {
    try {
      const categories = await this.categoryModel.find();
      return successResponse(categories);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return successResponse(category);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );
      if (!category) {
        throw new NotFoundException('category not found');
      }
      return successResponse(category);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id);
      if (!category) {
        throw new NotFoundException('category not found');
      }
      return successResponse({});
    } catch (error) {
      handleError(error);
    }
  }
}
