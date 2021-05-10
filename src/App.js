import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/search" component={SearchPage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
