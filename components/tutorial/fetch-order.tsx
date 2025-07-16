/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
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
import { MinusCircle } from 'lucide-react'

type Product = {
  id: number
  name: string
  quantity: string
  priceSell: string
  priceBuy: string
  images?: string
  description?: string
}

type Customer = {
  id: number
  name?: string
  phone: string[]
  address?: string[]
  createdAt?: Date
  notes?: string
}

interface Order {
  id: number;
  created_at: string;
  customer: string;
  status: string;
  notes: string;
  rating?: string;
  products: { name: string; quantity: string }[];
}

import { useRef } from 'react'

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [step, setStep] = useState(1)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customerDetails, setCustomerDetails] = useState<Partial<Customer>>({ phone: [''], address: [''], notes: '' })
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [search, setSearch] = useState("")
  const [newOrder, setNewOrder] = useState<Partial<Order>>({ customer: '', products: [], status: 'pending', notes: '', rating: '' })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const invoiceRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const orders = localStorage.getItem('orders')
    if (orders) setOrders(JSON.parse(orders))

    const products = localStorage.getItem('products')
    if (products) setProducts(JSON.parse(products))

    const customers = localStorage.getItem('customers')
    if (customers) setCustomers(JSON.parse(customers))
  }, [])

  const statuses = ["pending", "current", "completed", "cancelled"]

  const saveOrders = (updatedOrders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
  }

  const addOrUpdateOrder = () => {
    if (!newOrder.customer || !newOrder.products?.length) {
      toast.info('الرجاء إدخال اسم العميل والمنتجات المطلوبة!')
      return
    }

    const outOfStock = (newOrder.products || []).some(prodObj => {
      const product = products.find(p => p.name === prodObj.name)
      return (!product || Number(product.quantity) < Number(prodObj.quantity))
    })
    if (outOfStock) {
      toast.info('في منتج أو أكثر الكمية غير كافية في المخزون!')
      return
    }

    if (selectedOrder) {
      const restoredProducts = products.map(prod => {
        const old = selectedOrder.products.find(p => p.name === prod.name)
        return old ? { ...prod, quantity: String(Number(prod.quantity) + Number(old.quantity)) } : prod
      })
      const updatedProducts = restoredProducts.map(prod => {
        const used = (newOrder.products || []).find(p => p.name === prod.name)
        return used ? { ...prod, quantity: String(Number(prod.quantity) - Number(used.quantity)) } : prod
      })
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
    }

    if (selectedOrder) {
      const updated = orders.map(order =>
        order.id === selectedOrder.id ? {
          ...order,
          customer: newOrder.customer || order.customer,
          products: newOrder.products || order.products,
          status: newOrder.status || order.status,
          notes: newOrder.notes || order.notes,
          rating: newOrder.rating !== undefined ? newOrder.rating : order.rating,
        } : order
      )
      saveOrders(updated)
    } else {
      const order: Order = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        created_at: new Date().toISOString(),
        customer: newOrder.customer || '',
        products: newOrder.products || [],
        status: newOrder.status || 'pending',
        notes: newOrder.notes || '',
        rating: newOrder.rating || '',
      }
      saveOrders([order, ...orders])
    }

    setNewOrder({ customer: '', products: [], status: 'pending', notes: '', rating: '' })
    setSelectedOrder(null)
    setDialogOpen(false)
  }

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case 'current': return 'bg-blue-100'
      case 'completed': return 'bg-green-100'
      case 'pending': return 'bg-yellow-100'
      case 'cancelled': return 'bg-red-100'
      default: return 'bg-gray-100'
    }
  }

  const filteredOrders = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .filter(order => {
      const customerData = customers.find(c => c.name === order.customer)
      const matchesName = order.customer.toLowerCase().includes(search.toLowerCase())
      const matchesPhone = customerData?.phone?.some(phone => phone.includes(search)) ?? false
      const matchesAddress = customerData?.address?.some(address => address.toLowerCase().includes(search.toLowerCase())) ?? false
      const matchesProducts = order.products.map(p => p.name).join(', ').toLowerCase().includes(search.toLowerCase())
      return matchesName || matchesPhone || matchesAddress || matchesProducts
    })
  const total = newOrder.products?.reduce((acc, item) => {
    const prod = products.find(p => p.name === item.name)
    return acc + ((+item.quantity || 0) * (+(prod?.priceSell || 0)))
  }, 0)

  return (
    <main>
      <section className='flex justify-between items-start w-full'>
        <div className='gap-3 flex *:rounded-xl'>
          <Button onClick={() => saveOrders([...orders])}>Refresh</Button>
          <Input
            type="search"
            placeholder="Search any order"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger
            className='bg-primary rounded-xl font-medium p-2 px-3 text-sm text-white'
            onClick={() => {
              setStep(1)
              setSelectedOrder(null)
              setNewOrder({ customer: '', products: [], status: 'pending', notes: '', rating: '' })
            }}
          >
            طـلـب جـديـد
          </AlertDialogTrigger>

          <AlertDialogContent className='w-full max-w-7xl'>
            <AlertDialogHeader className='w-full'>
              <AlertDialogTitle className='text-center'>{newOrder.customer}</AlertDialogTitle>
              <form >
                {step === 1 && (
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className="relative">
                      <Input
                        placeholder="اسم العميل"
                        value={newOrder.customer}
                        onChange={(e) => {
                          const name = e.target.value
                          setNewOrder({ ...newOrder, customer: name })

                          const found = customers.find(c => c.name?.toLowerCase() === name.toLowerCase())
                          if (found) {
                            setCustomerDetails({
                              phone: found.phone || [''],
                              address: found.address || [''],
                              notes: found.notes || ''
                            })
                          } else {
                            setCustomerDetails({ phone: [''], address: [''], notes: '' })
                          }
                        }}
                        onFocus={() => setShowSuggestions(true)}
                      />
                      {newOrder.customer && showSuggestions && (
                        <div className="absolute bg-white border shadow-md z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-md">
                          {customers
                            .filter(c => {
                              const search = newOrder.customer?.toLowerCase() || ''
                              const nameMatch = c.name?.toLowerCase().includes(search)
                              const phoneMatch = c.phone?.some(p => p.includes(search))
                              const addressMatch = c.address?.some(a => a.toLowerCase().includes(search))
                              return nameMatch || phoneMatch || addressMatch
                            })
                            .sort((a, b) => {
                              const aName = a.name?.toLowerCase() || ''
                              const bName = b.name?.toLowerCase() || ''
                              return aName.localeCompare(bName)
                            })
                            .slice(0, 5)
                            .map((c) => (
                              <div
                                key={c.id}
                                onClick={() => {
                                  setNewOrder({ ...newOrder, customer: c.name || '' })
                                  setCustomerDetails({
                                    phone: c.phone || [''],
                                    address: c.address || [''],
                                    notes: c.notes || ''
                                  })
                                  setShowSuggestions(false) // إخفاء القائمة بعد الاختيار
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {c.name}
                              </div>
                            ))}
                        </div>
                      )}


                    </div>
                    <Button disabled={!newOrder.customer} onClick={() => setStep(2)}>التالي</Button>
                  </div>
                )}

                {step === 2 && (
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                      {products.map((product) => {
                        const selected = newOrder.products?.find(p => p.name === product.name)
                        return (
                          <div key={product.id} className="border p-2 rounded-md shadow-sm">
                            {product.images && (
                              <img src={product.images} alt={product.name} className="h-24 w-full object-cover rounded-md mb-2" />
                            )}
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-500">المتاح: {product.quantity} كجم</p>
                            <Input
                              type="number"
                              min={0}
                              placeholder="كم كيلو؟"
                              value={selected?.quantity || ''}
                              onChange={(e) => {
                                const quantity = e.target.value
                                setNewOrder({
                                  ...newOrder,
                                  products: [
                                    ...(newOrder.products?.filter(p => p.name !== product.name) || []),
                                    { name: product.name, quantity }
                                  ]
                                })
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={() => setStep(1)}>السابق</Button>
                      <Button
                        disabled={!newOrder.products?.length}
                        onClick={() => setStep(3)}
                      >
                        التالي
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className="flex gap-2 flex-wrap">
                      {statuses.map((status) => (
                        <button
                          type="button" // ✅ هذا يمنع إعادة تحميل الصفحة
                          key={status}
                          onClick={() => setNewOrder({ ...newOrder, status })}
                          className={`px-4 py-2 rounded-md border ${newOrder.status === status ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                    <Input
                      placeholder="ملاحظات"
                      value={newOrder.notes}
                      onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                    />
                    <Input
                      placeholder="تقييم (1 - 5)"
                      value={newOrder.rating}
                      onChange={(e) => {
                        const val = e.target.value
                        if (/^\d*$/.test(val) && (+val <= 5 || val === '')) {
                          setNewOrder({ ...newOrder, rating: val })
                        }
                      }}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>السابق</Button>
                      <Button onClick={() => setStep(4)}>التالي</Button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div ref={invoiceRef} className="p-4 bg-white rounded-md shadow text-black mt-4">
                    <h4 className='font-bold text-xl border-b pb-1 mb-2'>فاتورة الطلب</h4>
                    <div className="text-sm text-gray-700">
                      <p><strong>اسم العميل:</strong> {newOrder.customer}</p>
                      <p><strong>رقم الهاتف:</strong> {customerDetails.phone?.join(', ')}</p>
                      <p><strong>العنوان:</strong> {customerDetails.address?.join(', ')}</p>
                      <p><strong>التاريخ:</strong> {new Date().toLocaleString('ar-EG')}</p>
                    </div>
                    <div className="border border-gray-300 rounded-md p-2 mt-2">
                      <table className="w-full text-sm text-right border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-1">المنتج</th>
                            <th className="p-1">الكمية</th>
                            <th className="p-1">سعر الوحدة</th>
                            <th className="p-1">الإجمالي</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newOrder.products?.map((item, index) => {
                            const product = products.find(p => p.name === item.name)
                            const price = +(product?.priceSell || 0)
                            const qty = +item.quantity
                            return (
                              <tr key={index} className="border-b">
                                <td className="p-1">{item.name}</td>
                                <td className="p-1">{qty} كجم</td>
                                <td className="p-1">{price.toLocaleString()} جنيه</td>
                                <td className="p-1">{(price * qty).toLocaleString()} جنيه</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-between mt-3 font-bold text-lg text-green-700">
                      <span>الإجمالي:</span>
                      <span>{total?.toLocaleString()} جنيه</span>
                    </div>
                    {newOrder.notes && <p><strong>ملاحظات:</strong> {newOrder.notes}</p>}
                    {newOrder.rating && <p><strong>تقييم:</strong> {newOrder.rating} / 5</p>}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const content = invoiceRef.current?.innerHTML || ''
                      const printWindow = window.open('', '_blank')
                      if (printWindow) {
                        printWindow.document.open()
                        printWindow.document.write(`
                          <html dir="rtl" lang="ar">
                            <head>
                              <title>فاتورة</title>
                              <style>
                                body { font-family: sans-serif; padding: 20px; direction: rtl; }
                                table { width: 100%; border-collapse: collapse; }
                                th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
                                th { background-color: #f0f0f0; }
                              </style>
                            </head>
                            <body>${content}</body>
                          </html>
                        `)
                        printWindow.document.close()
                        printWindow.focus()
                        printWindow.print()
                        printWindow.close()
                      }
                    }}
                  >
                    طباعة الفاتورة
                  </Button>
                  <Button onClick={addOrUpdateOrder}>تأكيد وحفظ</Button>
                </div>
              </form>
              <AlertDialogCancel className='fixed top-3 left-3 rounded-full'><MinusCircle /></AlertDialogCancel>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 *:rounded-2xl *:border *:p-3 *:h-72' dir='rtl'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const { id, created_at, customer, products: orderProducts, status, notes } = order
            const formattedDate = new Date(created_at).toLocaleString('ar-EG', {
              dateStyle: 'medium',
              timeStyle: 'short',
              hour12: true,
            })
            return (
              <div key={id} className={`${getStatusBg(status)} p-4 rounded-lg flex flex-col justify-between`}>
                <div>
                  <div className='font-medium flex justify-between mb-2'>
                    <p>#{id}</p>
                    <Badge>{status}</Badge>
                  </div>
                  <p className='text-sm text-gray-500'>{formattedDate}</p>
                  <p className='font-medium'>{customer}</p>
                  <p className='truncate'>{orderProducts.map(p => `${p.name} (${p.quantity} كجم)`).join(', ')}</p>
                  {notes && <p className='text-xs italic text-gray-600'>Notes: {notes}</p>}
                </div>
                <div className='flex gap-2 mt-4'>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order)
                      setNewOrder({ customer, products: orderProducts, status, notes, rating: order.rating })
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
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-center'>
                          هـل انـت مـتـأكـد مـن حـذف العميل؟
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <span>هل أنت متأكد إنك عايز تحذف العميل ده؟</span><br />
                          <span>مش هتقدر ترجّعه تاني، لكن ممكن تلاقي الطلبات القديمة لسه محفوظة.</span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>الـغـاء</AlertDialogCancel>
                        <AlertDialogAction
                          className='bg-rose-500'
                          onClick={() => {
                            toast.success('تم حذف العميل بنجاح')
                            const orderToDelete = orders.find(order => order.id === id)
                            if (!orderToDelete) return
                            const restoredProducts = products.map((product) => {
                              const used = orderToDelete.products.find(p => p.name === product.name)
                              return used ? {
                                ...product,
                                quantity: String(Number(product.quantity) + Number(used.quantity))
                              } : product
                            })
                            localStorage.setItem('products', JSON.stringify(restoredProducts))
                            setProducts(restoredProducts)
                            saveOrders(orders.filter(order => order.id !== id))
                          }}
                        >
                          حـذف العميل
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )
          })
        ) : (
          <div className='col-span-full text-2xl text-center font-medium text-gray-800 border-none'>
            دورنا في كل حتة... حتى تحت السجادة! 🧹
          </div>
        )}
      </section>
    </main>
  )
}
