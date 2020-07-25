import React from "react";

import "./Documentation.scss";
import TableRow from "../UI/Table/TableRow/TableRow";

const Documentation = (props) => {
  return (
    <div className="Documentation">
      <div className="Intro">
        <h2>Welcome to Customer Manager</h2>
        <p>
          This app is designed to help you to manage your customers by
          conducting comparative financial analysis.
        </p>
        <p>
          For each customer you can keep data such as contact details, industry
          classification and size, as well as their financials.
        </p>
        <p>Available tools are, as follows:</p>
        <ul>
          <li>
            CREATE - You can create customer by filling application form. Data
            required by form for each particular customer can be found on
            Serbian Business Register Agency and includes data from official
            financial statements. Section below explains how items required by
            this app can be mapped with positions in official financial
            statements required by authorities (so called 'AOPs').
          </li>
          <li>
            SEARCH and VIEW - Customers can be searched by their name. By
            clicking on each customer you can access to detail overview, whereas
            there are additional options to EDIT or DELETE particular customer.
            Section below containes definitions of ratios in order to help you
            to interpret results and obtain better understanding of company's
            financial position.
          </li>
          <li>
            SORT - Customers can be sorted per name or turnover (in both cases
            ascending or descending).
          </li>
          <li>
            FILTER - There is posibility to filter customers per industry they
            belong or per company size.
          </li>
        </ul>
      </div>
      <h2>Introduction to Ratio analysis</h2>
      <p>
        Financial analysis is the process of evaluating businesses to determine
        its performance and suitability. Typically, it is relied on ratio
        analysis.
      </p>
      <p>
        Ratio analysis can be defined as the process of ascertaining the
        financial ratios that are used for indicating the ongoing financial
        performance of a company using few types of ratios such as liquidity,
        profitability, activity, debt, market, solvency, efficiency, etc.
      </p>
      <p>
        It is a process used for the calculation of financial ratios for the
        purpose of evaluating the financial wellbeing of a company. The values
        used for the calculation of financial ratios of a company are extracted
        from the financial statements of that company.
      </p>
      <h2>Mapping with Serbian accounting records</h2>
      <p>
        Here are presented positions from official financial statements -
        Balance Sheet and Income Statement perscriebed by Serbian authorities.
        All positions are mapped with particular items used in this app.
      </p>
      <div className="Reports">
        <div className="Report_First">
          <div className="Report_Title">Income Statement</div>
          <table className="Report_Table">
            <tbody className="Report_TBody">
              <TableRow label="Operating revenue" data={"AOP 1001"} />
              <TableRow label="Operating expenses" data={"AOP 1018"} />
              <TableRow label="Financial revenue" data={"AOP 1032"} />
              <TableRow label="Financial expenses" data={"AOP 1040"} />
              <TableRow
                label="Extr. and other revenue"
                data={"AOP 1050 + AOP 1052 + AOP 1056"}
              />
              <TableRow
                label="Extr. and other expenses"
                data={"AOP 1051 + AOP 1053 + AOP 1057"}
              />
              <TableRow
                label="Taxation"
                data={"AOP 1060 + AOP 1061 - AOP 1062"}
              />
            </tbody>
          </table>
        </div>

        <div className="Report_Second">
          <div className="Report_Title">Balance Sheet</div>
          <table className="Report_Table">
            <tbody className="Report_TBody">
              <TableRow label="Fixed assets" data={"AOP 0002"} />
              <TableRow label="Current assets" data={"AOP 0042 + AOP 0043"} />
              <TableRow label="Equity" data={"AOP 0401"} />
              <TableRow label="Long term liabilities" data={"AOP 0424"} />
              <TableRow
                label="Short term liabilities"
                data={"AOP 0441 + AOP 0442"}
              />
            </tbody>
          </table>
        </div>
      </div>

      <h2>Definitions</h2>
      <p>
        The various kinds of financial ratios available may be broadly grouped
        into the following four main categories, based on the data they provide.
      </p>
      <h3>Part 1 - Liquidity</h3>
      <p>
        This type of ratio helps in measuring the ability of a company to take
        care of its short-term debt obligations. A higher liquidity ratio
        represents that the company is highly rich in cash.
      </p>
      <ul>
        <li>
          <a
            href="https://www.investopedia.com/terms/c/currentratio.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Current ratio
          </a>
          <p className="RatioDef">
            The current ratio is the ratio between the current assets and
            current liabilities of a company. The current ratio is used to
            indicate the liquidity of an organization in being able to meet its
            debt obligations in the upcoming twelve months. A higher current
            ratio will indicate that the organization is highly capable of
            repaying its short-term debt obligations.
          </p>
          <div className="Formula">
            <div className="blue"></div>Current Ratio = Current Assets / Current
            Liabilities
          </div>
        </li>
        <li>
          <a
            href="https://www.investopedia.com/terms/w/workingcapital.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Net Operating Assets [=NOA]
          </a>
          <p className="RatioDef">
            Net Operating Assets (also known as Net operating working capital
            [=NOWC]) is a measure of a company's liquidity and refers to the
            difference between operating current assets and operating current
            liabilities. In many cases these calculations are the same and are
            derived from company cash plus accounts receivable plus inventories,
            less accounts payable and less accrued expenses. If a company has
            substantial positive working capital, then it should have the
            potential to invest and grow. If a company's current assets do not
            exceed its current liabilities, then it may have trouble growing or
            paying back creditors, or even go bankrupt.
          </p>
          <div className="Formula">
            <div className="blue"></div>NOA = Current Assets - Current
            Liabilities
          </div>
        </li>
      </ul>
      <h3>Part 2 - Turnover</h3>
      <p>
        Turnover ratios are used to determine how efficiently the financial
        assets and liabilities of an organization have been used for the purpose
        of generating revenues.
      </p>
      <ul>
        <li>
          <a
            href="https://www.investopedia.com/terms/f/fixed-asset-turnover.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fixed Assets Turnover Ratio
          </a>
          <p className="RatioDef">
            Fixed assets turnover ratio is used to determine the efficiency of
            an organization in utilizing its fixed assets for the purpose of
            generating revenues. A high fixed asset turnover ratio often
            indicates that a firm effectively and efficiently uses its assets to
            generate revenues. A low fixed asset turnover ratio generally
            indicates the opposite.
          </p>
          <div className="Formula">
            <div className="blue"></div>Fixed Assets Turnover Ratio = Net Sales
            / Average Fixed Assets
          </div>
        </li>
        <li>
          <a
            href="https://www.investopedia.com/terms/a/assetturnover.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Total Assets Turnover Ratio
          </a>
          <p className="RatioDef">
            The asset turnover ratio can be used as an indicator of the
            efficiency with which a company is using its assets to generate
            revenue. The higher the asset turnover ratio, the more efficient a
            company is at generating revenue from its assets. Conversely, if a
            company has a low asset turnover ratio, it indicates it is not
            efficiently using its assets to generate sales.
          </p>
          <div className="Formula">
            <div className="blue"></div>Total Assets Turnover Ratio = Net Sales
            / Average Total Assets
          </div>
        </li>
      </ul>
      <h3>Part 3 - Solvency</h3>
      <p>
        Solvency ratios can be defined as a type of ratio that is used to
        evaluate whether a company is solvent and well capable of paying off its
        debt obligations or not.
      </p>
      <ul>
        <li>
          <a
            href="https://www.investopedia.com/terms/d/debtequityratio.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Debt Equity Ratio [=D/E]
          </a>
          <p className="RatioDef">
            The debt-equity ratio can be defined as a ratio between total debt
            and shareholders fund. The debt-equity ratio is used to calculate
            the leverage of an organization. It is a measure of the degree to
            which a company is financing its operations through debt versus
            wholly-owned funds. More specifically, it reflects the ability of
            shareholder equity to cover all outstanding debts in the event of a
            business downturn. A high D/E ratio is considered risky for lenders
            and investors because it suggests that the company is financing a
            significant amount of its potential growth through borrowing.
          </p>
          <div className="Formula">
            <div className="blue"></div>Debt Equity Ratio = Total Debts /
            Shareholders Equity
          </div>
        </li>
      </ul>
      <h3>Part 4 - Profitability</h3>
      <p>
        This type of ratio helps in measuring the ability of a company in
        earning sufficient profits.
      </p>
      <ul>
        <li>
          <a
            href="https://www.investopedia.com/terms/p/profitmargin.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            EBIT margin
          </a>
          <p className="RatioDef">
            Operating Profit Margin (or just operating margin or EBIT margin):
            By subtracting selling, general and administrative, or operating
            expenses, from a company's gross profit number, we get operating
            profit margin, also known as earnings before interest and taxes, or
            EBIT. Resulting in an income figure that’s available to pay the
            business' debt and equity holders, as well as the tax department,
            it's profit from a company’s main, ongoing operations.
          </p>
          <div className="Formula">
            <div className="blue"></div>EBIT margin = EBIT / Operating Revenue
            (Turnover) x 100
          </div>
        </li>
        <li>
          <a
            href="https://www.investopedia.com/terms/p/profitmargin.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profit margin
          </a>
          <p className="RatioDef">
            Net profit margin is calculated by dividing the net profits by net
            sales, or by dividing the net income by revenue realized over a
            given time period. In the context of profit margin calculations, net
            profit and net income are used interchangeably. Similarly, sales and
            revenue are used interchangeably. Net profit is determined by
            subtracting all the associated expenses, including costs towards raw
            material, labor, operations, rentals, interest payments, and taxes,
            from the total revenue generated.
          </p>
          <div className="Formula">
            <div className="blue"></div>Profit margin = Net Income / Operating
            Revenue (Turnover) x 100
          </div>
        </li>
        <li>
          <a
            href="https://www.investopedia.com/terms/r/returnonassets.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Return on Assets [=ROA]
          </a>
          <p className="RatioDef">
            Return on assets [=ROA] is an indicator of how profitable a company
            is relative to its total assets. ROA gives a manager, investor, or
            analyst an idea as to how efficient a company's management is at
            using its assets to generate earnings. Return on assets is displayed
            as a percentage. Higher ROA indicates more asset efficiency.
          </p>
          <div className="Formula">
            <div className="blue"></div>ROA = Net Income / Total Assets
          </div>
        </li>
        <li>
          <a
            href="https://www.investopedia.com/terms/r/returnonequity.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Return on Equity [=ROE]
          </a>
          <p className="RatioDef">
            Return on equity [=ROE] is a measure of financial performance
            calculated by dividing net income by shareholders' equity. Because
            shareholders' equity is equal to a company’s assets minus its debt,
            ROE is considered the return on net assets. ROE is considered a
            measure of how effectively management is using a company’s assets to
            create profits.
          </p>
          <div className="Formula">
            <div className="blue"></div>ROE = Net Income / Shareholders Equity
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Documentation;
