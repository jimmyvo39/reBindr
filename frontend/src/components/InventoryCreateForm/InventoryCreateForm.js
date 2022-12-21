import React,{useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import jwtFetch from "../../store/jwt";
import { useHistory } from 'react-router-dom';
import receiveInventory from '../../store/inventories'
import receiveErrors from '../../store/errors'
// import { getCurrentUser } from "../../store/session";



function InventoryForm( ) {

    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const uploader = sessionUser ? sessionUser._id : null

    function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        const onChange = (e) => setValue(e.target.value);
        return [value, onChange];
    }

    const[name, onNameChange] = useInput("")
    const[model, onModelChange] = useInput("")
    const[notes, onNotesChange] = useInput("")
    const[user_manuel, onUserManuelChange] = useInput("")


    const addInventory = (data) => async dispatch => {

        try {
          const res = await jwtFetch('/api/inventories/', {
            method: 'POST',
            body: JSON.stringify(data)
          });
          const inventory = await res.json();
          dispatch(receiveInventory(inventory));
          if (res.ok){
              history.push(`/`)
            }  
        } catch(err) {
          const resBody = await err.json();
          if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
          }
        }
      };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {uploader, name, model, notes, user_manuel}
        dispatch(addInventory(data));
      }

const [] = useInput =("")

    return (
        <>
        <h1>inventory form</h1>
        <form form onSubmit={onSubmit}>
          <input type="text" placeholder="item name" value={name} onChange={onNameChange}/>
          <input type="text" placeholder="model" value={model} onChange={onModelChange}/>
          <textarea placeholder="notes" value={notes} onChange={onNotesChange}/>
          <input type="text" placeholder="user manuel link" value={user_manuel} onChange={onUserManuelChange}/>
          <button type="submit" >Add item</button>
        </form>
        </>
    )
} 

export default InventoryForm