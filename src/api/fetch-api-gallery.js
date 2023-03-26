import axios from 'axios';

const API_KEY = '33331302-a2f968128fc99efede8b05269';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchName, page) {
  const fetchImage = await axios('', {
    params: {
      key: API_KEY,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: searchName,
    },
  });

  return fetchImage.data;
}
