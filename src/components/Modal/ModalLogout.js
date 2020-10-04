import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function ModalLogout(props) {
  const [show, setShow] = React.useState(props.open);
  const classes = useStyles();
  console.log(props);
  console.log(props.afterfunc);
  useEffect(() => {
    setShow(props.open);
  }, [props]);

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShow(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          {/* <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setLiveDemo(false)}
          >
            {" "}
            
            <Close //X button
             className={classes.modalClose} />   
          </Button> */}
          <h4 className={classes.modalTitle}>Modal title</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>Woohoo, you're reading this text in a modal!</p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => {
            setShow(false)
             props.afterfunc()
          }
          } color="secondary">
            Close
          </Button>
          <Button color="primary">Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
