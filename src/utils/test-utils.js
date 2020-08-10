import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import authReducer from "../store/reducers/auth";
import customerReducer from "../store/reducers/customers";
import toolsReducer from "../store/reducers/tools";
import createSagaMiddleware from "redux-saga";
import { watchAuthSaga, watchCustomerSaga } from "../store/sagas";

const reducers = combineReducers({
  auth: authReducer,
  customers: customerReducer,
  tools: toolsReducer,
});

function render(ui, { initialState } = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(watchAuthSaga);
  sagaMiddleware.run(watchCustomerSaga);

  function Wrapper({ children }) {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
