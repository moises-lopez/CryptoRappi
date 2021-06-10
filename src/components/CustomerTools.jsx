import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const CustomerTools = ({ props }) => {
  const { contract, account, handleOpenBackDrop, handleCloseBackDrop } = props;
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleCreateCustomer = async () => {
    console.log(customerAddress, customerName);
    handleOpenBackDrop();
    await contract.methods
      .createCustomer(customerName, customerAddress)
      .send({ from: account });
    handleCloseBackDrop();
  };

  return (
    <React.Fragment>
      <Box m="1rem">
        <TextField
          label={"Nombre Cliente"}
          fullWidth
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Box>
      <Box m="1rem">
        <TextField
          label={"Direccion Cliente"}
          fullWidth
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCustomer}
      >
        CreateCustomer
      </Button>
    </React.Fragment>
  );
};

export default CustomerTools;
