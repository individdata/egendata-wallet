import React, { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../src/theme';

const withTheme = (content: ReactElement): ReactElement => {
  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
};

export default withTheme;
