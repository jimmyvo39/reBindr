import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function DemoUser() {
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
  };

  return (
    <>
      <input
        type="submit"
        onClick={login}
        className="demo-user-btn"
        value="Demo User"
      />
    </>
  );
}

export default DemoUser;
