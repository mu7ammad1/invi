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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { LucideMousePointerSquareDashed } from 'lucide-react'

type Customer = {
  id: number
  name?: string
  phone: string[]
  address?: string[]
  createdAt?: Date
  notes?: string
}

export default function CustomersComponent() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    phone: [],
    address: [],
  })
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('customers')
    if (stored) {
      const parsed = JSON.parse(stored)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fixed = parsed.map((c: any) => ({
        ...c,
        createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
        phone: Array.isArray(c.phone) ? c.phone : [c.phone].filter(Boolean),
        address: Array.isArray(c.address) ? c.address : [c.address].filter(Boolean),
      }))
      setCustomers(fixed)

    }
  }, [])

  const saveCustomers = (updated: Customer[]) => {
    localStorage.setItem('customers', JSON.stringify(updated))
    setCustomers(updated)
  }

  const newId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1
  const addOrUpdateCustomer = () => {
    if (!newCustomer.phone || newCustomer.phone.length === 0) {
      toast.error('رقم الهاتف مطلوب')
      return
    }

    const exists = customers.some(c =>
      c.phone.some(p => newCustomer.phone?.includes(p)) &&
      (!selectedCustomer || c.id !== selectedCustomer.id)
    )
    if (exists) {
      toast.error('رقم الهاتف مسجل بالفعل')
      return
    }

    if (selectedCustomer) {
      const updated = customers.map(c =>
        c.id === selectedCustomer.id ? { ...c, ...newCustomer } as Customer : c
      )
      saveCustomers(updated)
    } else {
      const newC: Customer = {
        id: newId,
        name: newCustomer.name?.trim() || `عميل - ${filtered.length + 1}`,
        phone: newCustomer.phone,
        address: newCustomer.address,
        notes: newCustomer.notes || '',
        createdAt: new Date()
      }
      saveCustomers([newC, ...customers].sort((a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      ))
    }

    setNewCustomer({ name: '', phone: [], address: [] })
    setSelectedCustomer(null)
    setDialogOpen(false)
  }

  const filtered = customers.filter(c => {
    if (!search.trim()) return true
    return (c.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      c.phone.some(p => p.includes(search))
  })

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
              setNewCustomer({ name: '', phone: [], address: [] })
              setSelectedCustomer(null)
            }}
          >
            + <span className='max-sm:hidden'>عميل جديد </span>
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
                  placeholder='رقم الهاتف (مفصول بنقطة)'
                  value={newCustomer.phone?.join('. ') || ''}
                  onChange={e =>
                    setNewCustomer({
                      ...newCustomer,
                      phone: e.target.value.split('.').map(s => s.trim()).filter(Boolean)
                    })
                  }
                />
                <Input
                  placeholder='العنوان (اختياري)'
                  value={newCustomer.address || ''}
                  onChange={e => setNewCustomer({ ...newCustomer, address: [e.target.value] })}
                />
                <Textarea
                  placeholder='ملاحظات (اختياري)'
                  className='border p-2 rounded-md min-h-[80px]'
                  value={newCustomer.notes || ''}
                  onChange={e => setNewCustomer({ ...newCustomer, notes: e.target.value })}
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
                {customer.createdAt && (
                  <p className='text-xs text-gray-400 mt-1'>
                    تم الإنشاء في: {new Date(customer.createdAt).toLocaleString('ar-EG')}
                  </p>
                )}
                <p className='font-bold text-lg'>{customer.name}</p>
                <p className='text-sm text-gray-600'>📞 {customer.phone.join(', ')}</p>
                {customer.address && customer.address.length > 0 && (
                  <p className='text-sm text-gray-600'>📍 {customer.address.join(', ')}</p>
                )}
                {customer.notes && (
                  <p className='text-sm text-gray-600'>📝 {customer.notes}</p>
                )}
              </div>
              <div className='flex justify-between items-center gap-2 mt-4'>
                <div className='flex justify-between items-center gap-2'>
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
                    <AlertDialogTrigger className='bg-rose-500 text-white border px-3 py-1 rounded-xl'>
                      حـذف
                    </AlertDialogTrigger>
                    <AlertDialogContent dir='rtl'>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-right'>
                          هـل انـت مـتـأكـد مـن حـذف العميل؟
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-right'>
                          <span>هل أنت متأكد إنك عايز تحذف العميل ده؟</span><br />
                          <span>مش هتقدر ترجّعه تاني.</span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>الـغـاء</AlertDialogCancel>
                        <AlertDialogAction
                          className='bg-rose-500'
                          onClick={() => {
                            toast.success(selectedCustomer ? 'تم تحديث العميل' : 'تم إضافة العميل بنجاح')
                            saveCustomers(customers.filter(c => c.id !== customer.id))
                          }}
                        >
                          حـذف العميل
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div>
                  <Button
                    size='sm'
                    onClick={() => {
                      setSelectedCustomer(customer)
                      setNewCustomer(customer)
                      setDialogOpen(true)
                    }}
                    variant={'default'}
                  >
                    <LucideMousePointerSquareDashed />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-2xl text-center font-medium text-gray-800 border-none'>
            دورنا في كل حتة... حتى تحت السجادة! 🧹
          </div>
        )}
      </section>
    </main>
  )
}
