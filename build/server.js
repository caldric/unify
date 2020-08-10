"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
}
app.get('/*', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
