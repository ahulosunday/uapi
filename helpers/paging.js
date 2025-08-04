const getPagination = (page=1, per_page=30) => {
  const limit = parseInt(per_page);
  const offset = parseInt((page - 1) * per_page);
  return { limit, offset };
};
const getPagingData = (data, page = 1, limit) => {
  const { count: totalItems, rows: res } = data;
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages,res, currentPage };
};
module.exports = {getPagination, getPagingData}