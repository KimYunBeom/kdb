const db = require('../middleware/db');
db.getConnection();

const service = {
  selectTodos: async () => {
    const sql = `
select 
       seq
     , content
     , date_format(create_date, '%Y-%m-%d %H:%i:%s') as create_date
     , date_format(update_date, '%Y-%m-%d %H:%i:%s') as update_date
  from todo
 where 1=1
 order by create_date desc
    `;

    const result = await db
      .query(sql)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      });

    return result;
  },
};

module.exports = service;
