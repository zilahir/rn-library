import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type BorrowDocument = HydratedDocument<Borrow>;

@Schema({ collection: 'borrows', timestamps: true })
export class Borrow {
  @Prop({
    required: true,
    unique: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ required: true, unique: false })
  isbn: string;

  @Prop({ required: true, unique: false, default: false })
  isBorrowed: boolean;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
