import * as React from 'react';

import Step from './Step.Model' 

interface FlowStepProps{
  step: Step,
  active: boolean,
  proceed: Function,
  flowCompleted: Function
}

class FlowStep extends React.Component {
  state ={
    processing: false,
    failed: false,
    executed: false
  };
  props: FlowStepProps;

  constructor(prop: any){
    super(prop);
  }

  executeStep(step: Step): Promise<any> {
    return (new Promise((resolve) => {
      this.setState({processing: true});
      let fun =  new Function(`return ${step.body}`);
      //intentional delay between tasks
      setTimeout(()=> {
        fun();
        resolve(step.true_id);
        this.setState({
          processing: false, 
          executed: true
        });
      }, 3000);
    }).catch((error) => {
          return new Promise((resolve, reject) => {
            resolve(step.false_id);
            this.setState({
              processing: false,
              failed: true
            });
          });
        }
      )
    );
  }

  evaluateStep(){
    if(this.props.active){
      this.executeStep(this.props.step).then((nextStepId: number)=> {
        if(nextStepId){
          this.props.proceed(nextStepId);
        } else {
          this.props.flowCompleted();
        }
      });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any){
    if(prevProps.active !== this.props.active) {
      this.evaluateStep();
    }
  }

  componentDidMount(){
    this.evaluateStep();    
  }

  getClasses(){
    let classes = ['panel-heading', this.state.failed ? 'failed': '', this.state.processing? 'processing': '', this.state.executed? 'executed': ''];
    let filtered = classes.filter(item => item && item !== '');
    console.log(filtered)
    return filtered.join(" ")
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className={this.getClasses()}>
          <h3 className="panel-title">
            {this.props.step.title}&nbsp;
            <small className={this.props.active ? '': 'hide'}>(Running..)</small>
          </h3>
        </div>
        <div className="panel-body">
          {this.props.step.body}
        </div>
      </div>
    );
  }
}

export default FlowStep;
