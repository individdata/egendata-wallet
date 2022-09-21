import React from 'react';
import { Grid, List, ListSubheader, Typography } from '@mui/material';
import RequestListItem from './RequestListItem';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import useRequestsIds from '../../hooks/useRequestsIds';
import useConsents from '../../hooks/useConsents';

type RequestListProps = {
   onRequestSelect: (request: SubjectRequest) => void,
};

function RequestList({onRequestSelect}: RequestListProps) {
  const {sharedRequests, unsharedRequests, isRequestsLoading} = useRequestsIds();

  if (isRequestsLoading) return (
    <Typography sx={{ textAlign: 'center' }}>
      Loading data, please wait.
    </Typography>);
  
  const nonSharedList = unsharedRequests.map((uuid: string) => (
    <RequestListItem
      key={`RequestListItem-${uuid}`}
      uuid={uuid}
      onClick={onRequestSelect}
      unread
    />
  ));

  const sharedList = sharedRequests.map((uuid: string) => (
    <RequestListItem
      key={`RequestListItem-${uuid}`}
      uuid={uuid}
      onClick={onRequestSelect}
    />
  ));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        <List>
          {unsharedRequests.length !== 0 && (<ListSubheader>Your incomplete tasks</ListSubheader>)}
          {nonSharedList}
          {sharedRequests.length !== 0 && (<ListSubheader>Completed tasks</ListSubheader>)}
          {sharedList}
        </List>
      </Grid>
    </Grid>
  );
}

export default RequestList;

