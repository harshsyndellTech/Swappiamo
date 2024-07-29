import React, { useState, useMemo, useEffect } from 'react';

export default function useInitialValues(initialValues) {
  const [values, setValues] = useState(undefined);
  const newInitialValues = useMemo(() => {
    if (typeof values == 'undefined') return { ...initialValues };
    return { ...initialValues, ...values };
  }, [values]);

  useEffect(() => {
    //cleanup on unmount
    return () => {
      setValues(undefined);
    };
  }, []);
  return { initialValues: newInitialValues, updateInitialValues: setValues };
}
