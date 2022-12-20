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
                <h1>item</h1>
                <button onClick={() => history.push(`/inventories/${inventory.id}`)} className="question-link"> 
                    {inventory.title}
                </button>
            </li>
        </>
      ) 
}

export default InventoryIndexItem;