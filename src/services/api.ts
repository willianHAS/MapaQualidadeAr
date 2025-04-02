import axios from 'axios';

export const getPaginatedLocations = (page = 1, limit = 1000) => {
  return axios.get(`http://localhost:3003/api/locations`, {
    params: { limit, page, has_geo: true },
    headers: {
      'X-API-Key': 'bc8454d0b8b8529747891084a68fd10cb7a8d4efe8e4d31d1d06e516629e4585',
      'Content-Type': 'application/json',
    }
  });
};
