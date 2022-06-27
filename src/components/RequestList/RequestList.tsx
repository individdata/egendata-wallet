import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import RequestListItem from './RequestListItem';
import styles from './RequestList.module.css';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';

type Props = {
  onRequestSelect: (request: SubjectRequest) => void,
};

function RequestList({ onRequestSelect }: Props) {
  const requests = useSelector((state: RootState) => state.subjectRequests.items);

  const renderedList = Object.keys(requests).map((key) => (
    <RequestListItem
      key={`RequestListItem-${key}`}
      request={requests[key]}
      onClick={onRequestSelect}
    />
  ));

  return (
    <div className={styles.container}>
      {renderedList}
    </div>
  );
}

export default RequestList;
