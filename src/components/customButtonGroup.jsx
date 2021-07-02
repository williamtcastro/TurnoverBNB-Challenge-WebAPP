import React from 'react';

import { ButtonGroup, Button } from '@material-ui/core';

function CustomButtomGroup({ buttons, variant }) {
  return (
    <ButtonGroup variant={variant} disableElevation>
      {buttons.map((btn) => (
        <Button
          key={btn.key}
          color={btn.color}
          startIcon={<btn.icon />}
          onClick={() => btn.onclick(btn.key)}
          disabled={btn.disabled === undefined ? false : btn.disabled}
        >
          {btn.text}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default CustomButtomGroup;
