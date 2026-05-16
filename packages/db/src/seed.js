"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
var client_1 = require("@repo/db/client");
var data_1 = require("@repo/db/data");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, products_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🌱 Seeding database");
                    // delete old data
                    return [4 /*yield*/, client_1.client.db.orderItem.deleteMany()];
                case 1:
                    // delete old data
                    _a.sent();
                    return [4 /*yield*/, client_1.client.db.order.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client_1.client.db.product.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client_1.client.db.user.deleteMany()];
                case 4:
                    _a.sent();
                    // create admin
                    return [4 /*yield*/, client_1.client.db.user.create({
                            data: {
                                username: "admin",
                                email: "admin@qfashion.com",
                                password: "123",
                                role: "ADMIN",
                            },
                        })];
                case 5:
                    // create admin
                    _a.sent();
                    // create buyer
                    return [4 /*yield*/, client_1.client.db.user.create({
                            data: {
                                username: "buyer",
                                email: "buyer@gmail.com",
                                password: "123",
                                role: "BUYER",
                            },
                        })];
                case 6:
                    // create buyer
                    _a.sent();
                    _i = 0, products_1 = data_1.products;
                    _a.label = 7;
                case 7:
                    if (!(_i < products_1.length)) return [3 /*break*/, 10];
                    product = products_1[_i];
                    return [4 /*yield*/, client_1.client.db.product.create({
                            data: {
                                id: product.id,
                                urlId: product.urlId,
                                gender: product.gender,
                                name: product.name,
                                brand: product.brand,
                                description: product.description,
                                size: product.size,
                                imageUrl: product.imageUrl,
                                category: product.category,
                                price: product.price,
                                stock: product.stock,
                                sold: product.sold,
                                active: product.active,
                            },
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10:
                    console.log("✅ Database seeded");
                    return [2 /*return*/];
            }
        });
    });
}
