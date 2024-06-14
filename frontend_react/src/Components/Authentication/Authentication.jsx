import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthModel from "./AuthModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogleAction } from "../../Store/Auth/Action";

const Authentication = () => {
  const [authModelOpen, setAuthModelOpen] = useState(false);
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthModelClose = () => {
    setAuthModelOpen(false);
    navigate("/");
  };

  const handleAuthModelOpen = (path) => {
    setAuthModelOpen(true);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setAuthModelOpen(true);
    }
  }, [location.pathname]);

  const loginWithGoole = (res) => {
    console.log("res : ", res);
    dispatch(loginWithGoogleAction(res));
    // return
  };

  return (
    <div className="" style={{ background: "url('https://img.freepik.com/free-vector/social-media-background_1017-7007.jpg?size=626&ext=jpg&ga=GA1.1.974057440.1714990776&semt=ais') no-repeat center center fixed", backgroundSize: "cover" }}>
      {" "}
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src={process.env.PUBLIC_URL + '/logo3.png'}
            alt="img"
          />
        </Grid>
        <Grid className="px-10" item lg={5} xs={12}>
          <div className="py-10">
            <img
              className="w-16"
              src="https://pbs.twimg.com/media/F1iAD_iaYAAu7I3?format=jpg&name=small"
              alt=""
            />
          </div>
          <h2 className="font-bold text-6xl">Share Your Fitness Journey</h2>
          <h1 className="font-bold text-3xl py-16">Join with <span style={{ color: '#1d9bf0' }}>FitLab</span>, Today </h1>
          <div className="w-[60%]">
            <div className="w-full">
              <Button
                onClick={() => handleAuthModelOpen("/signup")}
                sx={{
                  width: "100%",
                  borderRadius: "29px",
                  py: "7px",
                  bgcolor: "#1d9bf0",
                }}
                variant="contained"
                size="large"
              >
                Create Account
              </Button>
              <p className="py-5 text-center">OR</p>
              <div className="ml-3 mb-5">
                <GoogleLogin
                  width={500}
                  onSuccess={loginWithGoole}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">Already Have Account?</h1>
              <Button
                onClick={() => handleAuthModelOpen("/signin")}
                sx={{
                  width: "100%",
                  borderRadius: "29px",
                  py: "7px",
                }}
                variant="outlined"
                size="large"
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel isOpen={authModelOpen} handleClose={handleAuthModelClose} />
    </div>
  );
};

export default Authentication;
