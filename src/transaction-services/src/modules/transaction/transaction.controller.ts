import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('api/v2/orders')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    // mock await 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('createTransactionDto', createTransactionDto);
    // const order = await this.transactionService.create(createTransactionDto);

    const order = {
      id: '123',
      amount: 100000,
      quantity: 1,
      products: [{ name: 'Product 1' }],
      createdAt: new Date(),
    };

    return {
      status: 'success',
      data: {
        id: order.id,
        amount: order.amount,
        quantity: order.quantity,
        products: order.products.map((p) => ({ name: p.name })),
        created_at: order.createdAt,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.transactionService.findOne(id);

    if (!order) {
      return {
        status: 'error',
        message: 'Order not found',
      };
    }

    return {
      status: 'success',
      data: {
        id: order.id,
        amount: order.amount,
        quantity: order.quantity,
        products: order.products.map((p) => ({ name: p.name })),
        created_at: order.createdAt,
      },
    };
  }
}
