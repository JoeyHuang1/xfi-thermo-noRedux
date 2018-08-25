import React from 'react';
import ThermoSlider from './ThermoSlider.js'
import thermoService from "./thermoService.js"
import PropTypes from 'prop-types';


class Thermo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature:this.props.temperature, tempeClass:''}
  }

  handleChange = async (value)=>{
    let newVal=this.state.temperature
    this.setState({temperature:value, tempeClass:'blinkClass'})
    try {
      newVal = await thermoService(this.props.seedId, value)? value:newVal
    } catch(e) {
      console.log(new Error(e))
    }
    this.setState({temperature: newVal, tempeClass:''})
  }
  
  render() {
    const thermoTitleStyle={width:'30%', 'maxWidth':'300px', 'minWidth':'100px', display:'inline-block'}
    return (
      <div>
        <p/>
        <div style={thermoTitleStyle}>
          <span>Thermostat {this.props.name}:</span>
          <span className={this.state.tempeClass}> {this.state.temperature} </span>
        </div>
        <ThermoSlider onChange={this.handleChange}
            value={this.state.temperature}
        />
      </div>
    );
  }
}

Thermo.propTypes = {
  seedId:PropTypes.string.isRequired,
  name:PropTypes.string
};

export default Thermo