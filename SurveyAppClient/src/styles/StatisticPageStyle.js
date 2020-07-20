import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
    statisticCard: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2, 2, 3, 2),
        width: "45vw",
    },
    statisticTitle: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        width: "45vw",
    },
    chart: {
        marginTop: theme.spacing(3),
    },
    answerBox: {
        backgroundColor: grey[100],
        width: "36vw",
        margin: theme.spacing(1, 0, 0, 3),
        padding: theme.spacing(1, 1, 1, 2),
    }
 })

 export default styles;