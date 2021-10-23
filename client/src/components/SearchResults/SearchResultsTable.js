import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TablePagination } from '@material-ui/core';
import SearchTable from './SearchTable';

function SearchResultsTable({ searchStr, setStrCounter }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const numOfStrRef = useRef();
  const { rows } = useSelector((state) => ({
    rows: state.duckduckgo.rows,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSumOfStr = useCallback(() => {
    if (!numOfStrRef.current || searchStr.length === 0) {
      setStrCounter(0);
      return;
    }
    const rowsInTable = numOfStrRef.current.props.itemData.rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    let sum = 0;
    for (let index = 0; index < rowsInTable.length; index++) {
      const element = rowsInTable[index].title.toLowerCase();
      const regExp = new RegExp(searchStr.toLowerCase(), 'g');
      const count = (element.match(regExp) || []).length;
      sum += count;
    }
    setStrCounter(sum);
  }, [page, rowsPerPage, searchStr, setStrCounter]);

  useEffect(() => {
    getSumOfStr();
  }, [getSumOfStr]);

  return (
    <>
      <SearchTable
        searchStr={searchStr}
        numOfStrRef={numOfStrRef}
        page={page}
        rowsPerPage={rowsPerPage}
        rows={rows}
      />
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { value: rows.length, label: 'All' },
        ]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default SearchResultsTable;
