import axios from 'axios';
import * as API from '../url';

export const getCountriesStates = async () => {
  const res = await axios.get(API.COUNTRIES_STATES);

  return res.data;
};
