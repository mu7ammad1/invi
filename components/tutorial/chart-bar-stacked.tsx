"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A stacked bar chart with a legend"

const chartData = [
    // { month: "January", desktop: 186, mobile: 80 },
    // { month: "February", desktop: 305, mobile: 200 },
    // { month: "March", desktop: 237, mobile: 120 },
    // { month: "April", desktop: 73, mobile: 190 },
    // { month: "May", desktop: 209, mobile: 130 },
    // { month: "June", desktop: 214, mobile: 140 },
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
    { date: "2024-06-30", desktop: 165, mobile: 105, tablet: 227 },

]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartBarStacked() {
    return (
        <Card className="w-full max-w-8xl mx-auto shadow-none">
            <CardHeader>
                <div className="grid flex-1 gap-1">
                    <CardTitle>الاحصائيات</CardTitle>
                    <CardDescription>
                        امكانية عرض الاحصائيات حسب الفترة الزمنية 3 شهور او 30 يوم او 7 ايام.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(8, 10)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="desktop"
                            stackId="a"
                            fill="var(--color-desktop)"
                            radius={[0, 0, 8, 8]}
                        />
                        <Bar
                            dataKey="mobile"
                            stackId="a"
                            fill="var(--color-mobile)"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="tablet"
                            stackId="a"
                            fill="var(--color-tablet)"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
