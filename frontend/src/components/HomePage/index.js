import React, { useEffect } from "react";
import "./HomePage.css";
import BigCalendar from "../Calendar";
import InventoryIndex from "../InventoryIndex";
import { getCurrentUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCurrentUser())
  },[])

  return (
    <>
    {currentUser &&
      <div className="home-page">
        <InventoryIndex />
        <BigCalendar />
      </div>
    }
    </>
  );
};

export default HomePage;
