import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import Pane from './models/Pane';
import uploadConfig from './config/uploads';

const app = express();
const upload = multer(uploadConfig);

mongoose.connect(
  'mongodb+srv://john:joaoneto456@projects.jbrj2.mongodb.net/panedb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.get('/panettonee/index', async (req, res) => {
  const results = await Pane.find({});
  return res.json(results);
});

app.post('/panettonee', upload.single('thumbnail'), async (req, res) => {
  const { name, brand, description, calories, price } = req.body;
  const { filename } = req.file;

  const pane = await Pane.create({
    name,
    brand,
    description,
    calories,
    price,
    thumbnail: filename,
  });

  return res.json(pane);
});

export default app;
