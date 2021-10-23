import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody } from '@material-ui/core';
import TableBodyRows from './TableBodyRows';

const useStyles = makeStyles((theme) => ({
  tablePaper: {
    width: '80%',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 'calc(80vh - 10rem)',
    marginBottom: '5rem',
  },
  table: {
    minWidth: 750,
  },
  tableBody: {
    height: 'calc(80vh - 64px - 52px - 10rem)',
  },
  tableRow: {
    backgroundColor: 'yellow',
  },
}));

function SearchTable({
  searchStr,
  numOfStrRef,
  page,
  rowsPerPage,
  rows,
}) {
  const classes = useStyles();

  return (
    <Table className={classes.table} component="div">
      <TableBody component="div" className={classes.tableBody}>
        <TableBodyRows
          itemCount={rowsPerPage}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          searchStr={searchStr}
          numOfStrRef={numOfStrRef}
          className={classes.tableRow}
        />
      </TableBody>
    </Table>
  );
}

export default SearchTable;
