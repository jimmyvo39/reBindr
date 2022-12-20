import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import InventoryIndexItem from "./InventoryIndexItem";
import {fetchUserInventories, getInventories} from "../../store/inventories"
import {getCurrentUser} from "../../store/session"








const InventoryIndex  = () => {
    const dispatch = useDispatch();
    const inventories = useSelector(getInventories);
    const currentUser = useSelector(getCurrentUser())
    // console.log(dispatch(getCurrentUser()))
    
    useEffect(()=>{
        dispatch(fetchUserInventories())
    },[])
    // console.log(inventories)

    const InventoriesIndexItems = inventories.map(inventory => {
        return <InventoryIndexItem inventory={inventory} key={inventory.id}/>
    })

    // console.log(InventoriesIndexItems)

    return(
        <>  
            <div >
                
            <ul className="index-list">{InventoriesIndexItems}</ul>
            </div>

        </>
    )
}

export default InventoryIndex

