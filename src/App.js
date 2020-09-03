import React from 'react';
import TopBar from "./components/topBar"
import { Route, BrowserRouter, Redirect,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'; // to create history and detect the ID
import HomePage from "./pages/homePage"
import TypesPage from "./pages/typesPage"
import ViewPokemonPage from "./pages/viewPokemonPage"
import './App.css';

const history = createBrowserHistory()

function Routes() {
  return(
    <div className={"mainComponent"}>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/types" component={TypesPage} />
        <Route exact={true} path="/view-pokemon/:id" component={ViewPokemonPage} />
        {/*if the route not exit or when we make a reload we make an auto redirect to the home page*/}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}
function App() {
  return (
    <BrowserRouter className="App" history={history}>
        <TopBar/>
        <Routes  />
    </BrowserRouter>
  );
}

export default App;
