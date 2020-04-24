import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  appBar: {
    background: "transparent",
    boxShadow: "none",
  },
  surveyIcon: {
    fontSize: 40,
    marginRight: (0,6,0,6),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  name: {
    flexGrow: 1,
    fontWeight: 500,
    color: grey[600],
  },
  notifIcon: {
    margin: theme.spacing(4),
    bgcolor: theme.palette.primary.light,
  }
});

export default styles;