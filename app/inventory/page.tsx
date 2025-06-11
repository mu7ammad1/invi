import InventoryComponent from '@/components/tutorial/fetch-inventory'

export default function Inventory() {
    return (
        <main className='pb-10'>
            <section className='py-16'>
                <h1 className='text-6xl text-center font-bold'>الـمـنـتـجـات</h1>
            </section>
            <div className='bg-white border rounded-3xl p-3 min-h-screen w-full'>
                <InventoryComponent />
            </div>
        </main>
    )
}
