// Mock Service to replace Gemini API
// This allows deployment without needing a Google Cloud API Key

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[]) => {
  // Simulate network delay to feel like a real request
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerMsg = message.toLowerCase();

  // Simple keyword matching for demo purposes
  if (lowerMsg.includes('loan')) {
    return "We offer Personal, Home, and Car loans. You can check the 'Loans' section in the menu for attractive interest rates starting at 8.50%. Would you like me to guide you to the application page?";
  }
  
  if (lowerMsg.includes('account') || lowerMsg.includes('savings')) {
    return "Our Platinum Savings Account offers up to 7% interest p.a. It comes with a free debit card and unlimited ATM withdrawals. You can apply online in just a few minutes.";
  }

  if (lowerMsg.includes('card') || lowerMsg.includes('credit')) {
    return "The Ruby Credit Card is our most popular choice, offering lifetime free benefits and airport lounge access. Check the 'Cards' section for more details.";
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('support') || lowerMsg.includes('help')) {
    return "You can reach our 24/7 support team at 1800-123-4567 or email us at support@novabank.com. Visit the Support page for more options.";
  }

  if (lowerMsg.includes('apply')) {
    return "To apply for any of our products, simply navigate to the product page and click the 'Apply Now' button. It's a quick digital process!";
  }

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! Welcome to Nova Bank. How can I assist you with your banking needs today?";
  }

  if (lowerMsg.includes('login') || lowerMsg.includes('password')) {
    return "You can login using the 'Internet Banking' button at the top right. For security reasons, please do not share your password here.";
  }

  return "I am Nova, your virtual banking assistant. I can help you with information about our Accounts, Loans, and Credit Cards. Please note that I am currently running in offline demo mode and cannot process complex queries without an API key.";
};