import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

@Injectable()
export class ProductsService {
  constructor(
 @InjectModel(Product.name)private readonly productModel: Model<Product>,
 @InjectModel(Category.name)private readonly categoryModel: Model<Category>
  ){}

  async create(createProductDto: CreateProductDto) {
  const category = await this.categoryModel.findById(createProductDto.categoryId)
  if (!category) {
    throw new BadRequestException('Category id incorrect')
  }
  const product = new this.productModel(createProductDto)
  return product
  }

  async findAll() {
    const products =await this.productModel.find().populate('categoryId')
    return products
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('categoryId')
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id,updateProductDto,{new:true})
    return product
  }

  async  remove(id: string) {
 await this.productModel.findByIdAndDelete(id)
 return {}
  }
}
