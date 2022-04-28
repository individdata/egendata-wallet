import React from 'react';
import Grid from '@mui/material/Grid';

import styles from './Checkbox.module.css';

function Checkbox() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
  };
  return (
    <Grid item xs={12} md={2}>
      <input
        type="checkbox"
        className={styles.checkboxItem}
        style={{ margin: 'auto' }}
        checked={checked}
        onChange={handleChange}
      />
    </Grid>

  );
}

export default Checkbox;
