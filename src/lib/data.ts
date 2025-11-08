import type { Contact, Opportunity, Lead, Activity } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const contacts: Contact[] = [
  { id: '1', name: 'Aanya Sharma', email: 'aanya.s@example.com', phone: '987-654-3210', company: 'Innovate India', avatar: PlaceHolderImages.find(img => img.id === 'user-1')?.imageUrl || '' },
  { id: '2', name: 'Rohan Gupta', email: 'rohan.g@example.com', phone: '876-543-2109', company: 'Bharat Solutions', avatar: PlaceHolderImages.find(img => img.id === 'user-2')?.imageUrl || '' },
  { id: '3', name: 'Priya Singh', email: 'priya.s@example.com', phone: '765-432-1098', company: 'Desi Tech', avatar: PlaceHolderImages.find(img => img.id === 'user-3')?.imageUrl || '' },
  { id: '4', name: 'Vikram Patel', email: 'vikram.p@example.com', phone: '654-321-0987', company: 'Global Bharat', avatar: PlaceHolderImages.find(img => img.id === 'user-4')?.imageUrl || '' },
];

export const opportunities: Opportunity[] = [
  { id: 'opp-1', name: 'Website Redesign', stage: 'Proposition', revenue: 1500000, probability: 60, contactId: '1' },
  { id: 'opp-2', name: 'Mobile App Development', stage: 'Negotiation', revenue: 5000000, probability: 75, contactId: '2' },
  { id: 'opp-3', name: 'Cloud Migration', stage: 'Qualification', revenue: 2500000, probability: 20, contactId: '3' },
  { id: 'opp-4', name: 'Annual Support Contract', stage: 'Won', revenue: 1000000, probability: 100, contactId: '1' },
  { id: 'opp-5', name: 'New Hardware', stage: 'New', revenue: 500000, probability: 10, contactId: '4' },
  { id: 'opp-6', name: 'Marketing Campaign', stage: 'Lost', revenue: 800000, probability: 0, contactId: '2' },
];

export const leads: Lead[] = [
  { id: 'lead-1', name: 'Isha Reddy', email: 'isha.r@example.com', source: 'Website Form', assignedTo: 'Raj Verma', status: 'New', avatar: PlaceHolderImages.find(img => img.id === 'user-5')?.imageUrl || '' },
  { id: 'lead-2', name: 'Arjun Mehta', email: 'arjun.m@example.com', source: 'Referral', assignedTo: 'Sunita Rao', status: 'Contacted', avatar: PlaceHolderImages.find(img => img.id === 'user-6')?.imageUrl || '' },
  { id: 'lead-3', name: 'Diya Kumar', email: 'diya.k@example.com', source: 'Cold Call', assignedTo: 'Raj Verma', status: 'Qualified', avatar: PlaceHolderImages.find(img => img.id === 'user-1')?.imageUrl || '' },
];

const now = new Date();
export const activities: Activity[] = [
  { id: 'act-1', type: 'Meeting', title: 'Kick-off with Innovate India', date: new Date().toISOString(), notes: 'Discuss project scope and timeline.', relatedTo: { type: 'Opportunity', id: 'opp-1', name: 'Website Redesign' } },
  { id: 'act-2', type: 'Call', title: 'Follow up with Rohan', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), notes: 'Check on contract status.', relatedTo: { type: 'Opportunity', id: 'opp-2', name: 'Mobile App Development' } },
  { id: 'act-3', type: 'Task', title: 'Prepare proposal for Desi Tech', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), notes: 'Include cloud migration options.', relatedTo: { type: 'Contact', id: '3', name: 'Priya Singh' } },
  { id: 'act-4', type: 'Email', title: 'Send info to Isha Reddy', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), notes: 'Sent brochure and pricing.', relatedTo: { type: 'Lead', id: 'lead-1', name: 'Isha Reddy' } },
];
