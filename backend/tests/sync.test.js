"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const sync_1 = __importDefault(require("../src/routes/sync"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', sync_1.default);
test('POST /api/sync returns success', async () => {
    const res = await (0, supertest_1.default)(app)
        .post('/api/sync')
        .send({
        userId: '00000000-0000-0000-0000-000000000000',
        date: '2026-03-20',
        score: 100,
        timeTaken: 45,
        streak: 5,
        hintsUsed: 1,
        hintsRemaining: 2
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
});
