import FlowActionType from '../action-types/flow';

interface UnopenAction {
  type: FlowActionType.UNOPEN
}

interface OpenAction {
  type: FlowActionType.OPEN
}

interface ConsentedAction {
  type: FlowActionType.CONSENTED
}

interface GetDataAction {
  type: FlowActionType.GETDATA
}

interface ShareDataAction {
  type: FlowActionType.SHAREDATA
}

interface CertificateAction {
  type: FlowActionType.CERTIFICATE
}

interface FinishAction {
  type: FlowActionType.FINISH
}

export type FlowAction = UnopenAction | OpenAction | ConsentedAction | GetDataAction | ShareDataAction | CertificateAction | FinishAction;
