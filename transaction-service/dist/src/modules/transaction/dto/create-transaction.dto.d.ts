declare class ProductDto {
    name: string;
}
export declare class CreateTransactionDto {
    amount: number;
    quantity: number;
    products: ProductDto[];
}
export {};
