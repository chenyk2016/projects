import React from 'react'
import FuncInput from './func-input'
import MemoInput from './memo-input'
import DemoTimesAdd from './demo-times-add'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 1,
    }
  }

  onChange = (v) => {
    this.setState({
      value: v
    })
  }

  add = () => {
    this.setState({
      value: this.state.value + 1
    })
  }


  render() {
    const { value } = this.state
    return (
    <div className="App">
        <div>
          当前value:
          { value }

          <button onClick={this.add}>改变value</button>
        </div>


        <DemoTimesAdd />
        <br />

        {/* <div>
          <span>func-input:</span>
          <FuncInput value={value} onChange={this.onChange} />
        </div> */}

        <div>
          <span>memo-input:</span>
          <MemoInput value={value} onChange={this.onChange} />
        </div>

    </div>
  );
  }
}

export default App;
