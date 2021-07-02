import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
  main: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    boxShadow: '7px 0px 10px -3px rgba(174,174,174,0.75)',
    '@media (max-width:500px)': {
      width: '100%',
    },
  },
  btnOut: {
    position: 'relative',
    top: 0,
    right: 0,
    padding: '1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
  },
  collapseBtn: {
    marginTop: '1rem',
    backgroundColor: '#fafafa',
    borderRadius: '5px',
  },
  nested: {
    width: '100%',
    borderBottom: '1px #f1f1f1 solid',
  },
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: '.5rem',
    fontSize: '1.5rem',
  },
}));

function SlidePopup({ children, state, closeFunction, title }) {
  const styles = useStyles();

  return (
    <Slide direction="right" in={state} mountOnEnter unmountOnExit>
      <div className={styles.main}>
        <div className={styles.btnOut}>
          <div className={styles.title}>
            {title}
          </div>
          <div>
            <CancelIcon
              style={{ fontSize: 30, color: '#d2d2d2' }}
              onClick={closeFunction}
            />
          </div>
        </div>
        {state ? (
          <Container className={styles.container}>{children}</Container>
        ) : (
          <></>
        )}
      </div>
    </Slide>
  );
}

export default SlidePopup;
