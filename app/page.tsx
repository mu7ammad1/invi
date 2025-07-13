import { ChartAreaInteractive } from "@/components/chart-bar-interactive";
// import { ChartBarStacked } from "@/components/tutorial/chart-bar-stacked";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CommandIcon, ExternalLinkIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center mb-20">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex flex-col w-full gap-10">
          <div>
            {/* <ChartBarStacked /> */}
            <ChartAreaInteractive />
          </div>
          <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 *:w-full gap-3" dir="rtl">
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>طـلـبـات نـشـطـة</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><EyeIcon /></Button></CardAction>
              </CardHeader>
              <CardContent>
                <h1 className="text-5xl font-medium text-emerald-500">3</h1>
                <h3>طلبات اليوم (16)</h3>
              </CardContent>
            </Card>
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>أرباح اليوم</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><EyeOffIcon /></Button></CardAction>
              </CardHeader>
              <CardContent>
                <h1 className="text-5xl font-medium"><span className="text-3xl text-rose-500">مخفي</span></h1>
                {/* <h3>أرباح الاجمالية (9012)</h3> */}
                <h3 className="text-rose-500">أرباح الاجمالية (مخفي)</h3>
              </CardContent>
            </Card>
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>قيمة المخزون</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><EyeIcon /></Button></CardAction>
              </CardHeader>
              <CardContent>
                <h1 className="text-5xl font-medium">96580</h1>
                <h3>قيمةالمخزون الحالي</h3>
              </CardContent>
            </Card>
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>العملاء</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><EyeIcon /></Button></CardAction>
              </CardHeader>
              <CardContent>
                <h1 className="text-5xl font-medium">65</h1>
                <h3>Card Content</h3>
              </CardContent>
            </Card>
          </div>
          <div>
          </div>
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 *:w-full gap-3">
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>الشحن والتوصيل</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><ExternalLinkIcon /></Button></CardAction>
              </CardHeader>
              <CardContent>
                <h1 className="text-3xl font-medium">65</h1>
                <h3>Card Content</h3>
              </CardContent>
            </Card>
            <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>قائمة الطلبات</CardTitle>
                <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><EyeIcon /></Button></CardAction>
              </CardHeader>
              <CardContent className="space-y-3">
                <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium border-dashed" color="#ff6">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="flex justify-center items-center gap-2"><CommandIcon className="size-5 text-primary/80" /> #260035</CardTitle>
                    <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><ExternalLinkIcon /></Button></CardAction>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-3xl font-medium">96580</h1>
                    <h3>قيمةالمخزون الحالي</h3>
                  </CardContent>
                </Card>
                <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium border-dashed" color="#ff6">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="flex justify-center items-center gap-2"><CommandIcon className="size-5 text-primary/80" /> #260035</CardTitle>
                    <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><ExternalLinkIcon /></Button></CardAction>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-3xl font-medium">96580</h1>
                    <h3>قيمةالمخزون الحالي</h3>
                  </CardContent>
                </Card>
                <Card className="p-0 m-0 *:px-2 *:py-1 shadow-none gap-0 font-medium border-dashed" color="#ff6">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>قيمة المخزون</CardTitle>
                    <CardAction><Button variant={"secondary"} size={"icon"} className="rounded-full"><ExternalLinkIcon /></Button></CardAction>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-3xl font-medium">96580</h1>
                    <h3>قيمةالمخزون الحالي</h3>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
}
