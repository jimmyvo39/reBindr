import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";
import InventoryIndexItem from "./InventoryIndexItem";
import {fetchUserInventories, getInventories} from "../../store/inventories"
import {getCurrentUser} from "../../store/session"








const InventoryIndex  = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const inventories = useSelector(getInventories);
    // const currentUser = useSelector(getCurrentUser())
    // console.log(dispatch(getCurrentUser()))
    
    useEffect(()=>{
        dispatch(fetchUserInventories())
    },[inventories.length])
    // console.log(inventories)

    const InventoriesIndexItems = inventories.map(inventory => {
        return <InventoryIndexItem inventory={inventory} key={inventory._id}/>
    })

    function testPage() {
        history.push(`test`)
    }

    return(
        <>  
            <div className="inventory-container" >
                <button onClick={testPage}> test page</button>
            <h1>INVENTORY</h1>
                
            <ul className="index-list">{InventoriesIndexItems}</ul>
            </div>

        </>
    )
}

export default InventoryIndex


