/**
 * Sanity Client
 * to be used for getting data from sanity
 */
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn,
});
