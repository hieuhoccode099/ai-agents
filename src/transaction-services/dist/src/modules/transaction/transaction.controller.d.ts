import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        status: string;
        data: {
            id: string;
            amount: number;
            quantity: number;
            products: {
                name: string;
            }[];
            created_at: Date;
        };
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
            id: string;
            amount: number;
            quantity: number;
            products: {
                name: string;
            }[];
            created_at: Date;
        };
        message?: undefined;
    }>;
}
