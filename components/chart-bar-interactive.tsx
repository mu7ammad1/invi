"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MultiSelectDropdown } from "./MultiSelectDropdown"

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150, tablet: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180, tablet: 409 },
    { date: "2024-04-03", desktop: 167, mobile: 120, tablet: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260, tablet: 150 },
    { date: "2024-04-05", desktop: 373, mobile: 290, tablet: 150 },
    { date: "2024-04-06", desktop: 301, mobile: 340, tablet: 150 },
    { date: "2024-04-07", desktop: 245, mobile: 180, tablet: 150 },
    { date: "2024-04-08", desktop: 409, mobile: 320, tablet: 150 },
    { date: "2024-04-09", desktop: 59, mobile: 110, tablet: 150 },
    { date: "2024-04-10", desktop: 261, mobile: 190, tablet: 150 },
    { date: "2024-04-11", desktop: 327, mobile: 350, tablet: 150 },
    { date: "2024-04-12", desktop: 292, mobile: 210, tablet: 150 },
    { date: "2024-04-13", desktop: 342, mobile: 380, tablet: 150 },
    { date: "2024-04-14", desktop: 137, mobile: 220, tablet: 150 },
    { date: "2024-04-15", desktop: 120, mobile: 170, tablet: 150 },
    { date: "2024-04-16", desktop: 138, mobile: 190, tablet: 150 },
    { date: "2024-04-17", desktop: 446, mobile: 360, tablet: 150 },
    { date: "2024-04-18", desktop: 364, mobile: 410, tablet: 150 },
    { date: "2024-04-19", desktop: 243, mobile: 180, tablet: 150 },
    { date: "2024-04-20", desktop: 89, mobile: 150, tablet: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200, tablet: 150 },
    { date: "2024-04-22", desktop: 224, mobile: 170, tablet: 150 },
    { date: "2024-04-23", desktop: 138, mobile: 230, tablet: 150 },
    { date: "2024-04-24", desktop: 387, mobile: 290, tablet: 150 },
    { date: "2024-04-25", desktop: 215, mobile: 250, tablet: 150 },
    { date: "2024-04-26", desktop: 75, mobile: 130, tablet: 150 },
    { date: "2024-04-27", desktop: 383, mobile: 420, tablet: 150 },
    { date: "2024-04-28", desktop: 122, mobile: 180, tablet: 150 },
    { date: "2024-04-29", desktop: 315, mobile: 240, tablet: 150 },
    { date: "2024-04-30", desktop: 454, mobile: 380, tablet: 150 },
    { date: "2024-05-01", desktop: 165, mobile: 220, tablet: 150 },
    { date: "2024-05-02", desktop: 293, mobile: 310, tablet: 150 },
    { date: "2024-05-03", desktop: 247, mobile: 190, tablet: 150 },
    { date: "2024-05-04", desktop: 385, mobile: 420, tablet: 150 },
    { date: "2024-05-05", desktop: 481, mobile: 390, tablet: 150 },
    { date: "2024-05-06", desktop: 498, mobile: 520, tablet: 150 },
    { date: "2024-05-07", desktop: 388, mobile: 300, tablet: 150 },
    { date: "2024-05-08", desktop: 149, mobile: 210, tablet: 150 },
    { date: "2024-05-09", desktop: 227, mobile: 180, tablet: 150 },
    { date: "2024-05-10", desktop: 293, mobile: 330, tablet: 150 },
    { date: "2024-05-11", desktop: 335, mobile: 270, tablet: 150 },
    { date: "2024-05-12", desktop: 197, mobile: 240, tablet: 150 },
    { date: "2024-05-13", desktop: 197, mobile: 160, tablet: 150 },
    { date: "2024-05-14", desktop: 448, mobile: 490, tablet: 150 },
    { date: "2024-05-15", desktop: 473, mobile: 380, tablet: 150 },
    { date: "2024-05-16", desktop: 338, mobile: 400, tablet: 150 },
    { date: "2024-05-17", desktop: 499, mobile: 420, tablet: 150 },
    { date: "2024-05-18", desktop: 315, mobile: 350, tablet: 150 },
    { date: "2024-05-19", desktop: 235, mobile: 180, tablet: 150 },
    { date: "2024-05-20", desktop: 177, mobile: 230, tablet: 150 },
    { date: "2024-05-21", desktop: 82, mobile: 140, tablet: 150 },
    { date: "2024-05-22", desktop: 81, mobile: 120, tablet: 150 },
    { date: "2024-05-23", desktop: 252, mobile: 290, tablet: 150 },
    { date: "2024-05-24", desktop: 294, mobile: 220, tablet: 150 },
    { date: "2024-05-25", desktop: 201, mobile: 250, tablet: 150 },
    { date: "2024-05-26", desktop: 213, mobile: 170, tablet: 150 },
    { date: "2024-05-27", desktop: 420, mobile: 460, tablet: 150 },
    { date: "2024-05-28", desktop: 233, mobile: 190, tablet: 150 },
    { date: "2024-05-29", desktop: 78, mobile: 130, tablet: 150 },
    { date: "2024-05-30", desktop: 340, mobile: 280, tablet: 150 },
    { date: "2024-05-31", desktop: 178, mobile: 230, tablet: 150 },
    { date: "2024-06-01", desktop: 178, mobile: 200, tablet: 150 },
    { date: "2024-06-02", desktop: 470, mobile: 410, tablet: 150 },
    { date: "2024-06-03", desktop: 103, mobile: 160, tablet: 150 },
    { date: "2024-06-04", desktop: 439, mobile: 380, tablet: 150 },
    { date: "2024-06-05", desktop: 88, mobile: 140, tablet: 150 },
    { date: "2024-06-06", desktop: 294, mobile: 250, tablet: 150 },
    { date: "2024-06-07", desktop: 323, mobile: 370, tablet: 150 },
    { date: "2024-06-08", desktop: 385, mobile: 320, tablet: 150 },
    { date: "2024-06-09", desktop: 438, mobile: 480, tablet: 150 },
    { date: "2024-06-10", desktop: 155, mobile: 200, tablet: 150 },
    { date: "2024-06-11", desktop: 92, mobile: 150, tablet: 150 },
    { date: "2024-06-12", desktop: 492, mobile: 420, tablet: 150 },
    { date: "2024-06-13", desktop: 81, mobile: 130, tablet: 150 },
    { date: "2024-06-14", desktop: 426, mobile: 380, tablet: 150 },
    { date: "2024-06-15", desktop: 307, mobile: 350, tablet: 150 },
    { date: "2024-06-16", desktop: 371, mobile: 310, tablet: 150 },
    { date: "2024-06-17", desktop: 475, mobile: 520, tablet: 150 },
    { date: "2024-06-18", desktop: 107, mobile: 170, tablet: 150 },
    { date: "2024-06-19", desktop: 341, mobile: 290, tablet: 150 },
    { date: "2024-06-20", desktop: 408, mobile: 450, tablet: 150 },
    { date: "2024-06-21", desktop: 169, mobile: 210, tablet: 150 },
    { date: "2024-06-22", desktop: 317, mobile: 270, tablet: 150 },
    { date: "2024-06-23", desktop: 480, mobile: 530, tablet: 150 },
    { date: "2024-06-24", desktop: 132, mobile: 180, tablet: 150 },
    { date: "2024-06-25", desktop: 190, mobile: 190, tablet: 190 },
    { date: "2024-06-26", desktop: 190, mobile: 190, tablet: 190 },
    { date: "2024-06-27", desktop: 190, mobile: 190, tablet: 190 },
    { date: "2024-06-28", desktop: 190, mobile: 190, tablet: 190 },
    { date: "2024-06-29", desktop: 190, mobile: 190, tablet: 190 },
    { date: "2024-06-30", desktop: 446, mobile: 400, tablet: 150 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    tablet: {
        label: "Tablet",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig
const chartKeys = [
    { value: "desktop", label: "ديسكتوب" },
    { value: "mobile", label: "موبايل" },
    { value: "tablet", label: "تابلت" },
]
export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("7d")
    const [selectedKeys, setSelectedKeys] = React.useState(["desktop", "mobile", "tablet"])

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="shadow-none bg-transparent w-full px-0 py-2">
            <CardHeader className="flex w-full items-center gap-2 space-y-0 border-b py-2 sm:flex-row" dir="rtl">
                <div className="grid flex-1 gap-1">
                    <CardTitle>الاحصائيات</CardTitle>
                    <CardDescription>
                        امكانية عرض الاحصائيات حسب الفترة الزمنية 3 شهور او 30 يوم او 7 ايام.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            أخر 3 شهور
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            اخر 30 يوم
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            اخر 7 ايام
                        </SelectItem>
                    </SelectContent>
                </Select>
                <MultiSelectDropdown
                    options={chartKeys}
                    selected={selectedKeys}
                    onChange={setSelectedKeys}
                    placeholder="اختر الأجهزة"
                />
            </CardHeader>
            <CardContent className="px-0 pt-4 sm:px-0 sm:pt-6 w-full">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full px-0"
                    dir="rtl"
                >
                    <AreaChart data={[...filteredData].reverse()} className="w-full">
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillTablet" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-tablet)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-tablet)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            className="w-full"
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {selectedKeys.includes("mobile") && (
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="url(#fillMobile)"
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                        )}

                        {selectedKeys.includes("tablet") && (
                            <Area
                                dataKey="tablet"
                                type="natural"
                                fill="url(#fillTablet)"
                                stroke="var(--color-tablet)"
                                stackId="a"
                            />
                        )}

                        {selectedKeys.includes("desktop") && (
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        )}
                        <ChartLegend content={<ChartLegendContent />} className="w-full" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
