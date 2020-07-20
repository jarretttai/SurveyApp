import blueGrey from "@material-ui/core/colors/blueGrey";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1, 1, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  mainArea: {
    marginTop: theme.spacing(3),
  },
  listHead: {
    marginTop: theme.spacing(1),
  },
  headFont: {
    fontWeight: 600,
    fontSize: 15,
    marginTop: 10,
    color: blueGrey[600],
  },
  updateIcon: {
    color: blueGrey[500],
    marginTop: 5,
  },
  leftHead: {
    flexGrow: 1,
  },
  addButton: {
    marginTop: 14,
    backgroundColor: blue[600],
    '&:hover': {
      backgroundColor: blue[800],
    }
  },
  urlBox: {
    backgroundColor: blue[50],
    padding: theme.spacing(1, 2, 1, 1),
    marginBottom: theme.spacing(2),
  },
  url: {
    color: blueGrey[600],
    fontWeight: 600,
  },
  dialogButton: {
    color: blue[700],
    marginRight: theme.spacing(1),
  }
});

export default styles;