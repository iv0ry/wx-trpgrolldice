import { ADD, MINUS } from '../constants/counter'
import { ADD_ABILITY, ADD_STAT, CHANGE_STAT, CHANGE_ABILITY } from '../constants/sheet'

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
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ABILITY:
      return {
        ...state,
        num: state.num + 1
    }
    case ADD_STAT:
      return {
        ...state,
        num: state.num + 1
    }
    case CHANGE_STAT:
      return {
        ...state,
        num: state.num + 1
    }
    case CHANGE_ABILITY:
      return {
        ...state,
        num: state.num + 1
    }
    case ADD_STAT:
      return {
        ...state,
        num: state.num + 1
    }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     default:
       return state
  }
}
