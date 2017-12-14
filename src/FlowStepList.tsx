import * as React from 'react';

import FlowStep from './FlowStep';
import Step from './Step.Model';

interface FlowStepListProps {
  steps: Step[],
  activeStepId: number
}

const visitedStep: number[] = [];

class FlowStepList extends React.Component {
  
  props: FlowStepListProps;
  state = {
    activeStepId: 1 //intial state
  };

  constructor(props: any){
    super(props);
  }

  proceed(stepId: number){
    //check to avoid circular execution of function.
    if(visitedStep.indexOf(stepId) === -1){
      visitedStep.push(stepId);
      this.setState({activeStepId: stepId});
    } else {
      alert("This step is visiting 2nd time, stoping flow to avoid circular execution.")
    }
  }

  flowCompleted(){
    alert("Flow Comleted");
  }

  render() {
    let flowSteps;
    if(this.props.steps) {
      flowSteps = this.props.steps.map((step: any) => {
        console.log(step.id == this.state.activeStepId, step.id, this.state.activeStepId)
        return <FlowStep 
            key={step.id} step={step} active={step.id == this.state.activeStepId} 
            proceed={this.proceed.bind(this)} flowCompleted={this.flowCompleted}/>
      });
    }
    
    return (
      <div className="step-list">
        {flowSteps}
      </div>
    );
  }
}

export default FlowStepList;

