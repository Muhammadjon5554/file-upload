import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
