import { Document, Schema, model } from 'mongoose';

interface IPane extends Document {
  name: string;
  brand: string;
  description: string;
  calories: number;
  price: string;
  thumbnail: string;
}

const PaneSchema = new Schema(
  {
    name: String,
    description: String,
    brand: String,
    calories: Number,
    price: String,
    thumbnail: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// eslint-disable-next-line func-names
PaneSchema.virtual('thumbnail_url').get(function (this: { thumbnail: string }) {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model<IPane>('Pane', PaneSchema);
