import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32977164-db809f268a8ff4387fbfd100d',
    per_page: 12,
  },
});

export const searchQuery = async (query, page) => {};
