import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

const Menu = ({ props }) => {
  const { contract, account } = props;

  const [cartPrice, setCartPrice] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const handleGetCartPrice = async () => {
    console.log("PRESSED");
    const cartPriceRequest = await contract.methods
      .getCurrentCartPrice()
      .call();
    setCartPrice(cartPriceRequest);
  };

  const handleGetRestaurants = async () => {
    console.log("PRESSED");
    const numberOfRestaurants = await contract.methods
      .currentNumberRestaurants()
      .call();
    let arr = [];
    for (let index = 0; index < numberOfRestaurants; index++) {
      arr.push(await contract.methods.restaurantNames(index).call());
    }
    setRestaurants(arr);
  };

  return (
    <React.Fragment>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedRestaurant}
        onChange={(e) => setSelectedRestaurant(e.target.value)}
      >
        {restaurants.map((restaurant) => (
          <MenuItem value={restaurant}>{restaurant}</MenuItem>
        ))}
      </Select>
      <Button onClick={handleGetCartPrice}>Get Cart Price</Button>
      <Button onClick={handleGetRestaurants}>handleGetRestaurantse</Button>

      {cartPrice}
    </React.Fragment>
  );
};

export default Menu;
