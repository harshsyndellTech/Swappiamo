import React from 'react';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  Page,
} from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import css from './LoadingPage.module.css';

function LoadingPage() {
  return (
    <Page title={'Loading...'}>
      <LayoutSingleColumn className="landing">
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <LoadingSkeleton />
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
}

export default LoadingPage;

export const LoadingSkeleton = props => {
  return (
    <div className={css.container}>
      <div className={css.reveal}></div>
    </div>
  );
};
