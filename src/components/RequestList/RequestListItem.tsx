import React from 'react';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import { getSolidDataset, getThing, Thing } from '@inrupt/solid-client';
import useRequest from '../../hooks/useRequest';
import useRequestorInfo from '../../hooks/useRequestorInfo';

type RequestListItemProps = {
  uuid: string,
  onClick: (uuid: string) => void,
};

function RequestListItem({ uuid, onClick }: RequestListItemProps) {
  const { request, isLoading: isRequestLoading } = useRequest(uuid);
  const { requestor, isLoading: isRequestorLoading} = useRequestorInfo(() => request.request.requestorWebId);

  if (isRequestLoading) {
    return (
      <ListItem sx={{borderRadius: '30px', flexGrow: 1}}>
        <Typography>
          Loading request...
        </Typography>
      </ListItem>
    )
  }

  const unread = request.state === 'received';

  return (
    <ListItem>
      <ListItemButton
        onClick={() => onClick(uuid)}
        sx={{
          p: 1,
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
              {request.request.purpose}
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography align="right" marginRight={1} sx={{
              ...(unread && {fontWeight: '600'})
            }}>
              {request.request.created.substring(0, 10)}
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
