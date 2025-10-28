import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { amount, quantity, products } = createTransactionDto;

    const order = await this.prisma.order.create({
      data: {
        amount,
        quantity,
        products: {
          create: products.map((product) => ({
            name: product.name,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }
}
