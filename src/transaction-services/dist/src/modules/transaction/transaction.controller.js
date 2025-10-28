"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
let TransactionController = class TransactionController {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async create(createTransactionDto) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('createTransactionDto', createTransactionDto);
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
    async findOne(id) {
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
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('api/v2/orders'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map