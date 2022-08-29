import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RequestListItem from './RequestListItem';
import styles from './RequestList.module.css';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
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
    <div className={styles.container}>
      {nonSharedRequests.length !== 0 && (<div className={styles.title}>Your incomplete tasks</div>)}
      {nonSharedList}
      {sharedRequests.length !== 0 && (<div className={styles.title}>Completed tasks</div>)}
      {sharedList}
    </div>
  );
}

export default RequestList;
