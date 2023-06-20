import React, { useEffect, useState } from "react";
import menuImg from "./images/menuImg.jpeg";
import Menu from "./Menu.js";
import { useHttpClient } from "../../src/shared/hooks/http-hook.js";

const UserMenus = () => {
  const [loadedMenus, setLoadedMenus] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?._id;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const responseData = await sendRequest(
          `https://eatandfit-api.onrender.com/api/menus/user/${userId}`
        );
        console.log(responseData);

        setLoadedMenus(responseData.menu);
      } catch (err) {}
    };
    fetchMenus();
  }, [sendRequest, userId]);

  //   const placeDeletedHandler = deletedPlaceId => {
  //     setLoadedPlaces(prevPlaces =>
  //       prevPlaces.filter(place => place.id !== deletedPlaceId)
  //     );
  //   };

  return (
    <React.Fragment>
      <img className="img-fluid" src={menuImg} alt="homeImg" />
      {loadedMenus && <Menu items={loadedMenus} />}
    </React.Fragment>
  );
};

export default UserMenus;
