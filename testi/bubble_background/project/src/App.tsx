import React from 'react';
import { CircleLayer } from './components/CircleLayer';
import './styles/background.css';

function App() {
  return (
    <div className="space">
      <div className="circles">
        <CircleLayer
          count={50}
          minSize={2}
          maxSize={3}
          duration={15}
          className="circle-layer-small"
        />
        <CircleLayer
          count={30}
          minSize={3}
          maxSize={4}
          duration={20}
          className="circle-layer-medium"
        />
        <CircleLayer
          count={15}
          minSize={4}
          maxSize={5}
          duration={25}
          className="circle-layer-large"
        />
      </div>
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-white text-center">
          <h1 className="text-4xl font-light tracking-widest mb-4">
            FLOATING CIRCLES
          </h1>
          <p className="text-lg text-gray-300">
            A beautiful animated background
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;