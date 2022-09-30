import axios from 'axios';

export default async (method = 'get', url, data, headers) => {
  console.log('[REQ]', method, url, JSON.stringify(data), JSON.stringify(headers));

  return await axios({
    method,
    url,
    data,
    headers,
  })
    .then((res) => {
      let resData = res.data;

      console.log('[RES]', method, url, JSON.stringify(resData));

      return resData;
    })
    .catch((err) => {
      const errData = { code: err.code, message: err.message };

      console.log('[RES]', method, url, JSON.stringify(errData));

      return errData;
    });
};
