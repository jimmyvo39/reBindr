import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

// import {deleteQuestion} from "../../store/questions";

const InventoryIndexItem = ({inventory}) => {
    const history = useHistory();
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    return(
        <>
            <li >
                <h1></h1>
                <div onClick={() => history.push(`/inventories/${inventory._id}`)} className="item-button">

                    {inventory.name}- model:{inventory.model}
                </div>
                
            </li>
        </>
      ) 
}

export default InventoryIndexItem;