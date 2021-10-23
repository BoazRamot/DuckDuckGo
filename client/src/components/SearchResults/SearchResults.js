import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import SearchResultsBar from './SearchResultsBar';
import SearchResultsTable from './SearchResultsTable';

const useStyles = makeStyles((theme) => ({
  tablePaper: {
    width: '80%',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 'calc(80vh - 10rem)',
    marginBottom: '5rem',
  },
}));

function SearchResults({
  handleSearchStrClear,
  handleSearchStr,
  searchStr,
}) {
  const [strCounter, setStrCounter] = useState(0);
  const classes = useStyles();

  return (
    <Paper className={classes.tablePaper}>
      <SearchResultsBar
        strCounter={strCounter}
        searchStr={searchStr}
        handleSearchStr={handleSearchStr}
        handleSearchStrClear={handleSearchStrClear}
      />
      <SearchResultsTable
        searchStr={searchStr}
        setStrCounter={setStrCounter}
      />
    </Paper>
  );
}

export default SearchResults;
