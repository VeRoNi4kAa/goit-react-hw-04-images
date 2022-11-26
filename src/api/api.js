import axios from 'axios';
axios.defaults.baseURL = ' https://pixabay.com/api';

const PIXABAY_KEY = '24537625-47620fa03ad46ed0668a7b060';

export const fetchImages = async (value, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${value.value}&page=${page}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .catch(error => console.log('Error', error.message));
};
