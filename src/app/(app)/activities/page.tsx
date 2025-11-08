'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Phone, Mail, FileText } from 'lucide-react';
import { activities } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format, isToday, isFuture, isPast } from 'date-fns';
import type { Activity } from '@/lib/types';

const activityIcons = {
  Call: Phone,
  Meeting: Calendar,
  Task: FileText,
  Email: Mail,
};

const groupActivities = (activities: Activity[]) => {
  const today: Activity[] = [];
  const upcoming: Activity[] = [];
  const past: Activity[] = [];

  for (const activity of activities) {
    const date = new Date(activity.date);
    if (isToday(date)) {
      today.push(activity);
    } else if (isFuture(date)) {
      upcoming.push(activity);
    } else if (isPast(date)) {
      past.push(activity);
    }
  }
  
  // Sort each group
  const sortFn = (a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime();
  today.sort(sortFn);
  upcoming.sort(sortFn);
  past.sort(sortFn);
  
  return { today, upcoming, past };
};

export default function ActivitiesPage() {
  const { today, upcoming, past } = groupActivities(activities);

  const activityGroups = [
    { title: 'Today', data: today },
    { title: 'Upcoming', data: upcoming },
    { title: 'Past', data: past },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activities</h1>
          <p className="text-muted-foreground">Manage your calls, meetings, and tasks.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Schedule Activity
        </Button>
      </div>

      {activityGroups.map(
        (group) =>
          group.data.length > 0 && (
            <div key={group.title}>
              <h2 className="mb-4 text-xl font-semibold">{group.title}</h2>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {group.data.map((activity) => {
                      const Icon = activityIcons[activity.type];
                      return (
                        <li
                          key={activity.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted p-3">
                              <Icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Related to: {activity.relatedTo.name} ({activity.relatedTo.type})
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {format(new Date(activity.date), 'MMM d, yyyy')}
                            </p>
                            <Badge variant="outline">{activity.type}</Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )
      )}
    </div>
  );
}
