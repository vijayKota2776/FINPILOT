import OpenAI from 'openai';
import { getDashboardData } from './dashboard.service.js';
import dotenv from 'dotenv';

dotenv.config();

let openai;
if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_openai')) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

export const processQuery = async (companyId, message) => {
  try {
    // 1. Fetch real-time financial context from the database
    const financialData = await getDashboardData(companyId, 'this_month');
    
    // 2. Format the financial data into a condensed string for the LLM
    const contextStr = `
CASH BALANCE: ₹${financialData.summary.cashBalance}
REVENUE (This Month): ₹${financialData.summary.revenue}
EXPENSES (This Month): ₹${financialData.summary.expenses}
NET CASH FLOW: ₹${financialData.summary.netCashFlow}
RUNWAY: ${financialData.summary.runway} months
OVERDUE RECEIVABLES: ₹${financialData.summary.receivables.overdue}
OUTSTANDING PAYABLES: ₹${financialData.summary.payables.outstanding}
TRANSACTIONS PENDING REVIEW: ${financialData.summary.reconciliation.review}
    `.trim();

    // 3. Fallback logic if API key is missing (so the UI doesn't completely break for the user right now)
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
      console.warn("OpenAI API key missing. Falling back to simulated response.");
      return runSimulatedFallback(message, financialData);
    }

    // 4. Send to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are FINPILOT, an expert AI financial controller for a company. 
You are speaking directly to a user in the company. 
Keep your answers very concise, highly professional, and directly address the user's question. 
Always format numbers with commas or standard Indian currency formatting (e.g. ₹1,00,000 or ₹1L).

Here is the company's LIVE financial data for the current month:
${contextStr}`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI Service Error:", error);
    return "I'm sorry, I encountered an error analyzing your financial data. Please ensure your OpenAI API key is correctly configured.";
  }
};

// Fallback logic so the app continues to work for you locally without an API key
const runSimulatedFallback = (message, data) => {
  const query = message.toLowerCase();
  
  if (query.includes('cash') || query.includes('balance') || query.includes('money')) {
    return `*(Simulated)* Your current cash balance is **₹${data.summary.cashBalance.toLocaleString('en-IN')}**.`;
  }
  if (query.includes('runway') || query.includes('burn')) {
    return `*(Simulated)* You have **${data.summary.runway} months** of runway remaining based on current burn.`;
  }
  if (query.includes('revenue') || query.includes('income')) {
    return `*(Simulated)* Your revenue this month is **₹${data.summary.revenue.toLocaleString('en-IN')}**.`;
  }
  if (query.includes('overdue') || query.includes('invoice')) {
    return `*(Simulated)* You currently have **₹${data.summary.receivables.overdue.toLocaleString('en-IN')}** in overdue invoices.`;
  }
  
  return "*(Simulated)* I am a data-aware placeholder. Please add an OpenAI API key to your `.env` file to unlock full conversational AI!";
};
