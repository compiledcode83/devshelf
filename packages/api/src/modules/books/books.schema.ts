import * as yup from 'yup';

export const createBookSchema = yup.object().shape({
  title: yup.string().required(),
  authorId: yup.number().required(),
  linkToRead: yup.string().url().required(),
});

export const updateBookSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  authorId: yup.number(),
  publishedDate: yup.date(),
  categoryId: yup.number(),
  averageRating: yup.number(),
  thumbnail: yup.string(),
  language: yup.string(),
  linkToRead: yup.string().url(),
});
