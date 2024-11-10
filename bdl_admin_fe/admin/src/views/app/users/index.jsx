import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UserList = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './list/userlist')
);
const UserAdd = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './add/adduser')
);
const UserDetail = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './details/details')
);

const User = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <UserList {...props} />}
      />
      <Route
        path={`${match.url}/add`}
        render={(props) => <UserAdd {...props} />}
      />
      <Route
        path={`${match.url}/:userId/edit`}
        render={(props) => <UserAdd {...props} />}
      />
      <Route
        path={`${match.url}/:userId`}
        render={(props) => <UserDetail {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default User;
