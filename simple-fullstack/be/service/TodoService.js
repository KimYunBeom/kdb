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
  selectTodo: async (param) => {
    const sql = `
select 
       seq
     , content
     , date_format(create_date, '%Y-%m-%d %H:%i:%s') as create_date
     , date_format(update_date, '%Y-%m-%d %H:%i:%s') as update_date
  from todo
 where 1=1
   and seq = ?
    `;

    const dbParam = [param.seq];

    const result = await db
      .query(sql, dbParam)
      .then((response) => {
        if (response.length < 1) {
          return null;
        } else {
          return response[0];
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return result;
  },
  insertTodo: async (param) => {
    const sql = `
    insert into todo
    (
        content
    ) values (
        ?
    )
    `;

    const dbParam = [param.content];

    const result = await db.query(sql, dbParam);
    return Number(result.insertId);
  },
  updateTodo: async (paramSeq, paramContent) => {
    const sql = `
    update todo
       set
           content = ?
         , update_date = now()
     where 1=1
       and seq = ?
    `;

    const dbParam = [paramContent, paramSeq];

    const result = await db.query(sql, dbParam);
    return Number(result.insertId);
  },
  deleteTodo: async (param) => {
    const sql = `
    delete 
      from todo
     where 1=1
       and seq = ?
    `;

    const dbParam = [param.seq];

    const result = await db.query(sql, dbParam);
    return Number(result.insertId);
  },
};

module.exports = service;
