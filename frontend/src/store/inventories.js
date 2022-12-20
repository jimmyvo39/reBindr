import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_INVENTORIES = "inventories/RECEIVE_INVENTORIES";
const RECEIVE_USER_INVENTORIES = "inventories/RECEIVE_USER_INVENTORIES";
const RECEIVE_NEW_INVENTORY = "inventories/RECEIVE_NEW_INVENTORY";
const REMOVE_INVENTORY = "inventories/RECEIVE_INVENTORY";

const RECEIVE_INVENTORY_ERRORS = "inventories/RECEIVE_INVENTORY_ERRORS";
const CLEAR_INVENTORY_ERRORS = "inventories/CLEAR_INVENTORY_ERRORS";

const removeInventory = inventoryId => ({
    type: REMOVE_INVENTORY,
    inventory
})

export const removeQuestion = (questionId) => ({type: REMOVE_QUESTION, questionId});

const receiveInventories = inventories => ({
  type: RECEIVE_INVENTORIES,
  inventories
});

const receiveUserInventories = inventories => ({
  type: RECEIVE_USER_INVENTORIES,
  inventories
});

const receiveNewInventory = inventory => ({
  type: RECEIVE_NEW_INVENTORY,
  inventory
});

const receiveErrors = errors => ({
  type: RECEIVE_INVENTORY_ERRORS,
  errors
});

export const clearInventoryErrors = errors => ({
    type: CLEAR_INVENTORY_ERRORS,
    errors
});

export const fetchInventories = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/inventories');
      const inventories = await res.json();
      dispatch(receiveInventories(inventories));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchUserInventories = async dispatch => {
    try {
      const res = await jwtFetch(`/api/users/inventory`);
      const inventories = await res.json();
      dispatch(receiveUserInventories(inventories));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };
  
  export const addInventory = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/i/inventories/', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const inventory = await res.json();
      dispatch(receiveNewInventory(inventory));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  const nullErrors = null;

export const tweetErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_INVENTORY_ERRORS:
      return action.errors;
    case RECEIVE_NEW_INVENTORY:
    case CLEAR_INVENTORY_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const inventoriesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch(action.type) {
      case RECEIVE_INVENTORIES:
        return { ...state, all: action.inventories, new: undefined};
      case RECEIVE_USER_INVENTORIES:
        return { ...state, user: action.inventories, new: undefined};
      case RECEIVE_NEW_INVENTORY:
        return { ...state, new: action.tweet};
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {}, new: undefined }
      default:
        return state;
    }
  };
  
  export default inventoriesReducer;