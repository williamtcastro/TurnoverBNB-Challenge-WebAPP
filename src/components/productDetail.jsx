import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

import api from '../services/api';
import CustomButtomGroup from './customButtonGroup';
import CustomProductForm from './customProductForm';
import SlidePopup from './slidePopup';

const useStyles = makeStyles(() => ({
  actions: {
    display: 'flex',
    justifyContent: 'center',
    padding: '.5rem 0 3rem 0',
  },
}));

function ProductDetail({
  checked,
  setChecked,
  productAction,
  productsList,
  setProductsList,
}) {
  const styles = useStyles();

  const addEmptyProduct = (flag) => {
    if (flag) {
      productsList.push({
        name: '',
        price: 0,
        quantity: 0,
      });
      setProductsList([...productsList]);
    } else if (productsList.length !== 1) {
      productsList.pop();
      setProductsList([...productsList]);
    }
  };

  useEffect(() => {
    if (productAction !== undefined || productAction !== '') {
      switch (productAction) {
        case 0:
          addEmptyProduct(true);
          setChecked(true);
          break;

        case 1:
          setChecked(true);
          break;

        default:
          break;
      }
    }
  }, [productAction]);

  const updateProducts = () => {
    Swal.fire({
      title: 'Request Sent',
      text: 'Please wait',
      icon: 'info',
    });
    if (productsList.length === 1) {
      api.put(`/product/${productsList[0].id}`, productsList[0]).then(() => {
        window.location.reload();
      });
    } else {
      api.put('/product/bulk', productsList).then(() => {
        window.location.reload();
      });
    }
  };

  const deleteProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All selected items will be deleted',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed)
        if (productsList.length === 1) {
          Swal.fire({
            title: 'Request Sent',
            text: 'Please wait',
            icon: 'info',
          });
          api
            .delete(`/product/${productsList[0].id}`, productsList[0])
            .then(() => {
              window.location.reload();
            });
        } else {
          Swal.fire({
            title: 'Request Sent',
            text: 'Please wait',
            icon: 'info',
          });
          const idsList = [];

          productsList.map((prod) => idsList.push(prod.id));

          api
            .delete('/product/bulk', {
              data: idsList,
            })
            .then(() => {
              window.location.reload();
            });
        }
    });
  };

  const createProducts = () => {
    if (productsList.length === 1) {
      Swal.fire({
        title: 'Request Sent',
        text: 'Please wait',
        icon: 'info',
      });
      if (productsList[0].name !== '')
        api.post(`/product/`, productsList[0]).then(() => {
          window.location.reload();
        });
      else {
        Swal.fire({
          title: 'Request Failed',
          text: 'One or more fields required',
          icon: 'warning',
        });
      }
    } else {
      let flag;
      productsList.forEach((prod) => {
        if (prod.name !== '') flag = true;
        else flag = false;
      });

      if (flag)
        api.post(`/product/bulk`, productsList).then(() => {
          window.location.reload();
        });
      else
        Swal.fire({
          title: 'Request Failed',
          text: 'One or more fields required',
          icon: 'warning',
        });
    }
  };

  const handleSelectAction = (action) => {
    switch (action) {
      case 0:
        updateProducts();
        break;

      case 1:
        deleteProduct();
        break;

      case 2:
        createProducts();
        break;

      case 3:
        addEmptyProduct(true);
        break;

      case 4:
        addEmptyProduct(false);
        break;

      default:
        break;
    }
  };

  const Buttons = [
    {
      key: 0,
      text: 'SAVE',
      icon: CheckIcon,
      color: 'primary',
      onclick: handleSelectAction,
    },
    {
      key: 1,
      text: 'DELETE',
      icon: DeleteIcon,
      color: 'secondary',
      onclick: handleSelectAction,
    },
  ];

  const ButtonAdd = [
    {
      key: 2,
      text: 'CREATE',
      icon: SaveIcon,
      color: 'primary',
      onclick: handleSelectAction,
    },
    {
      key: 3,
      text: 'ADD ITEM',
      icon: AddIcon,
      color: 'default',
      onclick: handleSelectAction,
    },
    {
      key: 4,
      text: 'REMOVE ITEM',
      icon: RemoveIcon,
      color: 'default',
      onclick: handleSelectAction,
    },
  ];

  const closeSlide = () => {
    setChecked((prev) => !prev);
  };

  return (
    <SlidePopup
      closeSlide={closeSlide}
      state={checked}
      closeFunction={closeSlide}
      title={productsList.length === 1 ? 'Product Details' : 'Products Details'}
    >
      {productsList.map((selectedProduct) => (
        <CustomProductForm
          key={selectedProduct.id}
          action={productAction}
          selectedProduct={selectedProduct}
          setSelectedProduct={setProductsList}
          selectedProductList={productsList}
        />
      ))}

      {productAction === 0 ? (
        <div className={styles.actions}>
          <CustomButtomGroup buttons={ButtonAdd} variant="contained" />
        </div>
      ) : (
        <div className={styles.actions}>
          <CustomButtomGroup buttons={Buttons} variant="contained" />
        </div>
      )}
    </SlidePopup>
  );
}

export default ProductDetail;
