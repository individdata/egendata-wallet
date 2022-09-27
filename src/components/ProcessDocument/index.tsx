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
  Skeleton,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPopupData } from "../../store/slices/popupSlice";
import { ArrowUpRight, DocumentIcon } from "../../icons/icons";
import { FormattedMessage } from "react-intl";
import useRequestorInfo from "../../hooks/useRequestorInfo";
import useRequestDetails from "../../hooks/useRequestDetails";

type Props = {
  requestId: string;
};

function ProcessDocument({ requestId }: Props) {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { request, isLoading } = useRequestDetails(requestId);
  // TODO: Fetch some details about the request?
  // const { requestor, isLoading: isRequestorLoading } = useRequestorInfo( () => request.requestorWebId );

  if (isLoading) {
    return (
      <Skeleton>
        <Paper elevation={0} sx={{ borderRadius: "16px" }}>
          <Typography variant="h3">
            <FormattedMessage
              id="Iuny4B"
              defaultMessage="Loading data..."
              description="Process document waiting for data."
            />
          </Typography>
        </Paper>
      </Skeleton>
    );
  }

  const status = request?.state;

  return (
    <Box>
      <ThemeProvider
        theme={createTheme({
          palette: {
            text: {
              primary: "#FFFFFF",
              secondary: "#ACACAC",
            },
            background: {
              paper: "#191B1F",
            },
          },
          components: {
            MuiButton: {
              defaultProps: {
                color: "success",
              },
              styleOverrides: {
                root: {
                  borderRadius: "24px",
                  height: "46px",
                },
              },
            },
            MuiSvgIcon: {
              styleOverrides: {
                root: {
                  height: "32px",
                  width: "32px",
                },
              },
            },
          },
        })}
      >
        <Paper elevation={0} sx={{ borderRadius: "16px" }}>
          <Box padding={3}>
            <Grid container>
              <Grid item xs={9} textAlign="left">
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
                  <Typography component="span" sx={{ color: "#65D36E" }}>
                    Arbetsförmedlingen
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={3} alignSelf="center">
                {status === "received" && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(
                        setPopupData({
                          component: "FetchDetailPreview",
                          props: { requestId },
                        })
                      );
                    }}
                  >
                    <FormattedMessage
                      id="qrKUHl"
                      defaultMessage="Get data"
                      description="Process document get data button."
                    />
                  </Button>
                )}
                {status === "fetching" && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(
                        setPopupData({
                          component: "FetchDetailPreview",
                          props: { requestId },
                        })
                      );
                    }}
                  >
                    <FormattedMessage
                      id="qrKUHl"
                      defaultMessage="Get data"
                      description="Process document get data button."
                    />
                  </Button>
                )}
                {status === "available" && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {
                      dispatch(
                        setPopupData({
                          component: "ShareDetailPreview",
                          props: { requestId },
                        })
                      );
                    }}
                  >
                    <FormattedMessage
                      id="s2YZRa"
                      defaultMessage="View and share data"
                      description="Process document view and share data button."
                    />
                  </Button>
                )}
                {status === "shared" && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowUpRight />}
                    onClick={() => {}}
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
      </ThemeProvider>
    </Box>
  );
}

export default ProcessDocument;
