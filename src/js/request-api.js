import axios from 'axios';

async function fetchImageByRequest(userRequest, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '37675395-9e31173c5a3e62573866f9f7d';
  const options = {
    key: KEY,
    q: userRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  };

  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${userRequest}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`,
    options
  );
  return response;
}
export { fetchImageByRequest };
