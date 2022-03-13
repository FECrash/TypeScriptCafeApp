import createStore from './redux';
import * as actions from './actions';

const initialState: CafeMenuState = {
  categoryNames: [],
  menuNames: [],
};

function cafeMenuReducer(action: Redux.Action, state: CafeMenuState = initialState): CafeMenuState {
  switch (action.type) {
    case actions.ADD_MENU_NAME:
      return {
        ...state,
        menuNames: addMenuName(state.menuNames, action.data),
      };
    case actions.DELETE_MENU_NAME:
      return {
        ...state,
        menuNames: removeMenuName(state.menuNames, action.data),
      };
    case actions.EDIT_MENU_NAME:
      return {
        ...state,
        menuNames: editMenuName(state.menuNames, action.data),
      };
    default:
      return { ...state };
  }
}

function addMenuName(previousMenuNames: string[], data: string): string[] {
  const newMenuNames = previousMenuNames.slice();
  newMenuNames.push(data);
  return newMenuNames;
}

function removeMenuName(previousMenuNames: string[], removeIndex: number): string[] {
  return previousMenuNames.filter((value, index) => index !== removeIndex);
}

function editMenuName(previousMenuNames: string[], data: editMenuData): string[] {
  return previousMenuNames.map((name, index) => {
    if (index !== data.index) return name;

    return data.changeValue;
  });
}

const cafeMenuStore = createStore(cafeMenuReducer);
cafeMenuStore.dispatch({ type: '' }); // 초기 state를 set헤주기 위해 빈 action 호출

export default cafeMenuStore;