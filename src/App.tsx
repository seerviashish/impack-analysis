import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HOME,
  ERROR,
  STUDENT,
  REJECTED,
  SHORTLISTED,
} from "./constants/routes";
import WaitingComponent from "./components/WaitingComponent";

const HomePage = lazy(
  () => import(/* webpackChunkName: 'HomePage' */ "./pages/HomePage")
);

const RejectedPage = lazy(
  () => import(/* webpackChunkName: 'RejectedPage' */ "./pages/RejectedPage")
);

const ShortListedPage = lazy(
  () =>
    import(/* webpackChunkName: 'ShortListedPage' */ "./pages/ShortListedPage")
);

const StudentPage = lazy(
  () => import(/* webpackChunkName: 'StudentPage' */ "./pages/StudentPage")
);

const ErrorPage = lazy(
  () => import(/* webpackChunkName: 'SignInPage' */ "./pages/ErrorPage")
);

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME} component={WaitingComponent(HomePage)} />
        <Route exact path={STUDENT} component={WaitingComponent(StudentPage)} />
        <Route
          exact
          path={REJECTED}
          component={WaitingComponent(RejectedPage)}
        />
        <Route
          exact
          path={SHORTLISTED}
          component={WaitingComponent(ShortListedPage)}
        />
        <Route exact path={ERROR} component={WaitingComponent(ErrorPage)} />
      </Switch>
    </Router>
  );
};

export default App;
