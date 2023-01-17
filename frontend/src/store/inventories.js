import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

export const RECEIVE_INVENTORIES = "inventories/RECEIVE_INVENTORIES";
export const RECEIVE_INVENTORY = "inventories/RECEIVE_INVENTORY";
export const RECEIVE_USER_INVENTORIES = "inventories/RECEIVE_USER_INVENTORIES";
export const RECEIVE_NEW_INVENTORY = "inventories/RECEIVE_NEW_INVENTORY";
export const REMOVE_INVENTORY = "inventories/REMOVE_INVENTORY";

export const RECEIVE_INVENTORY_ERRORS = "inventories/RECEIVE_INVENTORY_ERRORS";
export const CLEAR_INVENTORY_ERRORS = "inventories/CLEAR_INVENTORY_ERRORS";

export const getInventory = (inventoryId) => (state) =>
  state.inventories ? state.inventories[inventoryId] : null;

export const getInventories = (state) =>
  state.inventories ? Object.values(state.inventories) : [];

export const receiveInventories = (inventories) => ({
  type: RECEIVE_INVENTORIES,
  inventories,
});

export const receiveUserInventories = (inventories) => ({
  type: RECEIVE_USER_INVENTORIES,
  inventories,
});

export const receiveInventory = (inventory) => ({
  type: RECEIVE_INVENTORY,
  inventory,
});

export const removeInventory = (inventoryId) => ({
  type: REMOVE_INVENTORY,
  inventoryId,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_INVENTORY_ERRORS,
  errors,
});

export const clearInventoryErrors = (errors) => ({
  type: CLEAR_INVENTORY_ERRORS,
  errors,
});

export const deleteInventory = (inventoryId) => async (dispatch) => {
  await jwtFetch(`/api/inventories/${inventoryId}`, {
    method: "DELETE",
  });

  dispatch(removeInventory(inventoryId));
};

export const fetchInventories = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/inventories");
    const inventories = await res.json();
    dispatch(receiveInventories(inventories));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchInventory = (InventoryId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/inventories/${InventoryId}`);
    const data = await res.json();
    // console.log(data)
    dispatch(receiveInventory(data));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserInventories = () => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/inventory`);
    const inventories = await res.json();
    //   console.log(inventories)
    dispatch(receiveUserInventories(inventories));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const addInventory = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/inventories/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const inventory = await res.json();
    dispatch(receiveInventory(inventory));
  } catch (err) {
    console.log(err);
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const inventoryErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY_ERRORS:
      return action.errors;
    case RECEIVE_NEW_INVENTORY:
    case CLEAR_INVENTORY_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export const updateInventory = (inventory) => async (dispatch) => {
  const res = await jwtFetch(`/api/inventories/${inventory._id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inventory),
    method: "PATCH",
  });
  // const data = await res.json();
  // console.log(inventory);
  dispatch(fetchUserInventories());
};

const inventoriesReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_INVENTORIES:
      return { ...state, ...action.inventories };
    case RECEIVE_USER_INVENTORIES:
      return { ...action.inventories };
    case RECEIVE_INVENTORY:
      // console.log(action.inventory);
      newState[action.inventory._id] = action.inventory;
      return newState;

    // case RECEIVE_USER_LOGOUT:
    //   return state
    default:
      return state;
  }
};

export default inventoriesReducer;
