import { Document, Schema, model } from 'mongoose';

interface IPane extends Document {
  name: string;
  brand: string;
  description: string;
  calories: number;
  price: string;
  weight: string;
  thumbnail: string;
}

const PaneSchema = new Schema(
  {
    name: String,
    brand: String,
    description: String,
    calories: Number,
    price: String,
    weight: String,
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
  return `https://panettonee-api.herokuapp.com/files/${this.thumbnail}`;
});

export default model<IPane>('Pane', PaneSchema);
