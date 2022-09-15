import React from 'react';
import { Grid, List, ListSubheader, Typography } from '@mui/material';
import RequestListItem from './RequestListItem';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import useRequests from '../../hooks/useRequests';
import useConsents from '../../hooks/useConsents';

type RequestListProps = {
   onRequestSelect: (request: SubjectRequest) => void,
};

function RequestList({onRequestSelect}: RequestListProps) {
  const {requests, isRequestsLoading} = useRequests();
  const {consents, isConsentsLoading} = useConsents();

  console.log(requests, consents);

  if (isRequestsLoading || isConsentsLoading) return (
    <Typography sx={{ textAlign: 'center' }}>
      Loading data, please wait.
    </Typography>);

  let nonSharedRequests = [];
  let sharedRequests = [];

  for (let request of requests) {
    if (request.type === 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest') {
      if (consents.map((c) => c.providerRequest).includes(request.url)) {
        sharedRequests.push(request)
      }
      else {
        nonSharedRequests.push(request);
      }
    }
  }
  
  const nonSharedList = nonSharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request}`}
      request={request}
      onClick={onRequestSelect}
      dot
    />
  ));

  const sharedList = sharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request}`}
      request={request}
      onClick={onRequestSelect}
    />
  ));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        <List>
          {nonSharedRequests.length !== 0 && (<ListSubheader>Your incomplete tasks</ListSubheader>)}
          {nonSharedList}
          {sharedRequests.length !== 0 && (<ListSubheader>Completed tasks</ListSubheader>)}
          {sharedList}
        </List>
      </Grid>
    </Grid>
  );
}

export default RequestList;

