import React, { useState } from 'react';

import useTable from './useTable';
import TableFooter from './TableFooter';
import styles from './Table.module.css';
import moment from 'moment';
import { evaluateLabel, types } from '../../../util/transactionHistoryHelpers';
import { NamedLink } from '../../../components';
import { Link } from 'react-router-dom';
import css from './Table.module.css';
const Table = ({
  data,
  rowsPerPage,
  headers,
  intl,
  tableHeadingDate,
  tableHeadingTransactionId,
  tableHeadingAmountDue,
  tableHeadingTransactionType,
  tableUserJoined,
  tableHeadingStatus,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const getSignMaybe = el => {
    const itemTypes = [
      types.CUSTOMER_ORDER,

      // types.CANCEL_SUBSCRIPTION
    ];
    return itemTypes.includes(el.type) ? '-' : ' ';
  };

  const viewButton = intl.formatMessage({ id: 'TransactionHistoryTable.viewButton' });
  const getStatusText = status => {
    switch (status) {
      case 'PENDING':
        return intl.formatMessage({ id: 'TransactionHistoryTable.pending' });
      case 'COMPLETED':
        return intl.formatMessage({ id: 'TransactionHistoryTable.completed' });
    }
  };

  return (
    <div>
      {/* <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr className="bg-gray-200">
            {headers.map(h => (
              <th key={h} className="py-2 px-4 tracking-wide text-black whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead> */}
      <div>
        {slice.map(el => (
          <div key={el.key} className={css.subContainer}>
            <div className={css.line}>
              <p className={css.label}>{tableHeadingDate}</p>
              <p className={css.text}>{moment(new Date(el.date)).format('DD/MM/YYYY')}</p>
            </div>
            <div className={css.line}>
              <p className={css.label}>{tableHeadingTransactionId}</p>
              <p className={css.text}>
                {el?.id ? (
                  <p>{el.id}</p>
                  // <Link
                  //   to={`${el.type == types.CUSTOMER_ORDER ? 'order' : 'sale'}/${el.id}/details`}
                  // >
                  //   {viewButton}
                  // </Link>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className={css.line}>
              <p className={css.label}>{tableHeadingAmountDue}</p>
              <p className={css.text}>
                {getSignMaybe(el)} {el.amount}
              </p>
            </div>
            <div className={css.line}>
              <p className={css.label}>{tableHeadingTransactionType}</p>
              <p className={css.text}>{evaluateLabel(el.type, intl)}</p>
            </div>
            <div className={css.line}>
              <p className={css.label}>{tableUserJoined}</p>
              <p className={css.text}>
                {el?.user_joined_name ? (
                  <Link to={`/u/${el.user_joined_id}`}>{el.user_joined_name}</Link>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className={css.line}>
              <p className={css.label}>{tableHeadingStatus}</p>
              <p className={css.text}>{getStatusText(el.status)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <tbody>
          {slice.map(el => (
            <tr key={el.key}>
              <td className="text-center py-2 px-2 whitespace-nowrap">
                {moment(new Date(el.date)).format('DD/MM/YYYY')}
              </td>

              <td className="text-center py-2 px-2 whitespace-nowrap">
                {el?.id ? (
                  <Link
                    to={`${el.type == types.CUSTOMER_ORDER ? 'order' : 'sale'}/${el.id}/details`}
                  >
                    {viewButton}
                  </Link>
                ) : (
                  ''
                )}
              </td>
              <td className="text-center py-2 px-2 whitespace-nowrap">
                {getSignMaybe(el)} {el.amount}
              </td>
              <td className="text-center py-2 px-2 whitespace-nowrap">
                {evaluateLabel(el.type, intl)}
              </td>

              <td className="text-center py-2 px-2 whitespace-nowrap">
                {el?.user_joined_name ? (
                  <Link to={`/u/${el.user_joined_id}`}>{el.user_joined_name}</Link>
                ) : (
                  ''
                )}
              </td>
              <td className="text-center py-2 px-2 whitespace-nowrap">
                {getStatusText(el.status)}
              </td>
            </tr>
          ))}
          <Records slice={slice} getStatusText={getStatusText} viewButton={viewButton} />
        </tbody>
      </table> */}
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default Table;
