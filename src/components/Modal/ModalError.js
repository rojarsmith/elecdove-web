import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// core components
import Button from "components/CustomButtons/Button.js";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

/**
 * Modal after logout
 * 
 * @param {NewType} props.open Control modal display on/off.
 * @param {afterclose} props.afterclose Callback after close.
 */
export default function ModalError(props) {
  const [open, setOpen] = useState(false);
  const afterclose = props.afterclose ? props.afterclose : () => { };
  const [message, setMessage] = useState(props.message ? props.message : '');
  const [keep, setKeep] = useState(props.keep ? props.keep : 5); // Second
  const classes = useStyles();

  useEffect(() => {
    setOpen(props.open);
    setMessage(props.message);
  }, [props]);

  useEffect(() => {
    setKeep(5);
  }, [props]);

  useEffect(() => {
    let timeoutID;
    if (open) {
      if (keep > 0) {
        timeoutID = setTimeout(() => setKeep(keep - 1), 1000);
      } else {
        setOpen(false);
        afterclose();
      }
    }
    return () => {
      clearInterval(timeoutID);
    }
  }, [open, keep, afterclose]);

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false)
          afterclose();
        }}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>Error</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>{message}</p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => {
            setOpen(false);
            afterclose();
          }
          } color="primary">
            Ok ({keep})
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
