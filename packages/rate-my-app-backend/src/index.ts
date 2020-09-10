import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/', (_, res) => {
  res.status(200).send({ data: 'Hello world!' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
