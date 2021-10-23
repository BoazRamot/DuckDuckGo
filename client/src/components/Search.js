import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  serachRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  serachInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  serachIconButton: {
    padding: 10,
  },
}));

function Search({
  handleDuckduckgoSearch,
  handleSearchStr,
  handleSearchStrClear,
  duckduckgoSearch,
}) {
  const classes = useStyles();

  const handleSerach = (event) => {
    event.preventDefault();
    handleDuckduckgoSearch(duckduckgoSearch);
  };

  return (
    <Paper
      component="form"
      className={classes.serachRoot}
      onSubmit={handleSerach}
    >
      <InputBase
        className={classes.serachInput}
        placeholder="Search Duckduckgo"
        value={duckduckgoSearch}
        onChange={handleSearchStr}
        id="duckduckgo"
      />
      {duckduckgoSearch && (
        <IconButton
          onClick={handleSearchStrClear}
          className={classes.serachIconButton}
          id="duckduckgoClear"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      <IconButton type="submit" className={classes.serachIconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
