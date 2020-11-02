import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 5000;

app.use('/', (_, res) => {
  res.status(200).send({ data: 'Hello world!' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

async function main() {
  const user = await prisma.user.update({
    where: { id: 1 },
    data: {
      name: 'Olaf',
      email: 'olafsulich@gmail.com',
    },
  });

  const users = await prisma.user.findMany({});
  console.log(users, user);
}
main();
