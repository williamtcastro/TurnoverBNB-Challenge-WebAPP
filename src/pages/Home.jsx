import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import PageComponent from '../components/page';
import DataGridProducts from '../components/dataGridProducts';
import ProductDetail from '../components/productDetail';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
}));

function Home() {
  const styles = useStyles();
  const [checked, setChecked] = useState(false);
  const [productAction, setProductAction] = useState();
  const [productsList, setProductsList] = useState([]);

  const setAction = (action) => {
    if (productsList.length !== 0 || productsList !== undefined) {
      setProductAction(action);
      setChecked(true);
    }
  };

  return (
    <PageComponent>
      <div className={styles.main}>
        <DataGridProducts
          setAction={setAction}
          setProductsList={setProductsList}
        />
      </div>

      <ProductDetail
        productAction={productAction}
        productsList={productsList}
        setProductsList={setProductsList}
        setChecked={setChecked}
        checked={checked}
      />
    </PageComponent>
  );
}

export default Home;
