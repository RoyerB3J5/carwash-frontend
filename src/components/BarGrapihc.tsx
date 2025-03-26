import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface GraphicsProps {
  title: string;
  data: { label: string; val1: number; val2:number }[];
  config: ChartConfig;
  color1:string;
  color2: string
}
function BarGrapihc({ title, data, config, color1, color2 }: GraphicsProps) {
  return (
    <Card className="max-h-[350px]  w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full max-h-[240px]">
          <BarChart accessibilityLayer data={data} barCategoryGap={5}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="val1" fill={`var(${color1})`} radius={4} />
            <Bar dataKey="val2" fill={`var(${color2})`} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default BarGrapihc;
