import React, { useEffect, useState } from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  NamedRedirect,
} from '../../components';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from '../../util/reactIntl';

function SuccessPage(props) {
  const { location, intl } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());

    return () => {
      dispatch(fetchCurrentUser());
    };
  }, []);

  const success = location?.state?.paymentSuccess;
  if (!success) return <NamedRedirect name="LandingPage" />;

  const heading = intl.formatMessage({
    id: 'SubscriptionPage.successTitle',
  });
  const message = intl.formatMessage({
    id: 'SubscriptionPage.successMessage',
  });

  return (
    <StaticPage
      title="Success"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'SuccessPage',
        description: { heading },
        name: 'Success page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
          <div>
            <div className="bg-white h-full max-w-3xl sm:my-6 mx-auto sm:shadow sm:rounded-lg">
              <div className="flex flex-col items-center p-24 text-center">
                <BsFillPatchCheckFill className="w-24 h-24 text-green-400" />
                <h5 className="m-0 mt-8 text-xl text-gray-600 font-extrabold">{heading}</h5>
                <p className="m-0 text-gray-500 text-md font-semibold">{message}</p>
              </div>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
}

export default compose(
  injectIntl,
  withRouter
)(SuccessPage);
