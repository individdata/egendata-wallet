import React from 'react';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import { getSolidDataset, getThing, Thing } from '@inrupt/solid-client';
import useRequest from '../../hooks/useRequest';
import useRequestorInfo from '../../hooks/useRequestorInfo';
import { useRouter } from 'next/router';

type RequestListItemProps = {
  uuid: string,
  onClick: (uuid: string) => void,
};

function RequestListItem({ uuid }: RequestListItemProps) {
  const { request, isLoading: isRequestLoading } = useRequest(uuid);
  const { requestor, isLoading: isRequestorLoading} = useRequestorInfo(() => request.requestorWebId);

  const router = useRouter();

  if (isRequestLoading) {
    return (
      <Skeleton variant="rounded" />
    )
  }

  console.log(request)

  const unread = false;

  return (
    <ListItem key={uuid}>
      <ListItemButton
        onClick={() => router.push(`/request/${uuid}`)}
        sx={{
          borderRadius: '30px',
          flexGrow: 1,
        }}
      >
        <Avatar
          alt={ isRequestorLoading ? '' : requestor?.name } 
          src={ isRequestorLoading ? '' : requestor?.logo as string }
        >?</Avatar>
        <Grid container spacing={2} maxHeight="60px" marginLeft={1} alignItems="center">
          <Grid item xs={3}>
            <Typography sx={{
              ...(unread && {fontWeight: '600'})
            }}>
              { isRequestorLoading ? '...' : requestor?.name }
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{
              ...(unread && {fontWeight: '600'})
            }}>
              {request.purpose}
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography align="right" marginRight={1} sx={{
              ...(unread && {fontWeight: '600'})
            }}>
              {request.created.substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}

RequestListItem.defaultProps = {
  dot: false,
};

export default RequestListItem;
