/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { ImArrowUpRight2 } from 'react-icons/im';
import { AiOutlineFileText } from 'react-icons/ai';
import styles from './index.module.css';
import { RootState } from '../../store';
import { RequestState } from '../../slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';
import Button from '../ui/Button';
import { setPopupData } from '../../slices/popupSlice';

type Props = {
  requestId: string,
};

function ProcessDocument({ requestId }: Props) {
  const rootState = useSelector((state: RootState) => state);
  const intl = useIntl();
  const [status, setStatus] = useState<RequestState>('void');
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus(getProcessByRequestId(rootState, requestId).state);
  }, [rootState]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.leftColumn}>
          <div className={styles.row}>
            <div className={styles.icon}><AiOutlineFileText /></div>
            <div className={styles.documentType}>Unemployment Certificate</div>
          </div>
          <div className={styles.row}>
            <div className={styles.action}>{intl.formatMessage({ id: 'get_from_text' })}</div>
            <div className={styles.provider}>Arbetsförmedlingen</div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div>
            {status === 'received' && (
              <Button
                preset="small"
                type="secondary"
                onPress={() => {
                  dispatch(setPopupData({ component: 'FetchDetailPreview', props: { requestId } }));
                }}
                iconRight={<ImArrowUpRight2 />}
              >
                {intl.formatMessage({ id: 'get_data_button' })}
              </Button>
            )}
            {status === 'fetching' && (
              <Button
                preset="small"
                type="secondary"
                onPress={() => {
                  dispatch(setPopupData({ component: 'FetchDetailPreview', props: { requestId } }));
                }}
                iconRight={<ImArrowUpRight2 />}
              >
                {intl.formatMessage({ id: 'get_data_button' })}
              </Button>
            )}
            {status === 'available' && (
              <Button
                preset="small"
                type="secondary"
                onPress={() => {
                  dispatch(setPopupData({ component: 'ShareDetailPreview', props: { requestId } }));
                }}
                iconRight={<ImArrowUpRight2 />}
              >
                {intl.formatMessage({ id: 'view_and_share_data_button' })}
              </Button>
            )}
            {status === 'void' && (
              <Button
                preset="small"
                type="secondary"
                onPress={() => {}}
              >
                {intl.formatMessage({ id: 'nothing' })}
              </Button>
            )}
            {status === 'shared' && (
              <Button
                preset="small"
                type="secondary"
                onPress={() => {}}
                iconRight={<ImArrowUpRight2 />}
              >
                {intl.formatMessage({ id: 'manage_data_button' })}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessDocument;
