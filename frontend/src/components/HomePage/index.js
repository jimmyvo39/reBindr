import React from "react";
import './HomePage.css';
import BigCalendar from "../Calendar";
import InventoryIndex from "../InventoryIndex"





const HomePage  = () => {

    return(
        <>  
            <div className="home-page">
                <InventoryIndex/>
                <BigCalendar/>
            </div>

        </>
    )
}

export default HomePage


