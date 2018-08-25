import React from 'react';
import Thermo from './Thermo.js'
import PropTypes from 'prop-types';
import thermoListService from './thermoListService.js';

const noDevErrMsg='No thermostat found.'
const noHCDevErrMsg = 'No heat/cool thermostat found.'

class ThermoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {thermos:[], errMsg:'', accountClass:''};
    this.getThermoList = this.getThermoList.bind(this)
  }

  componentDidMount() {
    this.getThermoList()
  }

  async getThermoList(){
    this.setState({accountClass:'blinkClass'})
    try {
      let thermoList = await thermoListService()

      if (thermoList.length>0)
        this.setState({thermos: thermoList, errMsg:'', accountClass:''})
      else 
        this.setState({thermos: [], errMsg: noHCDevErrMsg, accountClass:''})
    } catch(e) {
      console.log(new Error(e))
      this.setState({thermos: [], errMsg: noDevErrMsg, accountClass:''})
    }
  }
  
  listThermo=()=>{
    return this.state.thermos.map(thermo=>
      <Thermo key={thermo.seedId}
          seedId={thermo.seedId}
          name={thermo.name}
          temperature={thermo.temperature}
      />)
  }

  render() {
    return (
      <div>
        <h1 className={this.state.accountClass}>Account {this.props.account}</h1>
        <p>{this.state.errMsg}</p>
        <ul>{this.listThermo()}</ul>
      </div>
    );
  }
}

ThermoList.propTypes = {
  account: PropTypes.string.isRequired
};

export default ThermoList