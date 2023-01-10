import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function DemoUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
    history.push("/home");
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
