import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { DataGrid } from "@material-ui/data-grid";

import Select from "@material-ui/core/Select";
const MenuItems = ({ props }) => {
  const { contract, account, handleOpenBackDrop, handleCloseBackDrop } = props;
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productName, setProductName] = useState("");
  const [cartPrice, setCartPrice] = useState(0);
  const [productArray, setProductArray] = useState([]);
  const classes = useStyles();

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

  const handleAddItemToCart = async () => {
    console.log(productName, selectedRestaurant);
    await contract.methods
      .addItemToCart(productName, selectedRestaurant)
      .send({ from: account });
  };

  const handleAddItemToCartButton = async (productName) => {
    handleOpenBackDrop();

    console.log(productName, selectedRestaurant);
    await contract.methods
      .addItemToCart(productName, selectedRestaurant)
      .send({ from: account });
    handleCloseBackDrop();
  };

  const handleCreateCart = async () => {
    handleOpenBackDrop();

    setCartPrice(0);
    await contract.methods.createCartForCustomner().send({ from: account });
    //await handleRequestDeliveryFee();
    handleCloseBackDrop();
  };

  const handleGetCartPrice = async () => {
    handleOpenBackDrop();

    const cartPriceRequest = await contract.methods
      .getCurrentCartPrice()
      .call({ from: account });
    setCartPrice(cartPriceRequest);
    console.log(cartPriceRequest);
    handleCloseBackDrop();
  };

  const handlePay = async () => {
    handleOpenBackDrop();

    console.log(cartPrice);
    await contract.methods
      .payCart(selectedRestaurant)
      .send({ from: account, value: cartPrice });

    setCartPrice(0);
    handleCloseBackDrop();
  };

  const handleGetProducts = async (restaurantName) => {
    handleOpenBackDrop();

    console.log(restaurantName);
    const numberOfProducts = await contract.methods
      .getNumberOfProductsByRestaurantName(restaurantName)
      .call();

    let arrNames = [];
    for (let index = 0; index < numberOfProducts; index++) {
      arrNames.push(
        await contract.methods
          .getProductNameByRestaurantNameAndId(restaurantName, index)
          .call()
      );
    }
    let arrPrices = [];
    for (let index = 0; index < numberOfProducts; index++) {
      arrPrices.push(
        await contract.methods
          .getProductPriceByRestaurantNameAndId(restaurantName, index)
          .call()
      );
    }

    let arrProducts = [];
    for (let index = 0; index < numberOfProducts; index++) {
      arrProducts.push({
        id: index,
        productName: arrNames[index],
        productPrice: arrPrices[index],
      });
    }
    console.log(arrProducts);
    setProductArray(arrProducts);
    handleCloseBackDrop();
  };

  const handleRestaurantChange = async (restaurantName) => {
    handleOpenBackDrop();

    setSelectedRestaurant(restaurantName);
    await handleGetProducts(restaurantName);
    handleCloseBackDrop();
  };

  const handleRequestDeliveryFee = async () => {
    const reponse = await contract.methods
      .getRandomNumber("123")
      .send({ from: account });
    console.log(reponse);
  };

  const handleApplyDeliveryFee = async () => {
    handleOpenBackDrop();

    const reponse = await contract.methods
      .applyDeliveryFee()
      .send({ from: account });
    console.log(reponse);
    handleCloseBackDrop();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "productName",
      headerName: "Product Name",
      width: 300,
    },
    { field: "productPrice", headerName: "Product Price", width: 300 },
    {
      field: "addItemToCart",
      headerName: "addItemToCart",
      width: 300,
      renderCell: (value) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddItemToCartButton(value.row.productName)}
        >
          Add Item To Cart{" "}
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} spacing={10}>
          <Box m="2rem">
            <Select
              value={selectedRestaurant}
              onChange={(e) => handleRestaurantChange(e.target.value)}
            >
              {restaurants.map((restaurant) => (
                <MenuItem value={restaurant}>{restaurant}</MenuItem>
              ))}
            </Select>
            {"                                    "}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetRestaurants}
            >
              Get Restaurants{" "}
            </Button>
          </Box>
          <Box m="5rem">
            <Box m="0.5rem">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateCart}
              >
                Create Cart
              </Button>
            </Box>

            <Button variant="contained" color="secondary" onClick={handlePay}>
              Pay
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetCartPrice}
            >
              Get Cart Price
            </Button>
          </Box>
          {/* <Box m="0.5rem">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestDeliveryFee}
            >
              Request Delivery Fee
            </Button>
          </Box> */}
          <Box m="0.5rem">
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyDeliveryFee}
            >
              Apply Delivery Fee
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} spacing={10}>
          <h1>Current Cart Price : {cartPrice} Wei</h1>
        </Grid>
      </Grid>
      <DataGrid rows={productArray} columns={columns}></DataGrid>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default MenuItems;
