import TagsActionType from '../action-types/tabs';

interface InboxAction {
  type: TagsActionType.INBOX
}

interface ConsentAction {
  type: TagsActionType.CONSENT
}

interface MydataAction {
  type: TagsActionType.MYDATA
}

export type TagsAction = InboxAction | ConsentAction | MydataAction;
