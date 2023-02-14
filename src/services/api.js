import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32875866-ed83e1256a465fed3b39929d3';

export const fetchImagesByQuery = async (query, page = 1) => {
  const { data } = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=15&orientation=horizontal`
  );
  // console.log(data);
  return data;
};
