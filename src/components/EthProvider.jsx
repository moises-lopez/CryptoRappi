import React, { useEffect, useState } from "react";
import cryptoRappiAbi from "../config/ABI.js";
import Checkout from "./Checkout";
import AdminTools from "./AdminTools";
import CustomerTools from "./CustomerTools";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItems from "./MenuItems";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Web3 from "web3";
const EthProvider = () => {
  const classes = useStyles();

  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [open, setOpen] = useState(false);

  const checkMetamaskWeb3 = async () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      const web3js = new Web3(window.web3.currentProvider);
      const cryptoRappiAddress = "0xc103bD01FB7783CBfA8DA6AF9C9B193aC9Af4270";
      const web3Infura = new Web3(
        new Web3.providers.HttpProvider("https://kovan.infura.io")
      );
      const cryptoZombies = new web3js.eth.Contract(
        cryptoRappiAbi,
        cryptoRappiAddress
      );
      setContract(cryptoZombies);
      const isOwnerRequest = cryptoZombies.methods.isOwnerFun().call();
      setIsOwner(isOwnerRequest);
      const account = await web3js.eth.requestAccounts();

      setAccount(account[0]);
    }
  };

  const handleOpenBackDrop = () => {
    console.log("TRIGGERED");
    setOpen(true);
  };

  const handleCloseBackDrop = () => {
    console.log("TRIGGERED");
    setOpen(false);
  };

  useEffect(() => {
    checkMetamaskWeb3();
  }, []);

  const handleClick = async () => {};

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={6}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Admin Tools
            </Typography>
          </Toolbar>
        </AppBar>
        <AdminTools
          props={{ contract, account, handleOpenBackDrop, handleCloseBackDrop }}
        />
      </Grid>
      <Grid item xs={6}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Customer Tools
            </Typography>
          </Toolbar>
        </AppBar>
        <CustomerTools
          props={{ contract, account, handleOpenBackDrop, handleCloseBackDrop }}
        />
      </Grid>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Order Food
            </Typography>
          </Toolbar>
        </AppBar>
        <MenuItems
          props={{ contract, account, handleOpenBackDrop, handleCloseBackDrop }}
        />
      </Grid>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default EthProvider;
