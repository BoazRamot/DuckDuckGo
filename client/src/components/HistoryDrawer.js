import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  Divider,
  ListItem,
  ListItemText,
  Drawer,
  List,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function HistoryDrawer({
  open,
  handleDrawerClose,
  setDuckduckgoSearch,
  handleDuckduckgoSearch,
}) {
  const { pastQueries } = useSelector((state) => ({
    pastQueries: state.duckduckgo.pastQueries,
  }));
  const classes = useStyles();
  const theme = useTheme();

  const handlePastQureyClick = (event) => {
    const text = event.currentTarget.id.split('.ListItem')[0];
    if (!text) return;
    setDuckduckgoSearch(text);
    handleDuckduckgoSearch(text, 'not_persist');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {pastQueries.map((text, index) => (
          <ListItem
            button
            key={`${text}.ListItem.${index}`}
            id={`${text}.ListItem.${index}`}
            onClick={handlePastQureyClick}
          >
            <ListItemText
              primary={text}
              id={`${text}.ListItem.${index}`}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default HistoryDrawer;
