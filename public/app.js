const TimersDashboard = React.createClass({
  render: function () {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList />
          <ToggleableTimerForm
            isOpen={false} />
        </div>
      </div>
    );
  }
});

const EditableTimerList = React.createClass({
  render: function () {
    return (
      <div id="timers">
        <EditableTimer
        title="Learn React"
        project="Web Domination"
        elapsed="898630"
        runningSince={null}
        editFormOpen={false}/>
        <EditableTimer
        title="Learn Extreme ironing"
        project="World Domination"
        elapsed="89863095"
        runningSince={null}
        editFormOpen={false}/>
      </div>
    );
  }
});

const EditableTimer = React.createClass({
  render: function () {
    if (this.props.editFormOpen) {
      return (
        <TimeForm
          title={this.props.title}
          project={this.props.project}
        />
      );
    }else{
      return (
        <Timer
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
});

const TimeForm = React.createClass({
  render: function () {
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label htmlFor="">Title</label>
              <input type="text" defaultValue={this.props.title}/>
            </div>
            <div className="field">
              <label htmlFor="">Project</label>
              <input type="text" defaultValue={this.props.project}/>
            </div>
            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button">{submitText}</button>
              <button className="ui basic red button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const ToggleableTimerForm = React.createClass({
  render: function () {
    if(this.props.isOpen){
     return (
      <TimeForm />
     );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button className="ui basic button icon"><i className="plus icon"></i></button>
        </div>
      );
    }

  }
});

const Timer = React.createClass({
  render: function () {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span className="right floated edit icon"><i className="edit icon"></i></span>
            <span className="right floated trash icon"><i className="trash icon"></i></span>
          </div>
        </div>
        <div className="ui bottom attached blue basic button">
          Start
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <TimersDashboard/>,
  document.getElementById('content')
);