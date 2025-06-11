"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const Pathname = usePathname()
    return (
        <div className="flex gap-3 items-center justify-between font-semibold *:*:rounded-full w-full">
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
