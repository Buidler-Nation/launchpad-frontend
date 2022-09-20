import React, { useState, forwardRef, useCallback } from "react";

import { useSnackbar, SnackbarContent } from "notistack";
import classnames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Close, ExpandMore, CheckCircle, Warning, Error, Info, Done } from "@mui/icons-material";
import { AlertColor } from "@mui/lab/Alert";

import { Message } from "../../store/slices/messages-slice";

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            minWidth: "344px !important",
        },
        maxWidth: 500,
    },
    card: {
        width: "100%",
    },
    error: {
        backgroundColor: "#d32f2f",
    },
    info: {
        backgroundColor: "#2979ff",
    },
    warning: {
        backgroundColor: "#ffa000",
    },
    success: {
        backgroundColor: "#43a047",
    },
    typography: {
        color: "#FFFFFF",
        fontFamily: "Montserrat SemiBold",
    },
    actionRoot: {
        padding: "8px 8px 8px 16px",
        justifyContent: "space-between",
        color: "#FFFFFF",
    },
    icons: {
        marginLeft: "auto",
    },
    expand: {
        padding: "8px 8px",
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        color: "#FFFFFF",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    collapse: {
        padding: 16,
    },
    checkIcon: {
        fontSize: 20,
        color: "#b3b3b3",
        paddingRight: 4,
    },
    checkIconCopy: {
        color: "#43a047",
    },
    button: {
        padding: 0,
        textTransform: "none",
    },
    errorWrap: {
        marginTop: 10,
    },
    errorText: {
        whiteSpace: "pre-wrap",
        maxHeight: 300,
        overflow: "auto",
        background: "rgba(0,0,0,0.1)",
        padding: 5,
        borderRadius: 5,
    },
}));

export const SnackMessage = forwardRef<HTMLDivElement, { id: string | number; message: Message }>((props, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const [isCopy, setIsCopy] = useState(false);

    const handleExpandClick = useCallback(() => {
        setExpanded(oldExpanded => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
        closeSnackbar(props.id);
    }, [props.id, closeSnackbar]);

    const getIcon = (severity: AlertColor) => {
        switch (severity) {
            case "error":
                return <Error color="inherit" />;
            case "info":
                return <Info color="inherit" />;
            case "success":
                return <Done color="inherit" />;
            case "warning":
                return <Warning color="inherit" />;
            default:
                return <div />;
        }
    };

    return (
        <SnackbarContent ref={ref} className={classes.root}>
            <Card className={classnames(classes.card, classes[props.message.severity])}>
                <CardActions classes={{ root: classes.actionRoot }}>
                    {getIcon(props.message.severity)}
                    <Typography variant="subtitle2" className={classes.typography}>
                        {props.message.text}
                    </Typography>
                    <div className={classes.icons}>
                        {props.message.error && (
                            <IconButton aria-label="Show more" className={classnames(classes.expand, { [classes.expandOpen]: expanded })} onClick={handleExpandClick}>
                                <ExpandMore color="inherit" />
                            </IconButton>
                        )}
                        <IconButton className={classes.expand} onClick={handleDismiss}>
                            <Close color="inherit" />
                        </IconButton>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Paper className={classes.collapse}>
                        <CopyToClipboard text={JSON.stringify(props.message.error)} onCopy={() => setIsCopy(true)}>
                            <Button size="small" className={classes.button}>
                                <CheckCircle className={classnames(classes.checkIcon, { [classes.checkIconCopy]: isCopy })} />
                                Copy to clipboard
                            </Button>
                        </CopyToClipboard>
                        <div className={classes.errorWrap}>
                            <Typography>Error message: </Typography>
                            <Typography className={classes.errorText}>{JSON.stringify(props.message.error, null, 2)}</Typography>
                        </div>
                    </Paper>
                </Collapse>
            </Card>
        </SnackbarContent>
    );
});