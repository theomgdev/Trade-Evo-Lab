import express from 'express';

const app = express();
const html = String.raw;

// assets folder
app.use('/assets', express.static('assets'));
// Routes
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log('Server started on port 3000');
});