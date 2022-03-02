import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './RequestContent.module.css';
import { tabsAction, flowAction } from '../../state/index';
import { State } from '../../state/reducers';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestContent(props: RequestType) {
  const { content } = props;
  const flowState = useSelector((state: State) => state.flow);
  const tabsState = useSelector((state: State) => state.tabs);
  const dispatch = useDispatch();
  const { consented } = bindActionCreators(flowAction, dispatch);
  const { consent } = bindActionCreators(tabsAction, dispatch);

  return (
    <div className={(flowState === 'open') ? styles.requestContent1 : styles.requestContent2}>
      <div style={{ display: 'inline' }}>
        <div className={styles.content}>
          {content}
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={() => { consented(flowState); consent(tabsState); }}
        >
          <div className={styles.buttontext}>
            consent
          </div>
        </button>
      </div>
    </div>
  );
}

export default RequestContent;
