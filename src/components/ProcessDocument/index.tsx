/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Box,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { RequestState } from '../../slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';
import { setPopupData } from '../../slices/popupSlice';
import { RootState } from '../../store';
import { ArrowUpRight, DocumentIcon } from '../../icons/icons';

type Props = {
  requestId: string,
};

function ProcessDocument({ requestId }: Props) {
  const rootState = useSelector((state: RootState) => state);
  const intl = useIntl();
  const [status, setStatus] = useState<RequestState>('void');
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus(getProcessByRequestId(rootState, requestId).state);
  }, [rootState]);

  return (
    <Box>
      <ThemeProvider theme={createTheme({
        palette: {
          text: {
            primary: '#FFFFFF',
            secondary: '#ACACAC',
          },
          background: {
            paper: '#191B1F',
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              color: 'success',
            },
            styleOverrides: {
              root: {
                borderRadius: '24px',
                height: '46px',
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                height: '32px',
                width: '32px',
              },
            },
          },
        },
      })}
      >

        <Paper elevation={0} sx={{ borderRadius: '16px' }}>
          <Box padding={3}>
            <Grid container>
              <Grid item xs={9} textAlign="left">
                <Stack direction="row" alignItems="center">
                  <DocumentIcon />
                  <Typography fontSize="large" paddingLeft={1}>Unemployment Certificate</Typography>
                </Stack>

                <Typography>
                  {intl.formatMessage({ id: 'get_from_text' })}
                  <Typography component="span" sx={{ color: '#65D36E' }}>Arbetsförmedlingen</Typography>
                </Typography>
              </Grid>
              <Grid item xs={3} alignSelf="center">
                {status === 'received' && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(setPopupData({ component: 'FetchDetailPreview', props: { requestId } }));
                    }}
                  >
                    {intl.formatMessage({ id: 'get_data_button' })}
                  </Button>
                )}
                {status === 'fetching' && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(setPopupData({ component: 'FetchDetailPreview', props: { requestId } }));
                    }}
                  >
                    {intl.formatMessage({ id: 'get_data_button' })}
                  </Button>
                )}
                {status === 'available' && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(setPopupData({ component: 'ShareDetailPreview', props: { requestId } }));
                    }}
                  >
                    {intl.formatMessage({ id: 'view_and_share_data_button' })}
                  </Button>
                )}
                {status === 'void' && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {}}
                  >
                    {intl.formatMessage({ id: 'nothing' })}
                  </Button>
                )}
                {status === 'shared' && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {}}
                  >
                    {intl.formatMessage({ id: 'manage_data_button' })}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default ProcessDocument;
