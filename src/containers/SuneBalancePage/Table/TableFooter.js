import React, { useEffect } from 'react';

import styles from './TableFooter.module.css';

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  if ((range ?? []).length <= 1)
    return (
      <div className={styles.tableFooter}>
        <div className={styles.container}>
          <span style={{ color: 'transparent', userSelect: 'none' }}>No Pagination</span>
        </div>
      </div>
    );
  console.log({ range, setPage, page, slice });
  return (
    <div className={styles.tableFooter}>
      <div className={styles.container}>
        {range.map((el, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.button} ${
              page === el ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableFooter;
