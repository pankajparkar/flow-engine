import * as React from 'react';

import FlowStepList from './FlowStepList';
import Step from './Step.Model';
import './App.css';

// const steps: Step[] = [
//   {id: 1, title: 'Inital', body: 'function(){console.log("Inital")}', true_id: 2, false_id: 3 },
//   {id: 2, title: 'Setup Props', body: 'function(){console.log("Setup Props")}', true_id: 3, false_id: 4 },
//   {id: 3, title: 'Intermediate Steps', body: 'function(){console.log("Intermediate Steps")}', true_id: 4, false_id: 4 },
//   {id: 4, title: 'Final', body: 'function(){console.log("Final")}' },
// ];

class FlowEngineApp extends React.Component {

  state = {
    activeStepId: 1,
    steps: []
  }
  
componentDidMount(){

    let xhReq = new XMLHttpRequest();
    xhReq.open("GET", "/api/steps.json", false);
    xhReq.send(null);
    let steps: Step[] = JSON.parse(xhReq.responseText);
    this.setState({steps});
    
  }

  constructor(props: any){
    super(props);
  }

  render() {
    let flowStepListDom;
    if(this.state && this.state.hasOwnProperty('steps')){
      flowStepListDom = <FlowStepList steps={this.state.steps} activeStepId={this.state.activeStepId}/>
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Flow Engine App</h2>
        </div>
        <div className="App-intro">
          {flowStepListDom}
        </div>
      </div>
    );
  }
}

export default FlowEngineApp;
