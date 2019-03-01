"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const counter_1 = require("../constants/counter");
const sheet_1 = require("../constants/sheet");
const INITIAL_STATE = {
    ability_sheet: [
        {
            id: 0,
            name: '简易DND',
            grid_type: 'three',
            ability: [
                {
                    id: 1,
                    name: 'HP',
                    value: 25
                },
                {
                    id: 2,
                    name: 'AC',
                    value: 12
                },
                {
                    id: 3,
                    name: '=',
                    value: ''
                },
                {
                    id: 4,
                    name: 'fort',
                    value: 10
                },
                {
                    id: 5,
                    name: 'refl',
                    value: 12
                },
                {
                    id: 6,
                    name: 'will',
                    value: 10
                }
            ]
        }
    ],
    num: 0
};
function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case sheet_1.ADD_ABILITY:
            return Object.assign({}, state, { num: state.num + 1 });
        case sheet_1.ADD_STAT:
            return Object.assign({}, state, { num: state.num + 1 });
        case sheet_1.CHANGE_STAT:
            return Object.assign({}, state, { num: state.num + 1 });
        case sheet_1.CHANGE_ABILITY:
            return Object.assign({}, state, { num: state.num + 1 });
        case sheet_1.ADD_STAT:
            return Object.assign({}, state, { num: state.num + 1 });
        case counter_1.MINUS:
            return Object.assign({}, state, { num: state.num - 1 });
        default:
            return state;
    }
}
exports.default = counter;
//# sourceMappingURL=sheet.js.map