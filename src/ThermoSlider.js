import 'rc-slider/assets/index.css';

import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import PropTypes from 'prop-types';

const minTempe=50
const maxTempe=90
const sliderStyle={display:'inline-block', width:'60%', minWidth:'200px', maxWidth:'600px'}

const SliderWithTooltip = createSliderWithTooltip(Slider);

class ThermoSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value===this.state.value && this.props.value!==this.state.value){
      this.setState({value:this.props.value})
    }
  }

  onSliderChange = (value) => {
    this.setState({value});
  }
  
  onAfterChange = (value) => {
    this.props.onChange(value) 
  }

  render() {
    return (
        <SliderWithTooltip value={this.state.value} style={sliderStyle}
            min={minTempe} max={maxTempe}
            tipProps={{ overlayClassName: 'foo' }}
            trackStyle={[{ backgroundColor: 'red', height: 10 }]}
            railStyle={ {backgroundColor: '#82caff', height: 10 }}
            onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
        />
    );
  }
}

ThermoSlider.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ThermoSlider
