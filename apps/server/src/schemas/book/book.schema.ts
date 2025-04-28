import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ collection: 'books' })
export class Book {
  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  cover: string;

  @Prop({
    required: false,
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Borrow',
    unique: true,
  })
  borrows: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
