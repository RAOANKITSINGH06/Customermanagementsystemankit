import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { PlusCircle, MoreHorizontal, IndianRupee, GripVertical } from 'lucide-react';
import { opportunities, contacts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Stage = 'New' | 'Qualification' | 'Proposition' | 'Negotiation' | 'Won' | 'Lost';
const stages: Stage[] = ['New', 'Qualification', 'Proposition', 'Negotiation', 'Won', 'Lost'];

const stageConfig: Record<Stage, {color: string, progress: number}> = {
    'New': { color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', progress: 10},
    'Qualification': { color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', progress: 25},
    'Proposition': { color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', progress: 50},
    'Negotiation': { color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', progress: 75},
    'Won': { color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', progress: 100},
    'Lost': { color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', progress: 0},
}

export default function OpportunitiesPage() {
  const getContact = (contactId: string) => contacts.find((c) => c.id === contactId);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">Your sales pipeline at a glance.</p>
        </div>
        <Button size="lg">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Opportunity
        </Button>
      </div>
      <div className="flex-1 items-start gap-4 overflow-x-auto pb-4 grid grid-flow-col auto-cols-[320px]">
        {stages.map((stage) => (
          <div key={stage} className="flex h-full flex-col gap-4 rounded-lg">
            <div className="flex items-center justify-between">
                <h2 className={`font-semibold px-3 py-1 rounded-md text-sm ${stageConfig[stage].color}`}>
                  {stage}
                </h2>
                <span className="text-sm font-medium text-muted-foreground">{opportunities.filter((o) => o.stage === stage).length}</span>
            </div>
            <div className="space-y-3">
              {opportunities
                .filter((o) => o.stage === stage)
                .map((opp) => {
                  const contact = getContact(opp.contactId);
                  return (
                    <Card key={opp.id} className="bg-card/80 backdrop-blur-sm border-l-4" style={{borderLeftColor: stageConfig[stage].color.split(' ')[0]}}>
                      <CardHeader className="flex-row items-center justify-between p-3">
                        <CardTitle className="text-base font-medium">{opp.name}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3 p-3 pt-0">
                        <div className="flex items-center font-semibold text-lg">
                          {opp.revenue.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 0,
                          })}
                        </div>
                        {contact && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contact.name}</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex flex-col items-start gap-2">
                         <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                            <span>Probability</span>
                            <span>{opp.probability}%</span>
                         </div>
                         <Progress value={opp.probability} className="h-1.5" />
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
