import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Breadcrumbs, Footer, Header } from './components/layout';
import { Analyze, Home, Login, Repositories, Results } from './components/pages';
import AnalysesState from './context/analyses/AnalysesState';
import AuthState from './context/auth/AuthState';
import RepositoriesState from './context/repositories/RepositoriesState';
import { PrivateRoute } from './components/routing';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <AuthState>
      <RepositoriesState>
        <AnalysesState>
          <Router>
            <>
              <Header />
              <Breadcrumbs />
              <Container>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/repositories" component={Repositories} />
                  <PrivateRoute path="/analyze/:repositoryName" component={Analyze} />
                  <PrivateRoute path="/results/:repositoryName" component={Results} />
                </Switch>
              </Container>
              <Footer />
              <ToastContainer />
            </>
          </Router>
        </AnalysesState>
      </RepositoriesState>
    </AuthState>
  );
};

export default App;
