const { PAGINATION_TYPES } = require('../constants');

const paginate = (type, queryParams) => {
  const {
    page = 1,
    perPage = PAGINATION_TYPES[type].perPage,
    all,
  } = queryParams;
  const query = {};

  if (all === 'true') {
    query.all = true;
  } else {
    let pageNumber = parseInt(page, 10);
    let perPageNumber = parseInt(perPage, 10);

    let skipValue = perPageNumber * (pageNumber - 1);

    query.skip = skipValue;
    query.limit = perPageNumber;
    query.pagination = {
      page: pageNumber,
      perPage: perPageNumber,
    };
  }

  delete queryParams.page;
  delete queryParams.skip;
  delete queryParams.all;

  return { queryParams, query };
};

const getFilters = (type) => (req, res, next) => {
  const options = req.query;
  const { queryParams, query } = paginate(type, options);

  for (const [key, value] of Object.entries(queryParams)) {
    const keyValue = key.replace('_sort', '');
    if (PAGINATION_TYPES[type].filters.includes(keyValue)) {
      query.sort = query.sort
        ? { ...query.sort, [keyValue]: value }
        : { [keyValue]: value };
    }
  }

  // Default sorting
  if (!query.sort) {
    query.sort = PAGINATION_TYPES[type].defaultSorting;
  }

  res.locals.query = query;
  next();
};

module.exports = getFilters;
