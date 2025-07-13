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
} from "@/components/ui/alert-dialog"
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

export default function InventoryComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    quantity: '',
    priceSell: '',
    priceBuy: '',
    description: '',
    images: '',
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('products')
    if (stored) {
      setProducts(JSON.parse(stored))
    }
  }, [])

  const saveProducts = (updated: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updated))
    setProducts(updated)
  }

  const addOrUpdateProduct = () => {
    if (!newProduct.name || newProduct.quantity == null || newProduct.priceBuy == null || !newProduct.priceSell) {
      alert('All fields are required')
      return
    }

    if (selectedProduct) {
      const updated = products.map(p =>
        p.id === selectedProduct.id ? { ...p, ...newProduct } as Product : p
      )
      saveProducts(updated)
    } else {
      const newEntry: Product = {
        id: Math.floor(1000 + Math.random() * 9000),
        name: newProduct.name!,
        quantity: newProduct.quantity,
        priceBuy: newProduct.priceBuy,
        priceSell: newProduct.priceSell,
        description: newProduct.description,
        images: newProduct.images,
      }
      saveProducts([newEntry, ...products])
    }

    setNewProduct({ name: '', quantity: '', priceBuy: '', priceSell: '', description: '', images: '' })
    setSelectedProduct(null)
    setDialogOpen(false)
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toString().toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main>
      <section className='flex justify-between items-start w-full'>
        <div className='gap-3 flex *:rounded-xl'>
          <Button onClick={() => saveProducts([...products])}>تحديث المنتجات</Button>
          <Input
            type="search"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            className='bg-primary rounded-xl font-medium p-2 px-3 text-sm text-white'
            onClick={() => {
              setSelectedProduct(null)
              setNewProduct({ name: '', quantity: '', priceBuy: '', priceSell: '', description: '', images: '' })
            }}
          >
            اضافة منتج جديد
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct ? 'تعديل المنتج' : 'منتج جديد'}</DialogTitle>
              <DialogDescription>
                {selectedProduct ? 'تعديل تفاصيل المنتج' : 'اضف تفاصيل المنتج لحفظه'}
              </DialogDescription>

              <div className='flex flex-col gap-3 mt-4'>
                <Input
                  placeholder="اسم المنتج"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <Input
                  placeholder="الكم او العدد"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <Input
                  placeholder="سعر الشراء"
                  value={newProduct.priceBuy}
                  onChange={(e) => setNewProduct({ ...newProduct, priceBuy: e.target.value })}
                />
                <Input
                  placeholder="سعر البيع"
                  value={newProduct.priceSell}
                  onChange={(e) => setNewProduct({ ...newProduct, priceSell: e.target.value })}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {newProduct.images && <img src={newProduct.images} alt={newProduct.images} title={newProduct.images} className="w-16 h-16 object-cover rounded-full mt-2" />}
                <Input
                  placeholder="رابط الصورة (اختياري)"
                  value={newProduct.images}
                  onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                />
                <Input
                  placeholder="ملحوظة (اختياري)"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <Button onClick={addOrUpdateProduct}>
                  {selectedProduct ? 'تحديث' : 'حفظ'}
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 *:rounded-2xl *:border *:p-3 *:h-80' dir='rtl'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(({ id, name, quantity, priceBuy, priceSell, description, images }) => (
            <div key={id} className='bg-gray-50 p-4 rounded-lg flex flex-col justify-between'>
              <div>
                <div className='font-medium flex justify-between mb-2'>
                  <p>#{id}</p>
                  <Badge>{quantity}</Badge>
                </div>
                <div className='flex w-full justify-between'>
                  <div>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-sm'>الكم او العدد: {quantity}</p>
                    <p className='text-sm'>سعر الشراء: {priceBuy}</p>
                    <p className='text-sm'>سعر البيع: {priceSell}</p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {images && <img src={images} alt={name} title={name} className="w-16 h-16 object-cover rounded-full mt-2" />}
                </div>
                <p className='text-sm text-blue-600'>
                  ربح الوحدة: {(Number(priceSell) - Number(priceBuy)).toFixed(0)} جنيه
                </p>

                <p className='text-sm font-semibold text-green-600'>
                  إجمالي الربح: {((Number(priceSell) - Number(priceBuy)) * Number(quantity)).toFixed(0)} جنيه
                </p>
                {description && <p className='text-xs italic text-gray-600'>Note: {description}</p>}
              </div>
              <div className='flex gap-2 mt-4'>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct({ id, name, quantity, priceBuy, priceSell, description, images })
                    setNewProduct({ id, name, quantity, priceBuy, priceSell, description, images })
                    setDialogOpen(true)
                  }}
                >
                  تـعـديـل
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger className='bg-white border px-3 rounded-sm'>
                    حـذف
                  </AlertDialogTrigger>
                  <AlertDialogContent dir='rtl'>
                    <AlertDialogHeader className='flex flex-col w-full justify-start '>
                      <AlertDialogTitle className='text-center w-full'>هـل انـت مـتـأكـد مـن حـذف  الـمـنـتـج</AlertDialogTitle>
                      <AlertDialogDescription className='flex flex-col w-full text-start'>
                        <span>هل أنت متأكد إنك عايز تحذف المنتج ده؟</span>
                        <span>مش هتقدر ترجّعه تاني، لكن ممكن تلاقي الطلبات والتقارير القديمة المرتبطة بيه لسه محفوظة.</span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-col w-full'>
                      <AlertDialogCancel>الـغـاء</AlertDialogCancel>
                      <AlertDialogAction className='bg-rose-500' onClick={() => {
                        toast.success("تم حذف المنتج بنجاح")
                        saveProducts(products.filter(p => p.id !== id))
                      }}>حـذف الـمـنـتـج</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
