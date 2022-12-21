import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInventory, getInventory } from "../../store/inventories";

const InventoryShow = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    // console.log(id)
    const item = useSelector(getInventory(id))
    console.log(item)

    useEffect(()=>{
        dispatch(fetchInventory(id))
    },[id])

    if (item) {
        return(
            <>
            <h1>item show details</h1>
            <h1>{item ? item.model : ""}</h1>
            </>
            
        )
    }
}

export default InventoryShow