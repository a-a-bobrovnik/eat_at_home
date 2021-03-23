import './App.css';
import { Home } from './Pages/Home';
import { Route, Switch } from 'react-router-dom';
import { Dishes } from './Pages/Dishes';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootStoreProvider } from './store/RootStoreContext';
import { Header } from './Components/main/Header';
import { UserRoom } from './Pages/UserRoom';
import { Cart } from './Pages/Cart';
import { ChefRoom } from './Pages/ChefRoom';

function App() {
  return <div className="App">
    <RootStoreProvider>
      <Router>
        <Header />
        <Switch>
          <Route path='/chefRoom' render={() => <ChefRoom />} />
          <Route path='/userRoom' render={() => <UserRoom />} />
          <Route path='/dishes' render={() => <Dishes />} />
          <Route path='/cart' render={() => <Cart />} />
          <Route path='/' render={() => <Home />} />
        </Switch>
      </Router>
    </RootStoreProvider>
  </div>
}

export default App;
