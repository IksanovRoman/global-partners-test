import { _axios } from '../API/axios';

export const getContributionData = async () => {
  const response = await _axios.get('https://dpg.gg/test/calendar.json');
  return response.data;
};
