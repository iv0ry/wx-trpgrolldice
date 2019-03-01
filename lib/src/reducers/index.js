"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const counter_1 = require("./counter");
const sheet_1 = require("./sheet");
exports.default = redux_1.combineReducers({
    counter: counter_1.default,
    sheet: sheet_1.default
});
//# sourceMappingURL=index.js.map