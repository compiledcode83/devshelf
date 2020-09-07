import express from 'express';

const app = express();
const PORT = 5000;

app.use('/', (_, res) => {
  res.status(200).send({ data: 'Hello world!' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
