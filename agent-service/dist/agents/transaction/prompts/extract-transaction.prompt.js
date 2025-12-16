export const buildTransactionPrompt = (userInput) => {
    return `You are a transaction parser. Extract transaction information from the following Vietnamese text.

CRITICAL: Extract the FOOD/ITEM NAME from the Vietnamese text. The product name is the main dish or item being ordered.

Parse the text and return a JSON object with exactly these fields:
- amount: numeric value in thousands (VND). 
  * If you see "k" suffix (e.g., "40k"), multiply by 1000: 40k = 40000
  * If you see a standalone number like "40" or "50", that is the amount isn't thousands: 40 = 40, 50 = 50
  * If no amount is mentioned, use default value 40
- quantity: number of items (default to 1 if not specified, extract from text like "+1", "x2", etc.)
- product: product name - MANDATORY field, must extract the Vietnamese food/item name (e.g., "cơm gà", "phở bò", "canh khổ qua nhồi thịt")

Text: "${userInput}"

Return ONLY valid JSON, nothing else. DO NOT include any explanation.
Example format:
{"amount": 40, "quantity": 1, "products": [{"name": "canh khổ qua nhồi thịt"}]},
{"amount": 40, "quantity": 1, "products": [{"name": "cơm gà"}]},
{"amount": 40, "quantity": 1, "products": [{"name": "phở bò"}]},
{"amount": 40, "quantity": 1, "products": [{"name": "bún bò"}]}`;
};
//# sourceMappingURL=extract-transaction.prompt.js.map