import React from 'react';
import { render } from 'react-dom';
import {store} from './store'


render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )