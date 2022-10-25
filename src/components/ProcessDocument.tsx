/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ArrowDown, ArrowUpRight, DocumentIcon } from '../icons/icons';
import useRequest from '../hooks/useRequest';

type Props = {
  requestId: string;
  onGetClick: () => void;
  onShowConsentClick: () => void;
};

function ProcessDocument({ requestId, onGetClick, onShowConsentClick }: Props) {
  const [showInfo, setShowInfo] = useState(false);
  const { request, isLoading, isError } = useRequest(requestId);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <Skeleton height="55px" />;
  }

  const { state } = request;

  return (
    <Box marginBottom={4}>
      <ThemeProvider
        theme={(theme: Theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              background: {
                paper: '#191B1F',
              },
            },
            components: {
              MuiButton: {
                ...theme.components?.MuiButton,
                defaultProps: {
                  color: 'success',
                },
                styleOverrides: {
                  root: {
                    '&.Mui-disabled': {
                      borderColor: 'deeppink',
                      color: 'deeppink',
                    },
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
          })
        }
      >
        <Typography variant="h5" component="h2" marginBottom={2}>
          {state === 'received' && (
            <>
              <Typography variant="h5" component="span">
                1.
              </Typography>
              <FormattedMessage
                id="gpDDd6"
                defaultMessage="Get your data"
                description="First step of processing request."
              />
            </>
          )}
          {state === 'fetching' && (
            <>
              <FormattedMessage
                id="wdTCcn"
                defaultMessage="Waiting for your data"
                description="First step of processing request."
              />
            </>
          )}
          {state === 'available' && (
            <>
              <Typography variant="h5" component="span">
                2.
              </Typography>
              <FormattedMessage
                id="pum/RZ"
                defaultMessage="View and share your document"
                description="Second step of processing request."
              />
            </>
          )}
          {state === 'sharing' && (
            <>
              <FormattedMessage
                id="20LWpl"
                defaultMessage="Your shared document"
                description="Second step of processing request."
              />
            </>
          )}
        </Typography>
        <Paper elevation={0} sx={{ borderRadius: '16px' }}>
          <Box padding={3}>
            <Grid container>
              <Grid item xs={6} textAlign="left">
                <Stack direction="row" alignItems="center">
                  <DocumentIcon />
                  <Typography fontSize="large" paddingLeft={1}>
                    <FormattedMessage
                      id="SI9BWw"
                      defaultMessage="Unemployment certificate"
                      description="Process document, name of document."
                    />
                  </Typography>
                </Stack>

                <Typography>
                  <FormattedMessage
                    id="ErkLAo"
                    defaultMessage="From"
                    description="Process document from text (document origin)."
                  />
                  :&nbsp;
                  <Typography component="span" sx={{ color: '#65D36E' }}>
                    Arbetsförmedlingen
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6} alignSelf="center" textAlign="right">
                {state === 'received' && (
                  <Button variant="outlined" size="large" endIcon={<ArrowDown />} onClick={onGetClick}>
                    <FormattedMessage
                      id="qrKUHl"
                      defaultMessage="Get data"
                      description="Process document get data button."
                    />
                  </Button>
                )}

                {state === 'fetching' && (
                  <Button variant="outlined" size="large" onClick={() => setShowInfo(true)}>
                    <FormattedMessage
                      id="7TkBpL"
                      defaultMessage="Waiting"
                      description="Process document get data button."
                    />
                  </Button>
                )}

                {state === 'available' && (
                  <Button variant="outlined" size="large" endIcon={<ArrowUpRight />} onClick={onShowConsentClick}>
                    <FormattedMessage
                      id="s2YZRa"
                      defaultMessage="View and share data"
                      description="Process document view and share data button."
                    />
                  </Button>
                )}

                {state === 'shared' && (
                  <Button
                    variant="outlined"
                    disabled
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => console.log('Already sharing.')}
                  >
                    <FormattedMessage
                      id="8quOpv"
                      defaultMessage="Manage data"
                      description="Process document manage data button."
                    />
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Dialog open={showInfo} onClose={() => setShowInfo(false)}>
          <DialogContent>
            <FormattedMessage
              id="Hzensj"
              defaultMessage="Your fetching is in progress but might take a while."
              description="Modal for waiting for fetching."
            />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
}

export default ProcessDocument;
