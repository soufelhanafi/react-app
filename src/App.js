import React from 'react';
import TopBar from "./components/topBar"
import { Route, BrowserRouter, Redirect,Switch } from 'react-router-dom';
import HomePage from "./pages/homePage"
import TypesPage from "./pages/typesPage"
import ViewPokemonPage from "./pages/viewPokemonPage"
import './App.css';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/types" component={TypesPage} />
        <Route exact={true} path="/view-pokemon/:id" component={ViewPokemonPage} />
        {/*if the route not exit or when we make a reload we make an auto redirect to the home page*/}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}
function App() {
  return (
    <div className="App">
        <TopBar/>
        <Routes />
    </div>
  );
}

export default App;
