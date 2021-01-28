import * as yup from 'yup';

export const createBookSchema = yup.object().shape({
  title: yup.string().required(),
  authorId: yup.number().required(),
  linkToRead: yup.string().url().required(),
});
