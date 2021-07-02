import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    display: 'flex',
    flex: '1',
    backgroundColor: '#fafafa',
  },
  container: {
    display: 'flex',
    flex: '1'
  },
  aside: {
    padding: '1rem',
    maxWidth: '15%',
    display: 'flex',
    flex: '1',
  },
}));

function PageComponent({ children }) {
  const styles = useStyles();

  return (
    <div className={styles.root} id="sidebar">
      {/* <aside className={styles.aside}>jreef</aside> */}
      <main className={styles.main}>
        <Container maxWidth="md" className={styles.container}>{children}</Container>
      </main>
    </div>
  );
}

export default PageComponent;
