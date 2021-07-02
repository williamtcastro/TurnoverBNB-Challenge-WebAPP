import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

import api from '../services/api';
import CustomCollapseList from './customCollapseList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '2rem',
    borderBottom: '1px #212121 solid',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function customProductForm({
  selectedProduct,
  setSelectedProduct,
  selectedProductList,
  action,
  isEditable,
}) {
  const styles = useStyles();
  const [productHistory, setProductHistory] = useState([]);
  const [collapseState, setCollapseState] = useState(false);

  const loadHistory = () => {
    api.get(`/product/${selectedProduct.id}`).then(({ data }) => {
      setProductHistory(data.quantity_history);
    });
    setCollapseState(!collapseState);
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} autoComplete="off">
        {action !== 0 ? (
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            disabled
            value={selectedProduct.id}
          />
        ) : (
          <></>
        )}

        <TextField
          id="name"
          label="Name"
          variant="outlined"
          disabled={isEditable}
          required
          value={selectedProduct.name}
          onChange={(e) => {
            selectedProduct.name = e.target.value;
            setSelectedProduct([...selectedProductList]);
          }}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          required
          disabled={isEditable}
          value={selectedProduct.price}
          onChange={(e) => {
            selectedProduct.price = e.target.value;
            setSelectedProduct([...selectedProductList]);
          }}
        />
        <TextField
          id="quantity"
          label="Quantity"
          variant="outlined"
          type="number"
          required
          disabled={isEditable}
          value={selectedProduct.quantity}
          onChange={(e) => {
            selectedProduct.quantity = e.target.value;
            setSelectedProduct([...selectedProductList]);
          }}
        />
      </form>

      {action !== 0 ? (
        <CustomCollapseList
          toogleList={loadHistory}
          state={collapseState}
          items={productHistory}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default customProductForm;
