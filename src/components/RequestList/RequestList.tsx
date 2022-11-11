import React, { useState } from 'react';
import { Button, Grid, List, ListItemButton, ListSubheader, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import RequestListItem from './RequestListItem';
import useRequests from '../../hooks/useRequests';

type RequestListProps = {
  onRequestSelect: (request: any) => void;
};

function RequestListPage({ onRequestSelect, index }: { onRequestSelect: (request: any) => void; index: number }) {
  const { requests, isLoading, isError } = useRequests(index);

  if (isError)
    return (
      <Typography sx={{ textAlign: 'center' }} data-testid="errorMessage">
        <FormattedMessage
          id="SSlkv5"
          defaultMessage="Could not retrieve data..."
          description="Request listing error when loading data."
        />
      </Typography>
    );

  if (isLoading)
    return (
      <Typography sx={{ textAlign: 'center' }} data-testid="loadingMessage">
        <FormattedMessage id="TZmGLi" defaultMessage="Loading data..." description="Request listing loading data." />
      </Typography>
    );

  const renderedRequests = requests?.map((request) => (
    <RequestListItem key={`RequestListItem-${request.id}`} request={request} onClick={onRequestSelect} unread />
  ));

  return <>{renderedRequests}</>;
}

function RequestList({ onRequestSelect }: RequestListProps) {
  const [count, setCount] = useState(0);

  // const unsharedRequests = requests?.filter((r) => !r.isShared);
  // const nonSharedList = unsharedRequests?.map((request) => (
  //   <RequestListItem key={`RequestListItem-${request.id}`} request={request} onClick={onRequestSelect} unread />
  // ));

  // const sharedRequests = requests?.filter((r) => r.isShared);
  // const sharedList = sharedRequests?.map((request) => (
  //   <RequestListItem key={`RequestListItem-${request.id}`} request={request} onClick={onRequestSelect} />
  // ));

  const pages = [];
  for (let i = 0; i < count; i++) {
    pages.push(<RequestListPage onRequestSelect={onRequestSelect} index={i} />);
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        {/* {unsharedRequests?.length === 0 && sharedRequests?.length === 0 && (
        <List>
          {unsharedRequests?.length !== 0 && (
            <ListSubheader data-testid="incompleteSubheader">
              <FormattedMessage
                id="Lgsy+X"
                defaultMessage="Your incomplete tasks"
                description="Requests listing subtitle for incomplete tasks."
              />
            </ListSubheader>
          )}
          {nonSharedList}
          {sharedRequests?.length !== 0 && (
            <ListSubheader data-testid="completeSubheader">
              <FormattedMessage
                id="EgF3o6"
                defaultMessage="Completed tasks"
                description="Request listing subtitle for completed tasks."
              />
            </ListSubheader>
          )}
          {sharedList}
        </List> */}
        <List>
          {pages}
          <Typography align="center">
            <Button onClick={() => setCount(count + 1)}>Show older requests</Button>
          </Typography>
        </List>
      </Grid>
    </Grid>
  );
}

export default RequestList;
