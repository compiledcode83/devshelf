/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/books': {
    post: operations['BooksController_create'];
    get: operations['BooksController_findAll'];
  };
  '/books/{id}': {
    get: operations['BooksController_findOne'];
    put: operations['BooksController_update'];
    delete: operations['BooksController_remove'];
  };
  '/categories': {
    get: operations['CategoriesController_findAll'];
  };
  '/categories/{id}': {
    get: operations['CategoriesController_findOne'];
  };
  '/auth/sessions': {
    post: operations['AuthController_login'];
  };
  '/auth/users': {
    post: operations['AuthController_register'];
  };
  '/session/me': {
    get: operations['SessionController_findOne'];
  };
  '/reviews': {
    post: operations['ReviewsController_create'];
    get: operations['ReviewsController_findAll'];
  };
  '/reviews/{id}': {
    get: operations['ReviewsController_findOne'];
    put: operations['ReviewsController_update'];
    delete: operations['ReviewsController_remove'];
  };
  '/users/{id}': {
    get: operations['UsersController_findOne'];
  };
}

export interface operations {
  BooksController_create: {
    parameters: {};
    requestBody: {
      'application/json': components['schemas']['CreateBookDto'];
    };
    responses: {
      /** The book has been successfully created. */
      201: unknown;
      /** Forbidden. */
      403: unknown;
    };
  };
  BooksController_findAll: {
    parameters: {};
    responses: {
      200: {
        'application/json': components['schemas']['BookDto'][];
      };
    };
  };
  BooksController_findOne: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': components['schemas']['BookDto'];
      };
      /** There is no book with this id */
      404: unknown;
    };
  };
  BooksController_update: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      'application/json': components['schemas']['BookDto'];
    };
    responses: {
      200: {
        'application/json': { [key: string]: any };
      };
      /** Forbidden. */
      403: unknown;
    };
  };
  BooksController_remove: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': { [key: string]: any };
      };
      /** Forbidden. */
      403: unknown;
    };
  };
  CategoriesController_findAll: {
    parameters: {};
    responses: {
      200: {
        'application/json': components['schemas']['CategoryDto'][];
      };
    };
  };
  CategoriesController_findOne: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': components['schemas']['CategoryDto'];
      };
    };
  };
  AuthController_login: {
    parameters: {};
    requestBody: {
      'application/json': components['schemas']['LoginDto'];
    };
    responses: {
      201: unknown;
    };
  };
  AuthController_register: {
    parameters: {};
    requestBody: {
      'application/json': components['schemas']['RegisterDto'];
    };
    responses: {
      201: unknown;
    };
  };
  SessionController_findOne: {
    parameters: {};
    responses: {
      200: unknown;
    };
  };
  ReviewsController_create: {
    parameters: {};
    requestBody: {
      'application/json': components['schemas']['ReviewDto'];
    };
    responses: {
      /** The review has been successfully created. */
      201: unknown;
      /** Forbidden. */
      403: unknown;
    };
  };
  ReviewsController_findAll: {
    parameters: {};
    responses: {
      200: {
        'application/json': components['schemas']['ReviewDto'][];
      };
    };
  };
  ReviewsController_findOne: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': components['schemas']['ReviewDto'];
      };
      /** There is no review with this id */
      404: unknown;
    };
  };
  ReviewsController_update: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      'application/json': components['schemas']['UpdateReviewDto'];
    };
    responses: {
      200: {
        'application/json': { [key: string]: any };
      };
      /** Forbidden. */
      403: unknown;
    };
  };
  ReviewsController_remove: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': { [key: string]: any };
      };
      /** Forbidden. */
      403: unknown;
    };
  };
  UsersController_findOne: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        'application/json': components['schemas']['UserDto'];
      };
    };
  };
}

export interface components {
  schemas: {
    CreateBookDto: {
      title: string;
      authorId: number;
      linkToRead: string;
    };
    BookDto: {
      title: string;
      description?: string;
      authorId: number;
      publishedDate?: string;
      categoryId?: number;
      averageRating?: number;
      ratingsCount?: number;
      thumbnail?: string;
      language?: string;
      linkToRead: string;
      isPublic: boolean;
    };
    CategoryDto: {
      title: string;
      books: components['schemas']['BookDto'][];
    };
    LoginDto: {
      email: string;
      password: string;
    };
    RegisterDto: {
      username: string;
      email: string;
      password: string;
    };
    ReviewDto: {
      content: string;
      rating: number;
      bookId: number;
      authorId: number;
    };
    UpdateReviewDto: {
      content: string;
      rating: number;
    };
    UserDto: {
      username: string;
      email: string;
      role: 'ADMIN' | 'USER';
      library?: components['schemas']['BookDto'][];
      reviews?: components['schemas']['ReviewDto'][];
    };
  };
}
