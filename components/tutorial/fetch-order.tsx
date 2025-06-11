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

type Product = {
  id: number
  name: string
  quantity: number
  category: string
  price: number
  description?: string
}

interface Order {
  id: number;
  created_at: string;
  customer: string;
  products: string[]; // Make sure this is string[] and not string
  status: string;
  notes: string;
}

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [search, setSearch] = useState("")
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    customer: '',
    products: [], // Initialize as empty array
    status: 'pending',
    notes: '',
  })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const orders = localStorage.getItem('orders')
    if (orders) {
      setOrders(JSON.parse(orders))
    }
    const products = localStorage.getItem('products')
    if (products) {
      setProducts(JSON.parse(products))
    }
  }, [])

  const saveOrders = (updatedOrders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
  }

  const addOrUpdateOrder = () => {
    if (!newOrder.customer || !newOrder.products?.length) {
      alert('Customer name and products are required')
      return
    }
    // تقليل الكمية من المخزون عند إضافة طلب جديد
    const updatedProducts = products.map(prod => {
      const usedCount = (newOrder.products || []).filter(p => p === prod.name).length
      return {
        ...prod,
        quantity: prod.quantity - usedCount,
      }
    })
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    setProducts(updatedProducts)

    if (selectedOrder) {
      // تعديل الطلب
      const updated = orders.map(order =>
        order.id === selectedOrder.id
          ? {
            ...order,
            customer: newOrder.customer || order.customer,
            products: (newOrder.products || order.products) as string[],
            status: newOrder.status || order.status,
            notes: newOrder.notes || order.notes,
          }
          : order
      )
      saveOrders(updated)
    } else {
      // إضافة طلب جديد
      const order: Order = {
        id: Math.floor(1000 + Math.random() * 9000),
        created_at: new Date().toISOString(),
        customer: newOrder.customer || 'Unknown',
        products: (newOrder.products || []) as string[],
        status: newOrder.status || 'pending',
        notes: newOrder.notes || '',
      }
      saveOrders([order, ...orders])
    }
    setNewOrder({ customer: '', products: [], status: 'pending', notes: '' })
    setSelectedOrder(null)
    setDialogOpen(false)
  }

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case 'current':
        return 'bg-blue-100'
      case 'completed':
        return 'bg-green-100'
      case 'pending':
        return 'bg-yellow-100'
      case 'cancelled':
        return 'bg-red-100'
      default:
        return 'bg-gray-100'
    }
  }

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(search) ||
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.products.join(', ').toLowerCase().includes(search.toLowerCase())
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
              setNewOrder({ customer: '', products: [], status: 'pending', notes: '' })
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
                <select
                  multiple
                  className="border rounded-md p-2 h-32"
                  value={newOrder.products}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
                    setNewOrder({ ...newOrder, products: selected })
                  }}
                >
                  {products.map(product => (
                    <option key={product.id} value={product.name}>
                      {product.name} ({product.quantity} متاح)
                    </option>
                  ))}
                </select>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  className="border rounded-md p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="current">Current</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Input
                  placeholder="Notes"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
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
          filteredOrders.map(({ id, created_at, customer, products, status, notes }) => {
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
                  <p className='truncate'>{products.join(', ')}</p>
                  {notes && <p className='text-xs italic text-gray-600'>Notes: {notes}</p>}
                </div>
                <div className='flex gap-2 mt-4'>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder({ id, created_at, customer, products, status, notes })
                      setNewOrder({ customer, products, status, notes })
                      setDialogOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this order?')) {
                        saveOrders(orders.filter(order => order.id !== id))
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )
          })
        ) : (
          <div className='col-span-full text-2xl text-center font-medium text-gray-800 border-none'>
            دورنا في كل حتة... حتى تحت السجادة! 🧹.
          </div>
        )}
      </section>
    </main>
  )
}