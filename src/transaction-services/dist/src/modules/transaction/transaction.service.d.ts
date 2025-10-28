import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        products: {
            name: string;
            id: string;
            createdAt: Date;
            orderId: string;
        }[];
    } & {
        amount: number;
        quantity: number;
        id: string;
        createdAt: Date;
    }>;
    findOne(id: string): Promise<({
        products: {
            name: string;
            id: string;
            createdAt: Date;
            orderId: string;
        }[];
    } & {
        amount: number;
        quantity: number;
        id: string;
        createdAt: Date;
    }) | null>;
}
