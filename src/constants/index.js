/* Email constants */
const EMAIL_TYPES = {
  FORGOT_PASSWORD: {
    type: 'FORGOT_PASSWORD',
    subject: 'My Portfolio Provider App - Reset forgotten password',
    template: 'password_recovery',
  },
};

/* PAGINATION TYPES */
const PAGINATION_TYPES = {
  TECHNOLOGIES: {
    type: 'TECHNOLOGIES',
    perPage: 10,
    filters: ['_id', 'name', 'type'],
    defaultSorting: { type: 'ASC', name: 'ASC' },
  },
  USERS: {
    type: 'USERS',
    perPage: 5,
    filters: ['_id', 'nickname', 'email', 'role'],
    defaultSorting: { _id: 'DESC' },
  },
  COURSES: {
    type: 'COURSES',
    perPage: 10,
    filters: ['_id', 'name', 'platform', 'language'],
    defaultSorting: { _id: 'DESC' },
  },
  PROJECTS: {
    type: 'PROJECTS',
    perPage: 1,
    filters: ['_id', 'name', 'type', 'pinned'],
    defaultSorting: { type: 'ASC', _id: 'DESC' },
  },
};

module.exports = {
  EMAIL_TYPES,
  PAGINATION_TYPES,
};
