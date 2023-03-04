import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32977164-db809f268a8ff4387fbfd100d',
    per_page: '12',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchQueryApi = async (query, page) => {
  const response = await instance(`?q=${query}&page=${page}`);
  const pics = await response.data;
  return pics;
};

// const KEY = '32977164-db809f268a8ff4387fbfd100d';
// const BASE_URL = 'https://pixabay.com/';

// export const searchQueryApi = async query => {
//   const response = await axios(
//     `${BASE_URL}api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//   );
//   const pics = await response.data;
//   return pics;
// };
