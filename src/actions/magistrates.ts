import { paginateArray } from '@utils/functions/pagination';
import { magistratesMock } from '@pages/main/mock';

import type { PaginatedResponse } from '@components/multiStepForm/types';

const MOCK_DELAY_MS = 800;

export const fetchMagistrates = async (filters: Record<string, unknown>, page = 0, limit = 5): Promise<PaginatedResponse> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  const searchName = String(filters.nome || '').toLowerCase();
  const searchMatricula = String(filters.matricula || '').toLowerCase();
  const filteredData = magistratesMock.filter((item) => item.nome.toLowerCase().includes(searchName) && item.matricula.toLowerCase().includes(searchMatricula));
  return paginateArray(filteredData, page, limit);
};