import express from 'express';
import usersRouter from './routes/users.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


