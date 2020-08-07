import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchCustomerSaga);

{/* <Wrapper>
  <Auth />
</Wrapper> */}

function render(ui) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
