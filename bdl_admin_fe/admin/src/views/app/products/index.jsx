// import AccessControlled from 'helpers/AccessControlled';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './list/productlist')
);
const ProductAdd = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './add/addproduct')
);
const ProductDetail = React.lazy(() => import('./details/details'));

const Product = ({ match   }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      {/* <AccessControlled permission={permission} match={match}> */}
        <Route
          path={`${match.url}/list`}
          render={(props) => <List {...props} />}
        />
      {/* </AccessControlled> */}
      {/* <AccessControlled Page="Useradd"> */}
        <Route
          path={`${match.url}/add`}
          render={(props) => <ProductAdd {...props} />}
        />
      {/* </AccessControlled> */}
      <Route
        path={`${match.url}/:productId/edit`}
        render={(props) => <ProductAdd {...props} />}
      />
      <Route
        path={`${match.url}/:productId`}
        render={(props) => <ProductDetail {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

const mapStateToProps = ({ authentication }) => {
  const { loading, errorMessage, permission } = authentication;
  return {
    loading,
    errorMessage,
    permission,
  };
};

export default connect(mapStateToProps, {})(Product);