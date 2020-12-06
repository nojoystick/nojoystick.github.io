/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { colors } from './constants';
import { Blog, Home, Music, Projects } from './pages';
import Navbar from './components/navbar';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import useSizeListener from './utils/useSizeListener';

const body = {
  backgroundColor: colors.pink,
  fontFamily: 'Inconsolata',
};

const App = () => {
  const [width, height] = useSizeListener();
  return (
    <div css={body}>
      <Router>
        <Navbar width={width} height={height} />
        <Paths />
      </Router>
    </div>
  );
};

const Paths = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/blog'>
        <Blog />
      </Route>
      <Route path='/music'>
        <Music />
      </Route>
      <Route path='/projects'>
        <Projects />
      </Route>
    </Switch>
  );
};

export default App;
