import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

const AdminTools = ({ props }) => {
  const { contract, account, handleOpenBackDrop, handleCloseBackDrop } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [sales, setSales] = useState([]);

  const handleCreateRestaurant = async () => {
    handleOpenBackDrop();
    const cartPriceRequest = await contract.methods
      .createRestaurant(restaurantName)
      .send({ from: account });
    handleCloseBackDrop();
    console.log(cartPriceRequest);
  };

  const handleGetSales = async () => {
    handleOpenBackDrop();

    const numberOfSales = await contract.methods.numberOfSales().call();
    let arr = [];

    for (let index = 0; index < numberOfSales; index++) {
      arr.push(await contract.methods.getSaleById(index).call());
    }
    setSales(arr);
    handleCloseBackDrop();
  };

  const handleCreateItem = async () => {
    handleOpenBackDrop();

    console.log(productName, productPrice, selectedRestaurant);
    await contract.methods
      .addItemToMenu(productName, productPrice, selectedRestaurant)
      .send({ from: account });
    handleCloseBackDrop();
  };

  const handleGetRestaurants = async () => {
    console.log("PRESSED");
    handleOpenBackDrop();

    const numberOfRestaurants = await contract.methods
      .currentNumberRestaurants()
      .call();
    let arr = [];
    for (let index = 0; index < numberOfRestaurants; index++) {
      arr.push(await contract.methods.restaurantNames(index).call());
    }
    setRestaurants(arr);
    handleCloseBackDrop();
  };

  return (
    <React.Fragment>
      <Box m="1rem">
        <TextField
          fullWidth
          label={"Nombre Restaurante"}
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </Box>

      <Box m="1rem">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRestaurant}
        >
          CreateRestaurant
        </Button>
      </Box>

      <Box m="1rem">
        <Select
          label="Select Restaurante"
          id="demo-simple-select"
          fullWidth
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
        >
          {restaurants.map((restaurant) => (
            <MenuItem value={restaurant}>{restaurant}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box m="1rem">
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetRestaurants}
        >
          Get Restaurants
        </Button>
      </Box>
      <Box m="1rem">
        <TextField
          fullWidth
          label={"Nombre"}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Box>
      <Box m="1rem">
        <TextField
          fullWidth
          label={"Precio"}
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </Box>
      <Box m="1rem">
        <Button variant="contained" color="primary" onClick={handleCreateItem}>
          Creat Item
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleGetSales}>
        Get Sales
      </Button>
      <ol>
        {sales.map((sale) => (
          <li>{sale}</li>
        ))}
      </ol>
    </React.Fragment>
  );
};

export default AdminTools;
