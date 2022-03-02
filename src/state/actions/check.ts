import CheckActionType from '../action-types/check';

interface UncheckAction {
  type: CheckActionType.UNCHECK
}

interface CheckedAction {
  type: CheckActionType.CHECKED
}

export type CheckAction = UncheckAction | CheckedAction;
