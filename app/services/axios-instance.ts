import axios from 'axios';

export default axios.create({
  baseURL: 'https://plus-dev.mmcytech.com/api/v1/',
  headers: {
    'Espo-Authorization': process.env.ESPO_AUTHORIZATION,
    'x-api-key': process.env.API_KEY,
  },
});
