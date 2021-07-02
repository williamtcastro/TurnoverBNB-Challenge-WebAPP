import React from 'react';

import {
  makeStyles,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles(() => ({
  collapseBtn: {
    marginTop: '.5rem',
    backgroundColor: '#fafafa',
    borderRadius: '5px',
  },
  nested: {
    width: '100%',
  },
  listItem: {
    borderBottom: '1px #f1f1f1 solid',
  },
}));

function CustomCollapseList({ toogleList, state, items }) {
  const styles = useStyles();

  const setDate = (date) => {
    const d = new Date(date);
    return `${d.getUTCMonth()}/${d.getUTCDay()}/${d.getUTCFullYear()} at ${d.getUTCHours()}:${d.getUTCMinutes()}`;
  };

  return (
    <>
      <ListItem button onClick={toogleList} className={styles.collapseBtn}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Quantity History" />
        {state ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={state}
        timeout="auto"
        unmountOnExit
        className={styles.nested}
      >
        <List component="div" disablePadding>
          {items.length === 0 ? (
            <ListItem className={styles.listItem}>
              <ListItemText primary="No History" />
            </ListItem>
          ) : (
            items.map((item) => (
              <ListItem className={styles.listItem}>
                <ListItemText primary={item.quantity} style={{ width: '60%'}}/>
                <ListItemText secondary={setDate(item.created_at)} />
              </ListItem>
            ))
          )}
        </List>
      </Collapse>
    </>
  );
}

export default CustomCollapseList;
