import { memo } from 'react';
import Car from './components/car';

const App = () => {
  return (
    <div className="App">
      <Car/>
    </div>
  );
};

export default memo(App);
