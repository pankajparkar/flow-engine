import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FlowEngineApp from './FlowEngineApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlowEngineApp />, div);
});
