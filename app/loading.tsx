import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Suspense } from 'react'
export default function Loading() {
  return <Suspense fallback={<LoadingSkeleton />}>
    <LoadingSkeleton />
  </Suspense>
}
