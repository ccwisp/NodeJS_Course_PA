import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({
  component: Component = null,
  render: Render = null,
  ...rest
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          Render ? (
            Render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
