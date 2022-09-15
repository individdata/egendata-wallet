import React from 'react';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import useRequest from '../../hooks/useRequest';

type RequestListItemProps = {
  request: SubjectRequest,
  onClick: (request: string) => void,
  dot?: boolean,
};

function RequestListItem({ request, onClick, dot }: RequestListItemProps) {
  console.log(request)

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
        <Avatar alt="BNP Paribas" src="https://idp-test.egendata.se/bnp/logo.svg" />
        <Grid container spacing={2} maxHeight="60px" marginLeft={1}>
          <Grid item xs={3}>
            <Typography>
              { request.requestorWebId }
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{
              ...(dot && {
                position: 'relative',
                ':before': {
                  position: 'absolute',
                  right: '100%',
                  paddingRight: '0.2em',
                  color: '#FFEA79',
                  content: '"●"',
                },
              }),
            }}
            >
              {request.purpose}
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography align="right" marginRight={1}>
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
