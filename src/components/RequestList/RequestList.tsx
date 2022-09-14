import React from 'react';
import { Grid, List, ListSubheader, Typography } from '@mui/material';
import RequestListItem from './RequestListItem';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import useSWR from 'swr';

type RequestListProps = {
   onRequestSelect: (request: SubjectRequest) => void,
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

function useRequests() {
  const {data, error} = useSWR(`/api/requests`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

function RequestList({onRequestSelect}: RequestListProps) {
  const {data, isLoading, isError} = useRequests();

  if (isLoading) return (
    <Typography sx={{ textAlign: 'center' }}>
      Loading data, please wait.
    </Typography>);

  const nonSharedRequests = data.requests;
  const sharedRequests = data.requests;
  
  const nonSharedList = nonSharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request.id}`}
      request={request}
      onClick={onRequestSelect}
      dot
    />
  ));

  const sharedList = sharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request.id}`}
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

