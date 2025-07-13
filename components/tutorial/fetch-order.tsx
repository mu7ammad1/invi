/* eslint-disable @next/next/no-img-element */
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

type Product = {
  id: number
  name: string
  quantity: string
  priceSell: string
  priceBuy: string
  images?: string
  description?: string
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

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const statuses = ["pending", "current", "completed", "cancelled"]

  const [search, setSearch] = useState("")
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    customer: '',
    products: [],
    status: 'pending',
    notes: '',
    rating: '',
  })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const orders = localStorage.getItem('orders')
    if (orders) setOrders(JSON.parse(orders))
    const products = localStorage.getItem('products')
    if (products) setProducts(JSON.parse(products))
  }, [])

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

    if (!selectedOrder) {
      const updatedProducts = products.map(prod => {
        const used = (newOrder.products || []).find(p => p.name === prod.name)
        return used ? {
          ...prod,
          quantity: String(Number(prod.quantity) - Number(used.quantity))
        } : prod
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
        id: Math.floor(1000 + Math.random() * 9000),
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

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(search) ||
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.products.map(p => p.name).join(', ').toLowerCase().includes(search.toLowerCase())
  )

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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            className='bg-primary rounded-xl font-medium p-2 px-3 text-sm text-white'
            onClick={() => {
              setSelectedOrder(null)
              setNewOrder({ customer: '', products: [], status: 'pending', notes: '', rating: '' })
            }}
          >
            New order
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedOrder ? 'Edit Order' : 'New Order'}</DialogTitle>
              <DialogDescription>
                {selectedOrder ? 'Update the fields to edit the order.' : 'Fill the fields to add a new order.'}
              </DialogDescription>
              <div className='flex flex-col gap-3 mt-4'>
                <Input
                  placeholder="Customer name"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64  overflow-y-auto">
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
                <div className="flex gap-2 flex-wrap">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setNewOrder({ ...newOrder, status })}
                      className={`px-4 py-2 rounded-md border ${newOrder.status === status ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                <Input
                  placeholder="Notes"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                />
                <Input
                  placeholder="Rating (1 - 5)"
                  value={newOrder.rating}
                  onChange={(e) => {
                    const val = e.target.value
                    if (/^\d*$/.test(val) && (+val <= 5 || val === '')) {
                      setNewOrder({ ...newOrder, rating: val })
                    }
                  }}
                />
                <Button onClick={addOrUpdateOrder}>
                  {selectedOrder ? 'Update' : 'Save'}
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
                    Edit
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
