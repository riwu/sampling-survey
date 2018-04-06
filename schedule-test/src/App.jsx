import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Schedule from './pages/Schedule';
import GetData from './pages/GetData';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <div className="App">
        <Switch>
          <Route exact path="/" component={GetData} />
          <Route path="/schedule-test" component={Schedule} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
