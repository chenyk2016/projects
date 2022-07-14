import Test from './components/test'
import TreeEdit from './components/TreeEdit';
import HtmlToPdf from './components/HtmlToPdf'
import WaterMark from './components/WaterMark';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Test</h2>
      <Test />
      <br /><br />

      <h2> TreeEdit </h2>
      <TreeEdit />
      <br /><br />

      <h2> HtmlToPdf </h2>
      <HtmlToPdf />

      <h2>水印</h2>
      <WaterMark />
      <br /><br />

    </div>
  );
}

export default App;
