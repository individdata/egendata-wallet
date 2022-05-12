/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import {
  createSlice, createAsyncThunk, ThunkDispatch, AnyAction,
} from '@reduxjs/toolkit';

type OnMessageType = (evt: MessageEvent, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;
type OnOpenType = (evt: Event, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;
type OnCloseType = (evt: CloseEvent, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;
type OnErrorType = (evt: Event, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;

type WebsocketState = {
  status: 'connecting' | 'open' | 'closing' | 'closed' | 'error',
};

const initialState = {
  status: 'closed',
} as WebsocketState;

type WebsocketConfig = {
  target: string,
  onMessage: OnMessageType,
  onOpen?: OnOpenType,
  onClose?: OnCloseType,
  onError?: OnErrorType,
};

let websocket: WebSocket;
let keepAliveId: NodeJS.Timeout | undefined;

function getWebSocket(target: string) {
  if (!websocket) {
    websocket = new WebSocket(target);
  }
  return websocket;
}

export const connect = createAsyncThunk<void, WebsocketConfig>(
  'websocket/connect',
  async (wsConfig, { dispatch }): Promise<void> => {
    const ws = getWebSocket(wsConfig.target);

    ws.onmessage = async (evt: MessageEvent) => {
      await wsConfig.onMessage(evt, dispatch);
    };

    ws.onopen = async (evt: Event) => {
      console.log('ws opened: ', { evt });
      keepAliveId = setInterval(() => {
        ws.send('ping');
        // console.log('ping', new Date());
      }, 5000);
      if (wsConfig.onOpen) {
        await wsConfig.onOpen(evt, dispatch);
      }
    };

    ws.onclose = async (evt: CloseEvent) => {
      console.log('ws closed: ', { evt });
      if (keepAliveId) {
        clearInterval(keepAliveId);
        keepAliveId = undefined;
      }
      if (wsConfig.onClose) {
        await wsConfig.onClose(evt, dispatch);
      }
    };

    ws.onerror = async (evt: Event) => {
      console.log('ws error: ', { evt });
      if (wsConfig.onError) {
        await wsConfig.onError(evt, dispatch);
      }
    };
  },
);

export const disconnect = createAsyncThunk<void>(
  'websocket/disconnect',
  async (): Promise<void> => {
    if (websocket) {
      websocket.close();
    }
  },
);

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(connect.pending, (state) => {
      state.status = 'connecting';
      console.log('ws connecting');
    });

    builder.addCase(connect.fulfilled, (state) => {
      state.status = 'open';
      console.log('ws open');
    });

    builder.addCase(connect.rejected, (state) => {
      state.status = 'error';
      console.log('ws error');
    });

    builder.addCase(disconnect.pending, (state) => {
      state.status = 'closing';
      console.log('ws closing');
    });

    builder.addCase(disconnect.fulfilled, (state) => {
      state.status = 'closed';
      console.log('ws closed');
    });

    builder.addCase(disconnect.rejected, (state) => {
      state.status = 'error';
      console.log('ws error');
    });
  },
});

const { reducer } = websocketSlice;
export default reducer;
