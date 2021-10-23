import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { changeDarkMode } from './slices/appSlice';
import {
  getDuckduckgoList,
  getDuckduckgoPersistList,
  getDuckduckgoQueriesList,
} from './apis/duckduckgoList';
import HistoryDrawer from './components/HistoryDrawer';
import MainAppBar from './components/MainAppBar';
import Search from './components/Search';
import SerarchResults from './components/SearchResults/SearchResults';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    minHeight: 'calc(100vh - 10rem)',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingTop: '10rem',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentRootShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

function App() {
  const [open, setOpen] = useState(true);
  const [duckduckgoSearch, setDuckduckgoSearch] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const { isDarkMode } = useSelector((state) => ({
    isDarkMode: state.app.isDarkMode,
  }));
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );

  const darkModeHandler = () => {
    dispatch(changeDarkMode());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchStr = (event) => {
    const { id, value } = event.target;
    if (id === 'table') {
      setSearchStr(value);
    } else {
      setDuckduckgoSearch(value);
    }
  };

  const handleSearchStrClear = (event) => {
    const { id } = event.currentTarget;
    if (id === 'tableClear') {
      setSearchStr('');
    } else {
      setDuckduckgoSearch('');
    }
  };

  const handleDuckduckgoSearch = (val, id) => {
    if (id === 'not_persist') {
      dispatch(getDuckduckgoList(val));
    } else {
      dispatch(getDuckduckgoPersistList(val));
    }
  };

  useEffect(() => {
    dispatch(getDuckduckgoQueriesList());
  }, [dispatch]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <HistoryDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
          setDuckduckgoSearch={setDuckduckgoSearch}
          handleDuckduckgoSearch={handleDuckduckgoSearch}
        />
        <Paper
          className={clsx(classes.contentRoot, {
            [classes.contentRootShift]: open,
          })}
        >
          <MainAppBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            darkModeHandler={darkModeHandler}
            isDarkMode={isDarkMode}
          />
          <Search
            handleDuckduckgoSearch={handleDuckduckgoSearch}
            handleSearchStr={handleSearchStr}
            handleSearchStrClear={handleSearchStrClear}
            duckduckgoSearch={duckduckgoSearch}
          />
          <SerarchResults
            handleSearchStrClear={handleSearchStrClear}
            handleSearchStr={handleSearchStr}
            searchStr={searchStr}
          />
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
