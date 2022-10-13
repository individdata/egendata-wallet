import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Container,
  createTheme,
  Grid,
  Icon,
  Paper,
  Skeleton,
  Theme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Arrow, CheckIcon, StepOneIcon, StepOneActiveIcon, StepTwoIcon, StepTwoActiveIcon } from '../icons/stepper';
import useRequest from '../hooks/useRequest';

type Props = { requestId: string; landing: never } | { requestId: ''; landing: boolean };

function Stepper({ requestId = '', landing = false }: Props) {
  const { request, isLoading } = useRequest(requestId);

  if (!landing && isLoading) {
    return <Skeleton height="130px" />;
  }

  let stepOne = <StepOneIcon />;
  let stepTwo = <StepTwoIcon />;
  let arrowActive = true;

  if (!landing) {
    const { state } = request;
    if (state === 'received') {
      stepOne = <StepOneActiveIcon />;
    } else {
      stepOne = <CheckIcon />;
    }

    arrowActive = ['fetching', 'available', 'sharing'].includes(state);

    if (state === 'available') {
      stepTwo = <StepTwoActiveIcon />;
    } else if (state === 'sharing') {
      stepTwo = <CheckIcon />;
    }
  }

  return (
    <Box sx={{ width: '100%' }} marginBottom={4}>
      <ThemeProvider
        theme={(theme: Theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              background: {
                paper: '#2D43A5',
              },
            },
            components: {
              MuiSvgIcon: {
                styleOverrides: {
                  root: {
                    height: '32px',
                    width: '32px',
                  },
                },
              },
            },
          })
        }
      >
        <Paper elevation={0} sx={{ borderRadius: '16px' }}>
          <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
            {landing && (
              <Typography variant="h6" fontSize={20} marginBottom={-1}>
                Egendata
              </Typography>
            )}

            <Grid container spacing={0}>
              <Grid item sx={{ flexGrow: 1 }} />
              <Grid item>{stepOne}</Grid>
              <Grid item sx={{ flexBasis: 0, flexGrow: 2, alignSelf: 'center' }}>
                <Box textAlign="center">
                  <Arrow {...(arrowActive ? { color: '#65D36E' } : {})} />
                </Box>
              </Grid>
              <Grid item>{stepTwo}</Grid>
              <Grid item sx={{ flexGrow: 1 }} />
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography align="center" fontWeight="600">
                  <FormattedMessage
                    id="o1FDX1"
                    defaultMessage="Get your data"
                    description="Stepper first step title."
                  />
                </Typography>
                {!landing && (
                  <Typography align="center" fontSize="small">
                    <FormattedMessage
                      id="XvkbpE"
                      defaultMessage="Consent and fetch your {document}"
                      description="Stepper first step description."
                      values={{
                        document: 'Unemployment certificate',
                      }}
                    />
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" fontWeight="600">
                  <FormattedMessage
                    id="kmUDMm"
                    defaultMessage="Share your data"
                    description="Stepper second step title."
                  />
                </Typography>
                {!landing && (
                  <Typography align="center" fontSize="small">
                    <FormattedMessage
                      id="yV4Xg2"
                      defaultMessage="Review your data and share it with {party}"
                      description="Stepper second step description."
                      values={{
                        party: 'BNP Paribas',
                      }}
                    />
                  </Typography>
                )}{' '}
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

Stepper.defaultProps = { landing: false };

export default Stepper;
