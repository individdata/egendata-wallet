import React from 'react';
import RequestItemBlueBtn from '../RequestItemBlueBtn';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestItem(props: RequestType) {
  const {
    name, brief, date, content,
  } = props;

  return (
    <RequestItemBlueBtn name={name} content={content} brief={brief} date={date} />
  );
}

export default RequestItem;
