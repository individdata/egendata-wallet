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
import useRequestorInfo from '../../hooks/useRequestorInfo';

type RequestListItemProps = {
  request: SubjectRequest,
  onClick: (request: string) => void,
  unread?: boolean,
};

function RequestListItem({ request, onClick, unread }: RequestListItemProps) {
  const {requestor, isLoading} = useRequestorInfo(request.requestorWebId);

  return (
    <ListItem>
      <ListItemButton
        onClick={() => onClick(request)}
        sx={{
          p: 1,
          borderRadius: '30px',
          flexGrow: 1,
        }}
      >
        <Avatar
          alt={ isLoading ? '' : requestor?.name } 
          src={ isLoading ? '' : requestor?.logo as string }
        >?</Avatar>
        <Grid container spacing={2} maxHeight="60px" marginLeft={1} alignItems="center">
          <Grid item xs={3}>
            <Typography sx={{
              ...(unread && {fontWeight: '600'})
            }}>
              { isLoading ? '...' : requestor?.name }
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
