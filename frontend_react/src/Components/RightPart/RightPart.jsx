import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/Theme/Action";
import SubscriptionModel from "./SubscriptionModel";
import { searchUser } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
import Status from "../Status/Status";

const RightPart = () => {
  const { theme, auth } = useSelector((store) => store);
  const [search,setSearch]=useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const handleCloseSubscriptionMadal = () => setOpenSubscriptionModal(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);

  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
  };
  const handleSearchUser = (event) => {
    setSearch(event.target.value)
    dispatch(searchUser(event.target.value));
  };
  const navigateToProfile=(id)=>{
navigate(`/profile/${id}`)
setSearch("")
  }
  return (
    <div className="py-5 sticky top-0 overflow-y-hidden">
      <div className="hideScrollbar overflow-y-scroll">
        <div className="relative flex items-center">
          <input
          value={search}
            onChange={handleSearchUser}
            type="text"
            placeholder="Search..."
            className={`py-3 rounded-full outline-none text-gray-500 w-full pl-12 ${
              theme.currentTheme === "light" ? "bg-slate-300" : "bg-[#151515]"
            }`}
          />
          <span className="absolute top-0 left-0 pl-3 pt-3">
            <SearchIcon className="text-gray-500" />
          </span>
         {search && <div className={` overflow-y-scroll hideScrollbar absolute z-50 top-14  border-gray-700 h-[40vh] w-full rounded-md ${
              theme.currentTheme === "light" ? "bg-white" : "bg-[#151515] border" }`}>
            {auth.searchResult.map((item) => (
              <div onClick={()=>navigateToProfile(item.id)} className="flex items-center hover:bg-slate-800 p-3 cursor-pointer">
                <Avatar alt={item.fullName} src={item.image} />
                <div className="ml-2">
                  <p>{item.fullName}</p>
                  <p className="text-sm text-gray-400">
                    @{item.fullName.split(" ").join("_").toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>}
          {/* <Brightness4Icon
            onClick={handleChangeTheme}
            className="ml-3 cursor-pointer"
          /> */}
        </div>

        {/* <section
          className={`my-5 ${
            theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
          }`}
        >
          <h1 className="text-xl font-bold">Get Verified</h1>
          <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
          <Button
            onClick={handleOpenSubscriptionModal}
            variant="contained"
            sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          >
            {" "}
            Get verified
          </Button>
        </section> */}
<section
  className={`mt-7 space-y-5 ${
    theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
  }`}
>
  <h1 className="font-bold text-xl py-1">Latest Status Updates</h1>

  <div>
    <p className="text-sm">New Gym Challenge · LIVE </p>
    <p className="font-bold">Squats vs Deadlifts</p>
  </div>

  <div className="flex justify-between w-full">
    <div>
      <p>Fitness Tips · Trending</p>
      <p className="font-bold">#HealthyLifestyle</p>
      <p>12.7K Views</p>
    </div>

    <MoreHorizIcon />
  </div>
  <div className="flex justify-between w-full">
    <div>
      <p>Workout Ideas · Trending</p>
      <p className="font-bold">#LegDay</p>
      <p>18.9K Views</p>
    </div>

    <MoreHorizIcon />
  </div>

  <div className="flex justify-between w-full">
    <div>
      <p>Fitness Challenges · Trending</p>
      <p className="font-bold">#PushUpChallenge</p>
      <p>25.3K Views</p>
    </div>

    <MoreHorizIcon />
  </div>
</section>

      </div>
      {/* <section
      className={`mt-7 space-y-5 ${
        theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
      }`}
    >
      <h1 className="font-bold text-xl py-1">Latest Gym Updates</h1>

      <div className="flex justify-between w-full items-center">
        <div>
          <p className="text-sm">New Gym Challenge · LIVE </p>
          <p className="font-bold">Squats vs Deadlifts</p>
        </div>
        <Status statusText="Active" statusColor="bg-green-500 text-white" />
      </div>

      <div className="flex justify-between w-full items-center">
        <div>
          <p>Fitness Tips · Trending</p>
          <p className="font-bold">#HealthyLifestyle</p>
          <p>12.7K Tweets</p>
        </div>
        <Status statusText="Trending" statusColor="bg-blue-500 text-white" />
      </div>

      <div className="flex justify-between w-full items-center">
        <div>
          <p>Workout Ideas · Trending</p>
          <p className="font-bold">#LegDay</p>
          <p>18.9K Tweets</p>
        </div>
        <Status statusText="Trending" statusColor="bg-blue-500 text-white" />
      </div>

      <div className="flex justify-between w-full items-center">
        <div>
          <p>Fitness Challenges · Trending</p>
          <p className="font-bold">#PushUpChallenge</p>
          <p>25.3K Tweets</p>
        </div>
        <Status statusText="Trending" statusColor="bg-blue-500 text-white" />
      </div>
    </section> */}
  


      <SubscriptionModel
        open={openSubscriptionModal}
        handleClose={handleCloseSubscriptionMadal}
      />
    </div>
  );
};

export default RightPart;
