import React from 'react'
import OrderComponent from '@/components/tutorial/fetch-order'

export default function Orders() {
    return (
        <main className='pb-10'>
            <section className='py-16'>
                <h1 className='text-6xl text-center font-bold'>الـطـلـبـات</h1>
            </section>
            <div className='bg-white border rounded-3xl p-3 min-h-screen w-full'>
                <OrderComponent />
            </div>
        </main>
    )
}
