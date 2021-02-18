import { ipcRenderer } from 'electron';

export const plugin = (store) => {
  // send a message to main process every time
  // there is a mutation.
  store.subscribe((mutation, state) => {
    ipcRenderer.send('vuex-mutation', mutation);
    ipcRenderer.send('vuex-state', state);
  });
};
