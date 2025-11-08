import type { LucideIcon } from 'lucide-react';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
};

export type Opportunity = {
  id: string;
  name: string;
  stage: 'New' | 'Qualification' | 'Proposition' | 'Negotiation' | 'Won' | 'Lost';
  revenue: number;
  probability: number;
  contactId: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  source: string;
  assignedTo: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified';
  avatar: string;
};

export type Activity = {
  id: string;
  type: 'Call' | 'Meeting' | 'Task' | 'Email';
  title: string;
  date: string; // ISO string
  notes: string;
  relatedTo: {
    type: 'Contact' | 'Opportunity' | 'Lead';
    id: string;
    name: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};
