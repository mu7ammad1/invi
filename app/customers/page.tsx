import CustomersComponent from '@/components/tutorial/fetch-customers'

export default function Orders() {
    return (
        <main className='pb-10'>
            <section className='py-16'>
                <h1 className='text-6xl text-center font-bold'>الـعـمـلاء</h1>
            </section>
            <div className='bg-white border rounded-3xl p-3 min-h-screen w-full'>
                <CustomersComponent />
            </div>
        </main>
    )
}
