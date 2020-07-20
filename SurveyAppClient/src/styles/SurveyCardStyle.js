
const styles = theme => ({
    root: {
        display: 'flex',
        marginBottom: theme.spacing(4),
        padding: theme.spacing(1),
        width: "51vw",
        elevation: 5,
    },
    content: {
        flexGrow: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(1),
    },
    detailsItem: {
        margin: theme.spacing(0, 2, 0, 0),
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
    },
    actionItem: {
        margin: theme.spacing(0, 0, 0, 4),
    },
});

export default styles;