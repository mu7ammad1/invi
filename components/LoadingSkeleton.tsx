import { Loader } from 'lucide-react'
import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <p className='animate-spin'>
        <Loader />
      </p>
    </div>
  )
}
