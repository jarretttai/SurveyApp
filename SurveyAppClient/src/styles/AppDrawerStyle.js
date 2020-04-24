import { grey } from "@material-ui/core/colors";

const drawerWidth = 280;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        elevation: 10,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 1, 0, 0),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start"
    },
    drawerBody: {
        paddingRight: theme.spacing(2),
    },
    logo: {
        width: "60%",
        marginRight: theme.spacing(2),
    },
    listIcon: {
        margin: theme.spacing(0,2,0,1),
    },
    listText: {
        fontWeight: 600,
        color: grey[600],
    }
});

export default styles;