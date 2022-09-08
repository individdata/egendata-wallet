import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, List, ListSubheader } from '@mui/material';
import { RootState } from '../../store';
import RequestListItem from './RequestListItem';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';

type Props = {
  onRequestSelect: (request: SubjectRequest) => void,
};

function RequestList({ onRequestSelect }: Props) {
  const requests = useSelector((state: RootState) => state.subjectRequests.items);
  const rootState = useSelector((state: RootState) => state);

  const lists = Object.keys(requests).reduce((acc: any, requestKey) => { // TODO: Define acc type
    const request = requests[requestKey];
    const requestState = getProcessByRequestId(rootState, requestKey).state;

    if (!request || !requestState) {
      return acc;
    }

    if (!acc[requestState]) {
      acc[requestState] = [];
    }

    acc[requestState].push(request);
    return acc;
  }, {});

  const sharedRequests = lists.shared || [];
  const nonSharedRequests = [
    ...(lists.available || []),
    ...(lists.received || []),
    ...(lists.fetching || []),
  ];

  const sharedList = sharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request.id}`}
      request={request}
      onClick={onRequestSelect}
    />
  ));

  const nonSharedList = nonSharedRequests.map((request: SubjectRequest) => (
    <RequestListItem
      key={`RequestListItem-${request.id}`}
      request={request}
      onClick={onRequestSelect}
      dot
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
