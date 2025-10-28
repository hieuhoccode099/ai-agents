# AI Agents & MCP Server - Transaction Recording

Ứng dụng Node.js sử dụng AI Agent (LangChain) và MCP Server để ghi nhận thu chi từ input tự nhiên tiếng Việt.

## Tính năng

- **AI Agent**: Phân tích input tiếng Việt thô, trích xuất thông tin `amount`, `quantity`, và `product name`
- **MCP Server**: API trung gian cho Agent gọi tới, thực hiện ghi thu chi qua API thu chi gốc
- **Natural Language Processing**: Hỗ trợ nhiều định dạng input:
  - "Cho em +1 cơm gà 40k."
  - "Em một cơm gà 40."
  - "Em 1 cơm gà 40."

## Cấu trúc thư mục

```
src/
 ├── agents/
 │    └── transactionAgent.js      # AI Agent với LangChain
 ├── mcp/
 │    └── server.js                # MCP Server với Express
 ├── services/
 │    └── transactionService.js    # Service gọi API thu chi
 └── index.js                      # Entry point
```

## Cài đặt

1. **Clone repository và cài đặt dependencies:**

```bash
cd ai-agents
yarn install
```

2. **Cấu hình môi trường:**

Sao chép file `env.example` thành `.env`:

```bash
cp env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:

```env
OPENAI_API_KEY=sk-...
TRANSACTION_API_URL=https://your-api.com/api/v2/orders
TRANSACTION_API_TOKEN=your_token_here
PORT=3000
```

## Chạy ứng dụng

```bash
yarn dev
```

Server sẽ chạy tại `http://localhost:3000`

## Sử dụng

### 1. Chat Endpoint (Tích hợp với AI Agent)

Gửi POST request đến `/api/chat`:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Cho em +1 cơm gà 40k."}'
```

**Response:**

```json
{
  "success": true,
  "message": "Đã ghi lại đơn hàng cơm gà 40k.",
  "transaction": {
    "amount": 40000,
    "quantity": 1,
    "product": "cơm gà"
  }
}
```

### 2. MCP Endpoint (Trực tiếp)

Gửi POST request đến `/api/record-transaction`:

```bash
curl -X POST http://localhost:3000/api/record-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 40000,
    "quantity": 1,
    "products": [{"name": "cơm gà"}]
  }'
```

### 3. Health Check

```bash
curl http://localhost:3000/health
```

## Luồng hoạt động

1. User gửi message → AI Agent nhận input thô
2. AI Agent dùng LangChain (GPT-4o-mini) để parse → trích xuất `amount`, `quantity`, `product`
3. AI Agent gọi MCP Server qua REST API
4. MCP Server nhận request → gọi API thu chi thật
5. Trả kết quả về cho User

## Công nghệ sử dụng

- **Node.js** (>=18)
- **LangChain.js** - AI framework
- **OpenAI GPT-4o-mini** - LLM model
- **Express** - Web framework
- **Axios** - HTTP client
- **dotenv** - Environment configuration

## Xử lý lỗi

- Agent có fallback khi không parse được input → log cảnh báo, không crash
- Service có retry và timeout handling
- API errors được log và trả về message thân thiện

## Mở rộng tương lai

- Thêm module `cancelOrderService.js` - hủy đơn hàng
- Thêm module `menuService.js` - đọc danh sách món để tự động định giá
- Thêm nhiều endpoint MCP mới cho Agent có thể gọi

## License

ISC
