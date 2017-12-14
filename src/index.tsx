import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FlowEngineApp from './FlowEngineApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <FlowEngineApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
