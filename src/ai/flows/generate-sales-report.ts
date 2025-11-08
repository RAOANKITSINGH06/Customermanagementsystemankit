'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating sales reports based on natural language queries.
 *
 * generateSalesReport - A function that takes a natural language query and returns a sales report.
 * GenerateSalesReportInput - The input type for the generateSalesReport function.
 * GenerateSalesReportOutput - The return type for the generateSalesReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSalesReportInputSchema = z.object({
  query: z
    .string()
    .describe(
      'A natural language query describing the desired sales report.  E.g., \'total sales for the last quarter\', \'top 10 performing sales reps this year\', \'sales trends in the northeast region\''
    ),
});
export type GenerateSalesReportInput = z.infer<typeof GenerateSalesReportInputSchema>;

const GenerateSalesReportOutputSchema = z.object({
  report: z.string().describe('The generated sales report in a human-readable format.'),
});
export type GenerateSalesReportOutput = z.infer<typeof GenerateSalesReportOutputSchema>;

export async function generateSalesReport(input: GenerateSalesReportInput): Promise<GenerateSalesReportOutput> {
  return generateSalesReportFlow(input);
}

const generateSalesReportPrompt = ai.definePrompt({
  name: 'generateSalesReportPrompt',
  input: {schema: GenerateSalesReportInputSchema},
  output: {schema: GenerateSalesReportOutputSchema},
  prompt: `You are an AI assistant tasked with generating sales reports based on user queries.

  The user will provide a query in natural language, and you should generate a sales report that answers the query as accurately and thoroughly as possible.

  Query: {{{query}}}

  Report: `,
});

const generateSalesReportFlow = ai.defineFlow(
  {
    name: 'generateSalesReportFlow',
    inputSchema: GenerateSalesReportInputSchema,
    outputSchema: GenerateSalesReportOutputSchema,
  },
  async input => {
    const {output} = await generateSalesReportPrompt(input);
    return output!;
  }
);
