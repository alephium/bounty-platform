import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { type User } from '@/interface/user';

const fetchRecentContribiumers = async (): Promise<User[]> => {
  const response = await axios.get('/api/sidebar/recent-contribiumers');
  return response.data;
};

export const recentContribiumersQuery = queryOptions({
  queryKey: ['recentContribiumers'],
  queryFn: fetchRecentContribiumers,
  staleTime: 1000 * 60 * 60,
  gcTime: 1000 * 60 * 60 * 2,
});
