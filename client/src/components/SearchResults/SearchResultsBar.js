import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Badge,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  tableBody: {
    height: 'calc(80vh - 64px - 52px - 10rem)',
  },
  tableSearch: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  tableSearchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableInputRoot: {
    color: 'inherit',
  },
  tableInputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
  serachIconButton: {
    padding: 10,
  },
}));

function SearchResultsBar({
  strCounter,
  searchStr,
  handleSearchStr,
  handleSearchStrClear,
}) {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div">
          DuckDuckGo Search Results
        </Typography>
        <div className={classes.grow} />
        <Badge badgeContent={strCounter} color="error">
          <div className={classes.tableSearch}>
            <div className={classes.tableSearchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.tableInputRoot,
                input: classes.tableInputInput,
              }}
              value={searchStr || ''}
              onChange={handleSearchStr}
              id="table"
            />
            {searchStr && (
              <IconButton
                onClick={handleSearchStrClear}
                className={classes.serachIconButton}
                id="tableClear"
              >
                <HighlightOffIcon />
              </IconButton>
            )}
          </div>
        </Badge>
      </Toolbar>
    </AppBar>
  );
}

export default SearchResultsBar;
