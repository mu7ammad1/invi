import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function Orders() {
    return (
        <main className='pb-10'>
            <section className='py-16'>
                <h1 className='text-6xl text-center font-bold'>employees</h1>
            </section>
            <div className='bg-white border rounded-3xl p-3 min-h-screen w-full'>
                <section className='flex justify-between items-start w-full'>
                    <div className='gap-3 flex *:rounded-xl'>
                        <Button variant={"default"} size={"lg"}>Home</Button>
                        <Input type="email" placeholder="Search any order" />
                    </div>
                    <Dialog>
                        <DialogTrigger className='bg-primary rounded-xl font-medium p-2 px-3 text-sm text-white'>
                            New order
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </section>
                <section className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 *:rounded-2xl *:border *:p-3 *:h-72'>
                    <div className="bg-blue-100">
                        <p>#32185</p>
                    </div>
                    <div className="bg-teal-100"></div>
                    <div className="bg-teal-100"></div>
                    <div className="bg-teal-100"></div>
                    <div className="bg-green-100"></div>
                    <div className="bg-teal-100"></div>
                    <div className="bg-rose-100"></div>
                    <div className="bg-yellow-100"></div>
                </section>
            </div>
        </main>
    )
}
