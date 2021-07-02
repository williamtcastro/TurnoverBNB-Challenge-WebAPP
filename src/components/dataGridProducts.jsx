import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';

// import Swal from 'sweetalert2';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';

import api from '../services/api';
import CustomButtomGroup from './customButtonGroup';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Product',
    width: 250,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 200,
    editable: false,
  },
];

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'right',
    paddingBottom: '1rem',
  },
}));

function DataGridProducts({ setAction, setProductsList }) {
  const styles = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewEnabled, setIsViewEnabled] = useState(true);

  const handleSelectedActions = (selectedAction) => {
    setAction(selectedAction)
  };

  const handleSelectedRows = (newSelection) => {
    const ids = Object.values(newSelection.state.selection);
    const productList = Object.values(newSelection.state.rows.idRowsLookup);

    const selectedList = [];

    ids.map((id) => {
      const prod = productList.find((p) => p.id === id);
      return selectedList.push(prod);
    });

    if (selectedList.length <= 0) setIsViewEnabled(true);

    if (selectedList.length === 1) setIsViewEnabled(false);

    if (selectedList.length > 1) setIsViewEnabled(false);

    setProductsList(selectedList);
  };

  useEffect(() => {
    api.get('/product').then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const Buttons = [
    {
      key: 0,
      text: 'ADD NEW',
      icon: AddIcon,
      color: 'primary',
      onclick: handleSelectedActions,
      disabled: !isViewEnabled,
    },
    {
      key: 1,
      text: 'View',
      icon: InfoIcon,
      color: 'default',
      onclick: handleSelectedActions,
      disabled: isViewEnabled,
    },
  ];

  return (
    <div className={styles.main}>
      {!loading ? (
        <>
          <div className={styles.actions}>
            <CustomButtomGroup buttons={Buttons} variant="contained" />
          </div>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              checkboxSelection
              onRowSelected={(newSelection) => {
                handleSelectedRows(newSelection.api.current);
              }}
            />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default DataGridProducts;
