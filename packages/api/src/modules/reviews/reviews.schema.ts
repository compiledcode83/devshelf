import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
  content: yup.string().required(),
  rating: yup.number().required(),
  bookId: yup.number().required(),
  authorId: yup.number().required(),
});
