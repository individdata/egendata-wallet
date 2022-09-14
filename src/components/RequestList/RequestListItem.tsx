import React from 'react';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';

type Props = {
  request: SubjectRequest,
  onClick: (request: SubjectRequest) => void,
  dot?: boolean,
};

function RequestListItem({ request, onClick, dot }: Props) {
  const date = request.created.substring(0, 10);

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
        <Avatar alt={`${request.requestorName}`} src={`${request.requestorLogo}`} />
        <Grid container spacing={2} maxHeight="60px" marginLeft={1}>
          <Grid item xs={3}>
            <Typography>
              {request.requestorName}
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
              {date}
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
