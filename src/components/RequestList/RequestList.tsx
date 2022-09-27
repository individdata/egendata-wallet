import React from "react";
import { Grid, List, ListSubheader, Typography } from "@mui/material";
import RequestListItem from "./RequestListItem";
import { SubjectRequest } from "../../store/slices/requests/subjectRequestsSlice";
import useRequestsIds from "../../hooks/useRequestsIds";
import useConsents from "../../hooks/useConsents";
import { FormattedMessage } from "react-intl";

type RequestListProps = {
  onRequestSelect: (uuid: string) => void;
};

function RequestList({ onRequestSelect }: RequestListProps) {
  const { sharedRequests, unsharedRequests, isRequestsLoading } =
    useRequestsIds();

  if (isRequestsLoading)
    return (
      <Typography sx={{ textAlign: "center" }}>
        <FormattedMessage
          id="TZmGLi"
          defaultMessage="Loading data..."
          description="Request listing loading data."
        />
      </Typography>
    );

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
        {unsharedRequests.length === 0 && sharedRequests.length === 0 && (
          <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
            <FormattedMessage
              id="LPU/Zd"
              defaultMessage="No tasks available."
              description="Requests listing empty."
            />
          </Typography>
        )}
        <List>
          {unsharedRequests.length !== 0 && (
            <ListSubheader>
              <FormattedMessage
                id="Lgsy+X"
                defaultMessage="Your incomplete tasks"
                description="Requests listing subtitle for incomplete tasks."
              />
            </ListSubheader>
          )}
          {nonSharedList}
          {sharedRequests.length !== 0 && (
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
