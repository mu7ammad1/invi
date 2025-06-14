"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function Navbar() {
    const Pathname = usePathname()

    return (
        <div className="flex gap-3 items-center justify-start font-semibold *:*:rounded-full w-full">
            <Sheet>
                <SheetTrigger className="lg:hidden">Menu</SheetTrigger>
                <SheetContent className="w-[200px] sm:w-[540px]">
                    <SheetHeader dir="auto">
                        <SheetTitle>Frargy V1</SheetTitle>
                        <SheetDescription className="flex flex-col gap-4">
                            <Ele />
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <Link href={"/settings"}>
                                    <Button variant={Pathname == "/settings" ? "default" : "ghost"}>الاعدادات</Button>
                                </Link>
                                <Link href={"/about"}>
                                    <Button variant={Pathname == "/about" ? "default" : "ghost"}>عن التطبيق</Button>
                                </Link>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <div className="max-lg:hidden">
                <Ele />
            </div>
        </div>
    )
}



function Ele() {
    const Pathname = usePathname()

    return (
        <div className="flex gap-2 lg:flex-row flex-col max-sm:gap-1">
            <Link href={"/"}>
                <Button variant={Pathname == "/" ? "default" : "ghost"}>الرئيسية</Button>
            </Link>
            <Link href={"/orders"}>
                <Button variant={Pathname == "/orders" ? "default" : "ghost"} >طـلبات</Button>
            </Link>
            <Link href={"/inventory"}>
                <Button variant={Pathname == "/inventory" ? "default" : "ghost"}>مـخـزون</Button>
            </Link>
            <Link href={"/customers"}>
                <Button variant={Pathname == "/customers" ? "default" : "ghost"}>عملاء</Button>
            </Link>
            <Link href={"/employees"}>
                <Button variant={Pathname == "/employees" ? "default" : "ghost"}>عمال و ادارة</Button>
            </Link>
            <Link href={"/shipping"}>
                <Button variant={Pathname == "/shipping" ? "default" : "ghost"}>التوصيل و الشحن</Button>
            </Link>
            <Link href={"/operations"}>
                <Button variant={Pathname == "/operations" ? "default" : "ghost"}>العمليات</Button>
            </Link>
            <Link href={"/reports"}>
                <Button variant={Pathname == "/reports" ? "default" : "ghost"}>التقارير</Button>
            </Link>
        </div>
    )
}
