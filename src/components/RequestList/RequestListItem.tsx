import React from 'react';
import { Avatar, Grid, ListItem, ListItemButton, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useProfile from '../../hooks/useProfile';
import { GetResponseItem } from '../../pages/api/request';
import useLogo from '../../hooks/useLogo';

type RequestListItemProps = {
  request: GetResponseItem;
  onClick: (uuid: string) => void;
  unread?: boolean;
};

function RequestListItem({ request, unread = false }: RequestListItemProps) {
  const {
    profile: requestor,
    isLoading: isRequestorLoading,
    isError: isRequestorError,
  } = useProfile(request.requestorWebId);
  const { logo, isLogoLoading } = useLogo(!isRequestorLoading && !isRequestorError ? requestor.logo : null);

  const router = useRouter();

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
          <Grid item xs={3}>
            <Typography
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
              data-testid="requestorName"
            >
              {isRequestorLoading ? <Skeleton /> : isRequestorError ? '' : requestor.name}
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
            >
              {request.purpose}
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography
              align="right"
              marginRight={1}
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
            >
              {new Date(request.created).toISOString().substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}

export default RequestListItem;
