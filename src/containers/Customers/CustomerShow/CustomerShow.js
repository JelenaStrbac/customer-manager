import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch, Link, Redirect } from "react-router-dom";

import "./CustomerShow.scss";
import * as actions from "../../../store/actions";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal/Modal";
import TableRow from "../../../components/UI/Table/TableRow/TableRow";
import Table from "../../../components/UI/Table/Table";
import ProfitabilityCircle from "../../../components/UI/Circle/ProfitabilityCircle";

const CustomerShow = (props) => {
  //// modal for deleting customer
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //// fetching customer from database
  const match = useRouteMatch();
  const fetchOneCustomerRef = useRef(props.fetchOneCustomer);
  const tokenRef = useRef(props.token);
  const idRef = useRef(match.params.id);

  useEffect(() => {
    fetchOneCustomerRef.current(tokenRef.current, idRef.current);
  }, []);

  
  //// destructuring data about customer and calculation of ratios
  const {companyName, website, regNumber, address, phone, email, size, industry, employees, operatingRevenue, operatingExpenses, financialRevenue, financialExpenses, otherRevenue, otherExpenses, taxation, fixedAssets, currentAssets, equity, longTermLiabilities, shortTermLiabilities} = props.particularCustomer.customerData || {}

  let ebit, finResult, otherResult, netIncomePriorTax, netIncome, totalAssets, totalFunds, currentRatio, noa, fixedAssetsTurnoverRatio, totalAssetsTurnoverRatio, debtToEquityRatio, ebitMargin, profitMargin, roa, roe;
  if (props.particularCustomer) {
    ebit = operatingRevenue-operatingExpenses;
    finResult = financialRevenue-financialExpenses;
    otherResult = otherRevenue-otherExpenses;
    netIncomePriorTax = ebit + finResult + otherResult;
    netIncome = netIncomePriorTax - taxation;
    totalAssets = fixedAssets + currentAssets;
    totalFunds = equity + longTermLiabilities + shortTermLiabilities;
    currentRatio = currentAssets / shortTermLiabilities;
    noa = currentAssets - shortTermLiabilities;
    fixedAssetsTurnoverRatio = operatingRevenue / fixedAssets;
    totalAssetsTurnoverRatio = operatingRevenue / totalAssets;
    debtToEquityRatio = (longTermLiabilities + shortTermLiabilities) / equity;
    ebitMargin = (ebit / operatingRevenue) * 100;
    profitMargin = (netIncome / operatingRevenue) * 100;
    roa = ((netIncome / totalAssets) * 100) > 0 ? `${((netIncome / totalAssets) * 100).toFixed(2)}%` : `n.a.`;
    roe = ((netIncome / equity) * 100) > 0 ? `${((netIncome / equity) * 100).toFixed(2)}%` : `n.a.`;
  }

  console.log(props.particularCustomer);

  //// showing particular customer
  let particularCustomerShow = null;
  if (props.particularCustomer) {
    particularCustomerShow = (
      <div className="CustomerShowContainer">
      <div className="CustomerShowContainer_Left">
        <div className="MainTitle">
          <div>{companyName}</div>
          <div className="CustomerShow_Buttons">
            <Link to={`/edit/${idRef.current}`} className="Button">
              EDIT
            </Link>
            <button className="Button Delete" onClick={openModal}>
              DELETE
            </button>
          </div>
        </div>

        <div className="Info_and_Industry">
              <Table title="MAIN INFO">
                <TableRow label="Website:" data={website}/>
                <TableRow label="Reg. number:" data={regNumber}/>
                <TableRow label="Address:" data={address}/>
                <TableRow label="Phone:" data={phone}/>
                <TableRow label="Email:" data={email}/>
              </Table>
            
            <Table title="INDUSTRY AND CLASSIFICATION">
              <TableRow label="Industry:" data={industry}/>
              <TableRow label="Comp. size:" data={size}/>
              <TableRow label="Employees:" data={employees}/>
            </Table>
        </div>

        <div className="MainInfoTable Finance">
          <div className="MainInfoTable_Title">FINANCE</div>
          <div className="Reports">
              <div className="Report_First">
                <div className="Report_Title"><div>Income Statement</div> <div>[in RSD thousand]</div></div>
                <table className="Report_Table">
                  <tbody className="Report_TBody First_TBody">
                    <TableRow label="Operating revenue" data={operatingRevenue.toLocaleString() || operatingRevenue}/>
                    <TableRow label="Operating expenses" data={`-${operatingExpenses.toLocaleString() || operatingExpenses}`}/>
                    <TableRow label="Operating P/L [=EBIT]" data={ebit.toLocaleString()}/>
                    <TableRow label="Financial revenue" data={financialRevenue.toLocaleString() || financialRevenue}/>
                    <TableRow label="Financial expenses" data={`-${financialExpenses.toLocaleString() || financialExpenses}`}/>
                    <TableRow label="Financial P/L" data={finResult.toLocaleString()} />
                    <TableRow label="Extr. and other revenue" data={otherRevenue.toLocaleString() || otherRevenue}/>
                    <TableRow label="Extr. and other expenses" data={`-${otherExpenses.toLocaleString() || otherExpenses}`}/>
                    <TableRow label="Extr. and other P/L" data={otherResult.toLocaleString()}/>
                    <TableRow label="P/L prior taxation" data={netIncomePriorTax.toLocaleString()}/>
                    <TableRow label="Taxation" data={`-${taxation.toLocaleString() || taxation}`}/>
                    <TableRow label="P/L for period [=Net income]" data={netIncome.toLocaleString()}/>
                  </tbody>
                </table>
              </div>

              <div className="Report_Second">
                <div className="Report_Title"><div>Balance Sheet</div> <div>[in RSD thousand]</div></div>
                <table className="Report_Table">
                  <tbody className="Report_TBody Second_TBody">
                    <TableRow label="Fixed assets" data={fixedAssets.toLocaleString() || fixedAssets}/>
                    <TableRow label="Current assets" data={currentAssets.toLocaleString() || currentAssets}/>
                    <TableRow label="Total assets" data={totalAssets.toLocaleString()}/>
                    <TableRow label="Equity" data={equity.toLocaleString() || equity}/>
                    <TableRow label="Long term liabilities" data={longTermLiabilities.toLocaleString() || longTermLiabilities}/>
                    <TableRow label="Short term liabilities" data={shortTermLiabilities.toLocaleString() || shortTermLiabilities}/>
                    <TableRow label="Total sh. funds and liabilities" data={totalFunds.toLocaleString()}/>
                  </tbody>
                </table>
              </div>

          </div>

          <div className="Ratios">
            <div className="Report_Title">Ratios</div>
            <div className="Ratios_Main">
              <table className="Report_Table">
                  <tbody className="Report_TBody Left_TBody">
                    <TableRow label="Liqudity" />
                    <TableRow label="Current ratio" data={currentRatio.toFixed(2)}/>
                    <TableRow label="Net operating assets [=NOA]" data={noa.toLocaleString()}/>
    
                    <TableRow label="Turnover" />
                    <TableRow label="Fixed Asset Turnover Ratio" data={fixedAssetsTurnoverRatio.toFixed(2)}/>
                    <TableRow label="Total Asset Turnover Ratio" data={totalAssetsTurnoverRatio.toFixed(2)}/>
                    </tbody>
                </table>   

                <table className="Report_Table">
                  <tbody className="Report_TBody Right_TBody">     
                    <TableRow label="Solvency" />
                    <TableRow label="Debt Equity Ratio" data={debtToEquityRatio.toFixed(2)}/>
    
                    <TableRow label="Profitability" />
                    <TableRow label="EBIT margin" data={ebitMargin > 0 ? `${ebitMargin.toFixed(2)}%` : `n.a.`}/>
                    <TableRow label="Profit margin" data={profitMargin > 0 ? `${profitMargin.toFixed(2)}%` : `n.a.`}/>
                    <TableRow label="Return on Assets [=ROA]" data={roa}/>
                    <TableRow label="Return on Equity [=ROE]" data={roe}/> 
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>

        <div className="CustomerShowContainer_Right">
          <div className="HighlightData One">
            <div className="HighlightData_Data">
              <span className="Currency">RSD</span>
              <div>{`${(operatingRevenue / 1000).toFixed(2)}mil.`}</div>
            </div>
            <div className="HighlightData_Title">TURNOVER</div>
          </div>
          <div className="HighlightData Two">
            <div className="HighlightData_Data">
              <div><ProfitabilityCircle percent={ebitMargin} colorOne="#ffa20021" colorTwo="#ffa000"/></div>
            </div>
            <div className="HighlightData_Title">EBIT margin</div>
          </div>
          <div className="HighlightData Three">
            <div className="HighlightData_Data">
              <div><ProfitabilityCircle percent={profitMargin} colorOne="#46d4b31f" colorTwo="#46d4b4"/></div>
            </div>
            <div className="HighlightData_Title">PROFIT margin</div>
          </div>
          <div className="HighlightData Four">
            <div className="HighlightData_Data">
              <div>{debtToEquityRatio.toFixed(2)}</div>
            </div>
            <div className="HighlightData_Title">DEBT EQUITY RATIO</div>
          </div>
        </div>
      </div>
    );
  }

  //// Customer delete part
  let content = "Are you sure you want to delete a customer?";
  if (props.particularCustomer) {
    content = `Are you sure you want to delete customer '${props.particularCustomer.customerData.companyName}'?`;
  }

  if (props.isLoading) {
    particularCustomerShow = <Spinner />;
    content = <Spinner />;
  }

  let actions = (
    <React.Fragment>
      <button
        onClick={() => props.deleteCustomer(tokenRef.current, idRef.current)}
        className="Button Delete"
      >
        DELETE
      </button>
      <button className="Button" onClick={closeModal}>
        CANCEL
      </button>
    </React.Fragment>
  );

  return (
    <div className="CustomerShow">
      {props.particularCustomer ? particularCustomerShow : null}
      {props.isDeletedSuccessfully ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      ) : null}
      <Modal
        show={showModal}
        content={content}
        actions={actions}
        onDismiss={() => <Link to={`/show/${idRef.current}`} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    particularCustomer: state.customers.particularCustomer,
    token: state.auth.idToken,
    isLoading: state.customers.loading,
    isDeletedSuccessfully: state.customers.isDeletedSuccessfully,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneCustomer: (token, id) =>
      dispatch(actions.fetchOneCustomer(token, id)),
    deleteCustomer: (token, id) => dispatch(actions.customerDelete(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShow);
