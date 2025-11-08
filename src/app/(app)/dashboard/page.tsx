'use client';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IndianRupee, Users, Activity, Target, ArrowUp, Volume2, VolumeX } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

const opportunityData = [
  { stage: 'New', value: 2, fill: 'var(--color-new)' },
  { stage: 'Qualification', value: 1, fill: 'var(--color-qualification)' },
  { stage: 'Proposition', value: 3, fill: 'var(--color-proposition)' },
  { stage: 'Negotiation', value: 2, fill: 'var(--color-negotiation)' },
  { stage: 'Won', value: 5, fill: 'var(--color-won)' },
];

const revenueByStageData = [
  { stage: 'New', revenue: 1500000 },
  { stage: 'Qualification', revenue: 2500000 },
  { stage: 'Proposition', revenue: 7500000 },
  { stage: 'Negotiation', revenue: 12000000 },
];

const chartConfig: ChartConfig = {
  value: { label: 'Opportunities' },
  new: { label: 'New', color: 'hsl(var(--chart-1))' },
  qualification: { label: 'Qualification', color: 'hsl(var(--chart-2))' },
  proposition: { label: 'Proposition', color: 'hsl(var(--chart-3))' },
  negotiation: { label: 'Negotiation', color: 'hsl(var(--chart-4))' },
  won: { label: 'Won', color: 'hsl(var(--chart-5))' },
};

const revenueChartConfig: ChartConfig = {
  revenue: { label: 'Revenue' },
  stage: { label: 'Stage' },
};

const StatCard = ({ title, value, subtext, icon: Icon, color, percentage }: { title: string, value: string, subtext: string, icon: React.ElementType, color: string, percentage: string }) => (
    <Card className="shadow-none border-0 bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold">{value}</div>
            <div className="flex items-center text-sm font-semibold text-green-500">
                <ArrowUp className="h-4 w-4" />
                {percentage}
            </div>
        </div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
)

export default function DashboardPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="₹45,23,189" subtext="+20.1% from last month" icon={IndianRupee} color="text-blue-500" percentage="20.1%" />
        <StatCard title="Active Contacts" value="+2350" subtext="+180.1% from last month" icon={Users} color="text-purple-500" percentage="180.1%" />
        <StatCard title="Open Opportunities" value="12" subtext="+19% from last month" icon={Activity} color="text-orange-500" percentage="19%" />
        <StatCard title="New Leads" value="+573" subtext="+201 since last hour" icon={Target} color="text-green-500" percentage="3.2%" />
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3 shadow-none border-0 bg-card/60">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>A visual representation of opportunities in each stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart data={opportunityData} accessibilityLayer margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="stage" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} strokeWidth={0} />
                <ChartTooltip cursor={{fill: 'hsl(var(--muted))', radius: 4}} content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-none border-0 bg-card/60">
          <CardHeader>
            <CardTitle>Revenue by Stage</CardTitle>
             <CardDescription>How much potential revenue is in each stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="min-h-[300px] w-full">
              <PieChart accessibilityLayer>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="stage"
                      formatter={(value) =>
                        value.toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        })
                      }
                    />
                  }
                />
                <Pie
                  data={revenueByStageData}
                  dataKey="revenue"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  cornerRadius={8}
                >
                  {revenueByStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="stage" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none border-0 bg-card/60 overflow-hidden">
        <CardHeader>
          <CardTitle>Welcome to ProLink</CardTitle>
          <CardDescription>Here's a quick overview of how to get started.</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full rounded-md"
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute bottom-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
