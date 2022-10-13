import React from 'react';
import { Grid, List, ListSubheader, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import RequestListItem from './RequestListItem';
import useRequests from '../../hooks/useRequests';

type RequestListProps = {
  onRequestSelect: (request: any) => void;
};

function RequestList({ onRequestSelect }: RequestListProps) {
  const { requests, isLoading } = useRequests();

  if (isLoading)
    return (
      <Typography sx={{ textAlign: 'center' }}>
        <FormattedMessage id="TZmGLi" defaultMessage="Loading data..." description="Request listing loading data." />
      </Typography>
    );

  const unsharedRequests = requests?.filter((r) => !r.isShared);
  const nonSharedList = unsharedRequests?.map((request) => (
    <RequestListItem key={`RequestListItem-${request.id}`} request={request} onClick={onRequestSelect} unread />
  ));

  const sharedRequests = requests?.filter((r) => r.isShared);
  const sharedList = sharedRequests?.map((request) => (
    <RequestListItem key={`RequestListItem-${request.id}`} request={request} onClick={onRequestSelect} />
  ));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        {unsharedRequests?.length === 0 && sharedRequests?.length === 0 && (
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
            <FormattedMessage id="LPU/Zd" defaultMessage="No tasks available." description="Requests listing empty." />
          </Typography>
        )}
        <List>
          {unsharedRequests?.length !== 0 && (
            <ListSubheader>
              <FormattedMessage
                id="Lgsy+X"
                defaultMessage="Your incomplete tasks"
                description="Requests listing subtitle for incomplete tasks."
              />
            </ListSubheader>
          )}
          {nonSharedList}
          {sharedRequests?.length !== 0 && (
            <ListSubheader>
              <FormattedMessage
                id="EgF3o6"
                defaultMessage="Completed tasks"
                description="Request listing subtitle for completed tasks."
              />
            </ListSubheader>
          )}
          {sharedList}
        </List>
      </Grid>
    </Grid>
  );
}

export default RequestList;
