import React, { useEffect, useLayoutEffect, useState } from 'react';

const IT_LOCALE_KEY = 'it';

export default function useLocale(ITComponent, Component) {
  // const [NewComponent, setNewComponent] = useState(null);
  // let component = null;
  // useEffect(() => {
  //   if (typeof window != 'undefined') {
  //     console.log('hitting');
  //     const usedLocale = localStorage.getItem('locale');
  //     if (usedLocale == IT_LOCALE_KEY) {
  //       console.log('if');
  //       setNewComponent(<ITComponent />);
  //       // component = <ITComponent />;
  //     } else {
  //       // console.log('else', Component);
  //       // component = <Component />;
  //       setNewComponent(<Component />);
  //     }
  //   }
  // }, []);
  // console.log('else', { NewComponent });
  // // return NewComponent;
  return <ITComponent/>;
}
