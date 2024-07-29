import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  Button,
} from '../../components';

import { TopbarContainer } from '../../containers';

import css from './SuneBalancePage.module.css';
import { useSelector } from 'react-redux';
import Table from './Table/Table';
import { LoadingSkeleton } from '../LoadingPage/LoadingPage';

export class SuneBalancePageComponent extends Component {
  render() {
    const {
      currentUser,
      currentUserListing,
      intl,
      scrollingDisabled,
      fetchInProgress,
      fetchError,
      transactionHistory,
      statusText,
    } = this.props;
    // console.log('transactionHistory', transactionHistory);
    const user = ensureCurrentUser(currentUser);

    const title = intl.formatMessage({ id: 'SuneBalancePage.title' });

    const suneLeft = user?.attributes?.profile?.metadata?.sune ?? 0;

    const tableHeadingDate = intl.formatMessage({ id: 'SuneBalancePage.tableHeadingDate' });
    const tableHeadingTransactionId = intl.formatMessage({
      id: 'SuneBalancePage.tableHeadingTransactionId',
    });
    const tableUserJoined = intl.formatMessage({
      id: 'SuneBalancePage.SuneBalancePage.userJoinedLabel',
    });
    const tableHeadingTransactionType = intl.formatMessage({
      id: 'SuneBalancePage.tableHeadingTransactionType',
    });
    const tableHeadingAmountDue = intl.formatMessage({
      id: 'SuneBalancePage.tableHeadingAmountDue',
    });
    const tableHeadingStatus = intl.formatMessage({ id: 'SuneBalancePage.tableHeadingStatus' });

    const headers = [
      tableHeadingDate,
      tableHeadingTransactionId,
      tableHeadingAmountDue,
      tableHeadingTransactionType,
      tableUserJoined,
      tableHeadingStatus,
    ];

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="SuneBalancePage" />
            <UserNav selectedPageName="SuneBalancePage" listing={currentUserListing} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <h1>{intl.formatMessage({ id: 'SuneBalancePage.title' })}</h1>

              {fetchInProgress ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <p>{intl.formatMessage({ id: 'SuneBalancePage.subtitle' })} </p>
                  {user.id ? (
                    <p className={css.suneLeftContainer}>
                      &nbsp;
                      {intl.formatMessage(
                        { id: 'SuneBalancePage.remainingSuneHeading' },
                        { suneLeft }
                      )}
                    </p>
                  ) : null}

                  {fetchError ? (
                    <p>{fetchError}</p>
                  ) : statusText == 'RESULTS_FOUND' ? (
                    <Table
                      intl={intl}
                      data={transactionHistory}
                      rowsPerPage={10}
                      headers={headers}
                      tableHeadingDate={tableHeadingDate}
                      tableHeadingTransactionId={tableHeadingTransactionId}
                      tableHeadingAmountDue={tableHeadingAmountDue}
                      tableHeadingTransactionType={tableHeadingTransactionType}
                      tableUserJoined={tableUserJoined}
                      tableHeadingStatus={tableHeadingStatus}
                    />
                  ) : (
                    <p>{intl.formatMessage({ id: 'SuneBalancePage.noTransactionHistory' })}</p>
                  )}
                </>
              )}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser, currentUserListing } = state.user;
  const { fetchInProgress, fetchError, history, statusText } = state.SuneBalancePage;

  return {
    currentUser,
    currentUserListing,
    scrollingDisabled: isScrollingDisabled(state),
    fetchInProgress,
    fetchError,
    transactionHistory: history,
    statusText,
  };
};

const SuneBalancePage = compose(
  connect(mapStateToProps, null),
  injectIntl
)(SuneBalancePageComponent);

export default SuneBalancePage;
