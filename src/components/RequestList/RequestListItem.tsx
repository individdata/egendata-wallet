import React from 'react';
import { Avatar, Grid, ListItem, ListItemButton, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useRequest from '@app/hooks/useRequest';
import useProfile from '@app/hooks/useProfile';
import useLogo from '@app/hooks/useLogo';
import { RequestInfo } from '@app/types';

type RequestListItemProps = {
  request: RequestInfo;
  onClick: (uuid: string) => void;
  unread?: boolean;
};

function RequestListItem({ request, unread = false }: RequestListItemProps) {
  const { request: requestWithDetails, isLoading: isRequestLoading, isError: isRequestError } = useRequest(request.id);
  const {
    profile: requestor,
    isLoading: isRequestorLoading,
    isError: isRequestorError,
  } = useProfile(isRequestLoading || isRequestError ? null : requestWithDetails.requestorWebId);
  const { logo, isLogoLoading } = useLogo(!isRequestorLoading && !isRequestorError ? requestor.logo : null);

  const router = useRouter();

  if (isRequestLoading || isRequestorLoading) {
    return (
      <ListItem key={request.id} data-testid="RequestItemSkeleton">
        <ListItemButton
          disabled
          sx={{
            borderRadius: '30px',
            flexGrow: 1,
          }}
        >
          <Avatar src="" data-testid="avatar"></Avatar>
          <Grid container spacing={2} maxHeight="60px" marginLeft={1} alignItems="center">
            <Grid item xs={3}>
              <Skeleton>
                <Typography
                  sx={{
                    ...(unread && { fontWeight: '600' }),
                  }}
                  data-testid="requestorName"
                >
                  Some company
                </Typography>
              </Skeleton>
            </Grid>
            <Grid item xs={6} md={7}>
              <Skeleton>
                <Typography
                  sx={{
                    ...(unread && { fontWeight: '600' }),
                  }}
                >
                  Some purpose with the request.
                </Typography>
              </Skeleton>
            </Grid>
            <Grid item xs={3} md={2}>
              <Skeleton>
                <Typography
                  align="right"
                  marginRight={1}
                  sx={{
                    ...(unread && { fontWeight: '600' }),
                  }}
                >
                  1970-01-01
                </Typography>
              </Skeleton>
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem key={request.id} data-testid="RequestItem">
      <ListItemButton
        onClick={() => router.push(`/request/${request.id}`)}
        sx={{
          borderRadius: '30px',
          flexGrow: 1,
        }}
      >
        <Avatar src={isLogoLoading ? '' : logo} data-testid="avatar"></Avatar>
        <Grid container spacing={2} maxHeight="60px" marginLeft={1} alignItems="center">
          <Grid item xs={3} data-testid="requestor">
            <Typography
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
              data-testid="requestorName"
            >
              {requestor.name}
            </Typography>
          </Grid>
          <Grid item xs={6} md={7} data-testid="purpose">
            <Typography
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
            >
              {requestWithDetails.purpose}
            </Typography>
          </Grid>
          <Grid item xs={3} md={2} data-testid="createdDate">
            <Typography
              align="right"
              marginRight={1}
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
            >
              {new Date(requestWithDetails.created).toISOString().substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}

export default RequestListItem;
