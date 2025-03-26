import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GraphicsProps {
  title: string;
  data: { label: string; value: number }[];
  config: ChartConfig;
}
function Graphics({ title, data, config }: GraphicsProps) {
  return (
    <Card className="max-h-[350px]  w-full">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full max-h-[240px]">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={3}
              domain={[0, "dataMax + 20"]}
              width={35}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Graphics;
