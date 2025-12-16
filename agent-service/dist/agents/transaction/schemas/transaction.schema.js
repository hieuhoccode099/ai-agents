export const validateTransactionData = (data) => {
    if (!data || typeof data !== "object") {
        throw new Error("Transaction data must be an object");
    }
    const transaction = data;
    let amount;
    if (transaction.amount === undefined || transaction.amount === null) {
        amount = 40;
    }
    else if (typeof transaction.amount === "number" &&
        !isNaN(transaction.amount)) {
        amount = transaction.amount;
    }
    else {
        throw new Error("Invalid amount type (must be a valid number)");
    }
    let product;
    if (transaction.product === undefined ||
        transaction.product === null ||
        typeof transaction.product !== "string") {
        console.log("DEBUG: Product is not a string, got:", transaction.product, "type:", typeof transaction.product);
        product = "Món ăn không xác định";
    }
    else {
        product = transaction.product.trim();
    }
    if (product === "") {
        product = "Món ăn không xác định";
    }
    let quantity;
    if (transaction.quantity === undefined || transaction.quantity === null) {
        quantity = 1;
    }
    else if (typeof transaction.quantity === "number" &&
        !isNaN(transaction.quantity)) {
        quantity = transaction.quantity;
    }
    else {
        throw new Error("Invalid quantity type (must be a valid number)");
    }
    return { amount, quantity, product };
};
export const validateTransactionAmount = (amount) => {
    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }
};
//# sourceMappingURL=transaction.schema.js.map