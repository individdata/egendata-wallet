import React from 'react';
import { Avatar, Grid, ListItem, ListItemButton, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useRequestorInfo from '../../hooks/useRequestorInfo';
import { GetResponseItem } from '../../pages/api/request';

type RequestListItemProps = {
  request: GetResponseItem;
  onClick: (uuid: string) => void;
  unread?: boolean;
};

function RequestListItem({ request, unread = false }: RequestListItemProps) {
  const { requestor, isLoading: isRequestorLoading } = useRequestorInfo(() => request.requestorWebId);
  const router = useRouter();
  console.log('RequestListItme, request:', request);

  return (
    <ListItem key={request.id}>
      <ListItemButton
        onClick={() => router.push(`/request/${request.id}`)}
        sx={{
          borderRadius: '30px',
          flexGrow: 1,
        }}
      >
        <Avatar src={isRequestorLoading ? '' : (requestor?.logo as string)}>?</Avatar>
        <Grid container spacing={2} maxHeight="60px" marginLeft={1} alignItems="center">
          <Grid item xs={3}>
            <Typography
              sx={{
                ...(unread && { fontWeight: '600' }),
              }}
            >
              {isRequestorLoading ? '...' : requestor?.name}
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
