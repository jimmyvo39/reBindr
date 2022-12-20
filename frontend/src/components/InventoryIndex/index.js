import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import InventoryIndexItem from "./InventoryIndexItem";
import {fetchInventories, getInventories} from "../../store/inventories"








const InventoryIndex  = () => {
    const dispatch = useDispatch();
    const inventories = useSelector(getInventories);
    
    useEffect(()=>{
        dispatch(fetchInventories())
    },[])
    // console.log(inventories)

    const InventoriesIndexItems = inventories.map(inventory => {
        return <InventoryIndexItem key={inventory.id}/>
    })

    return(
        <>  
            <div >
                
            <ul className="index-list">{InventoriesIndexItems}</ul>
            </div>

        </>
    )
}

export default InventoryIndex


