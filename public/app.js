const TimersDashboard = React.createClass({
  getInitialState: function() {
    return {
        timers: [{
        title: 'Practice squat',
        project: 'Gym Chores',
        id: uuid.v4(),
        elapsed: 5456099,
        runningSince: Date.now()
      },{
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuid.v4(),
        elapsed: 1273998,
        runningSince: Date.now()
      }]
    }
  },
  handleCreateFormSubmit: function (timer) {
    this.createTimer(timer);
  },
  createTimer: function (timer) {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  },
  render: function () {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList timers={this.state.timers} />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
});

const EditableTimerList = React.createClass({
  render: function () {
    const timers = this.props.timers.map((timer) =>(
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
      />
    ));
    return (
      <div id="timers">
        {timers}
      </div>
    );
  }
});

const EditableTimer = React.createClass({
  getInitialState: function() {
    return {
      editFormOpen: false
    }
  },
  render: function () {
    if (this.state.editFormOpen) {
      return (
        <TimeForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      );
    }else{
      return (
        <Timer
          id={this.props.id}
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
  handleFormSubmit : function () {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.refs.title.value,
      project: this.refs.project.value
    });
  },
  render: function () {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label htmlFor="">Title</label>
              <input type="text" defaultValue={this.props.title}
              ref="title"/>
            </div>
            <div className="field">
              <label htmlFor="">Project</label>
              <input type="text" defaultValue={this.props.project}
              ref="project"/>
            </div>
            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button" onClick={this.handleFormSubmit}>{submitText}</button>
              <button className="ui basic red button" onClick={this.onFormClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const ToggleableTimerForm = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false
    }
  },
  handleFormOpen: function() {
    this.setState({ isOpen: true });
  },
  handleFormClose: function(timer){
    this.setState({ isOpen: false });
  },
  handleFormSubmit: function(timer){
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  },
  render: function () {
    if(this.state.isOpen){
     return (
      <TimeForm
        onFormSubmit={this.handleFormSubmit}
        onFormClose={this.handleFormClose}
      />
     );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button className="ui basic button icon" onClick={this.handleFormOpen}>
            <i className="plus icon"></i>
          </button>
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