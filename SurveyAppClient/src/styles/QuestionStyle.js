const styles = theme => ({
    questionPaper: {
        width: "45vw",
        marginBottom: theme.spacing(3),
    },
    mainArea: {
        flexGrow: 1,
    },
    contentInput: {
        width: "28vw",
        marginBottom: theme.spacing(2),
    },
    typeSelector: {
        margin: theme.spacing(0, 0, 1, 1),
        width: 180,
    },
    optionIcon: {
        margin: theme.spacing(4, 2, 1, 2),
    },
    optionInput: {
        margin: theme.spacing(1, 2, 1, 2),
    },
    cascadeInput: {
        margin: theme.spacing(1, 2, 1, 2),
        width: theme.spacing(10),
    },
    optionDelete: {
        margin: theme.spacing(1, 2, 1, 2),
    },
    optionAddButton: {
        margin: theme.spacing(2),
    },
    deleteQuestionButton: {
        margin: theme.spacing(0, 2),
    },
    answerInput: {
        marginTop: theme.spacing(2),
        marginLeft: "5vw",
        width: "23vw",
    },
    radioOption: {
        marginLeft: "4vw", 
        marginTop: theme.spacing(2),
    },
    radioNumber: {
        marginLeft: 8,
        marginBottom: theme.spacing(1),
    },
    answerArea: {
        margin: theme.spacing(2),
    },
    questionArea: {
        margin: theme.spacing(2, 1, 0, 2),
    }
});

export default styles;