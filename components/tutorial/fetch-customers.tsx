'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { toast } from 'sonner'

type Customer = {
  id: number
  name: string
  phone: string
  email?: string
  address?: string
}

export default function CustomersComponent() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    phone: '',
    email: '',
    address: '',
  })
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('customers')
    if (stored) setCustomers(JSON.parse(stored))
  }, [])

  const saveCustomers = (updated: Customer[]) => {
    localStorage.setItem('customers', JSON.stringify(updated))
    setCustomers(updated)
  }

  const addOrUpdateCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('الاسم ورقم الهاتف مطلوبان')
      return
    }

    if (selectedCustomer) {
      const updated = customers.map(c =>
        c.id === selectedCustomer.id ? { ...c, ...newCustomer } as Customer : c
      )
      saveCustomers(updated)
    } else {
      const newC: Customer = {
        id: Math.floor(Math.random() * 9000 + 1000),
        name: newCustomer.name!,
        phone: newCustomer.phone!,
        email: newCustomer.email,
        address: newCustomer.address,
      }
      saveCustomers([newC, ...customers])
    }

    setNewCustomer({ name: '', phone: '', email: '', address: '' })
    setSelectedCustomer(null)
    setDialogOpen(false)
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  )

  return (
    <main className='p-4'>
      <section className='flex justify-between gap-3 items-start'>
        <div className='flex gap-2 items-center'>
          <Button onClick={() => saveCustomers([...customers])}>تحديث</Button>
          <Input
            type='search'
            placeholder='ابحث عن عميل'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            className='bg-primary rounded-xl font-medium p-2 px-4 text-white'
            onClick={() => {
              setNewCustomer({ name: '', phone: '', email: '', address: '' })
              setSelectedCustomer(null)
            }}
          >
            + عميل جديد
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCustomer ? 'تعديل عميل' : 'عميل جديد'}</DialogTitle>
              <DialogDescription>املأ البيانات لتسجيل العميل.</DialogDescription>
              <div className='flex flex-col gap-3 mt-4'>
                <Input
                  placeholder='الاسم'
                  value={newCustomer.name}
                  onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
                <Input
                  placeholder='رقم الهاتف'
                  value={newCustomer.phone}
                  onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
                <Input
                  placeholder='البريد الإلكتروني (اختياري)'
                  value={newCustomer.email}
                  onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
                <Input
                  placeholder='العنوان (اختياري)'
                  value={newCustomer.address}
                  onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
                <Button onClick={addOrUpdateCustomer}>
                  {selectedCustomer ? 'تحديث' : 'حفظ'}
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 *:p-4 *:border *:rounded-xl' dir='rtl'>
        {filtered.length > 0 ? (
          filtered.map(customer => (
            <div key={customer.id} className='bg-gray-50 flex flex-col justify-between'>
              <div>
                <p className='font-bold text-lg'>{customer.name}</p>
                <p className='text-sm text-gray-600'>📞 {customer.phone}</p>
                {customer.email && <p className='text-sm text-gray-600'>📧 {customer.email}</p>}
                {customer.address && <p className='text-sm text-gray-600'>📍 {customer.address}</p>}
              </div>
              <div className='flex gap-2 mt-4'>
                <Button
                  size='sm'
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setNewCustomer(customer)
                    setDialogOpen(true)
                  }}
                >
                  تعديل
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger className='bg-white border px-3 rounded-sm'>
                    حـذف
                  </AlertDialogTrigger>
                  <AlertDialogContent dir='rtl'>
                    <AlertDialogHeader className='flex flex-col w-full justify-start '>
                      <AlertDialogTitle className='text-center w-full'>هـل انـت مـتـأكـد مـن حـذف  العميل</AlertDialogTitle>
                      <AlertDialogDescription className='flex flex-col w-full text-start'>
                        <span>هل أنت متأكد إنك عايز تحذف العميل ده؟</span>
                        <span>مش هتقدر ترجّعه تاني، لكن ممكن تلاقي الطلبات والتقارير القديمة المرتبطة بيه لسه محفوظة.</span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-col w-full'>
                      <AlertDialogCancel>الـغـاء</AlertDialogCancel>
                      <AlertDialogAction className='bg-rose-500' onClick={() => {
                        toast.success("تم حذف المنتج بنجاح")
                        saveCustomers(customers.filter(c => c.id !== customer.id))
                      }}>حـذف العميل</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center text-xl text-gray-500 border-none'>
            لا يوجد عملاء بعد 🙁
          </div>
        )}
      </section>
    </main>
  )
}
