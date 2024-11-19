import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  
  stega:{
    studioUrl:process.env.VERCEL_URL
    ?`"http://${process.env.VERCEL_URL}/studio`
    : `${process.env.NEXT_PUBLIC_CASE_URL}/studio`,
  },
})