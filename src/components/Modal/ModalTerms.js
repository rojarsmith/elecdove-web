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

export default function ModalTerms(props) {
  const [open, setOpen] = useState(false);
  const afterclose = props.afterclose ? props.afterclose : () => { };
  const classes = useStyles();

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

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
          <h4 className={classes.modalTitle}>Disclaimer</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>
            Welcome to this Web site, which is owned and operated by Elecdove and/or Elecdove's subsidiary, affiliate or related company (throughout these Terms of Use 'Elecdove' refers collectively to Elecdove and its subsidiaries, affiliates and related companies) (the 'Site'). Elecdove maintains the Site as a service to its visitors, subject to the following Terms and Conditions concerning the use of the Site ('Terms of Use'). When you use the Site, you accept the Terms of Use; if you do not agree to the Terms of Use you may not use the Site. Elecdove reserves the right to modify content on the Site and these Terms of Use periodically without prior notice.
<br /><br />
Use of Content on the Site
<br /><br />
You may view, download and print contents from the Site subject to the following conditions: (a) the content may be used solely for information purposes; and (b) the content may not be modified or altered in any way. You may not republish, distribute, prepare derivative works, or otherwise use the content other than as explicitly permitted herein.
<br /><br />
You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of Elecdove without the express written consent of Elecdove. You may not use any meta tags or any other 'hidden text' utilizing Elecdove's name or trademarks without the express written consent of Elecdove. You may not use any Elecdove logo or other proprietary graphic or trademark as part of the link without express written permission.
<br /><br />
You do not acquire any ownership rights to any content in the Site. Any unauthorized use terminates the permission or license granted by Elecdove.
<br /><br />
Reviews, Comments, Communications, And Other Content
You may submit comments and provide other content so long as the content is not obscene, illegal, threatening, or defamatory and so long as the content does not invade the privacy or infringe the intellectual property of a third party. Further, such content may not contain software viruses, mass mailings, chain letters, or any form of 'spam.' You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of the information.
<br /><br />
By submitting information, you grant Elecdove a nonexclusive, royalty-free, perpetual, irrevocable and fully sub licensable right to reproduce, use, modify, publish, adapt, translate, create derivative works from, distribute and display such content throughout the world in any media. By submitting information you also represent and warrant that that the content is accurate; you own or have permission to use the content that you submit; and that use of the content will not cause injury to any person or entity.
<br /><br />
Products and Services Offered By Elecdove on the Site
Elecdove offers products and services on the Site. When you enroll to obtain a product or service from Elecdove on the Site, you accept the specific agreement applicable to that product or service. Your use of any such product or service offered on the Site is governed by the Terms and Conditions in the agreement for that product or service. Except as provided in that agreement, Elecdove does not warrant that any product descriptions or content contained in this Web site is accurate, current, reliable, complete or error-free.
<br /><br />
Copyright Information
<br /><br />
The Site and the content within the Site are the property of Elecdove or its suppliers and are protected by Australian copyright laws and international treaty provisions. The compilation, organization and display of the content as well as all software and inventions used on and in connection with this Site are the exclusive property of Elecdove. Elecdove reserves all rights in the Site and its content not specifically granted in any agreements with Elecdove or in the Terms of Use.
<br /><br />
Privacy Statements
<br /><br />
Because we respect your right to privacy, we have developed a Privacy Statement to inform you about our privacy practices. Please view the Privacy Policy applicable to the specific site you are reviewing.
<br /><br />
Third Party Web Sites and Information
<br /><br />
The Site may provide hyperlinks to third party Web sites or access to third party content. Elecdove does not control, endorse, or guarantee content found in such sites. You agree that Elecdove is not responsible for any content, associated links, resources, or services associated with a third party site. You further agree that Elecdove shall not be liable for any loss or damage of any sort associated with your use of third party content. Links and access to these sites are provided for your convenience only.
<br /><br />
Disclaimer
<br /><br />
EXCEPT AS EXPRESSLY STATED IN AN AGREEMENT BETWEEN YOU AND Elecdove, ALL CONTENT, SERVICES, PRODUCTS AND SOFTWARE PROVIDED ON THIS WEB SITE ARE PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. Elecdove AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, THOSE OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. YOU ARE SOLELY RESPONSIBLE FOR THE APPROPRIATENESS OF THE SITE, ITS CONTENT, AND THE PRODUCTS AND SERVICES OFFERED BY Elecdove ON THE SITE FOR YOUR INTENDED APPLICATION AND USE. Elecdove DOES NOT WARRANT THAT THE SITE, ITS CONTENT, OR THE PRODUCTS AND SERVICES IT OFFERS ON THE SITE MEET YOUR REQUIREMENTS. SUBJECT TO THE TERMS OF ANY AGREEMENT BETWEEN YOU AND Elecdove, Elecdove, ITS SUPPLIERS AND LICENSORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL, OR PUNITIVE DAMAGES, EVEN IF Elecdove, ITS SUPPLIERS OR LICENSORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
<br /><br />
Indemnity
<br /><br />
You agree to defend, indemnify, and hold harmless Elecdove, employees, attorneys and agents ('Indemnities') against all claims, expenses, liabilities, losses, costs and damages, including reasonable attorney's fees, that the Indemnities may incur (i) in connection with your use of the Site or any hyper linked Web site or (ii) resulting from content you supply.
<br /><br />
Applicable Laws
<br /><br />
All matters relating to your access to and use of the Site shall be governed by Australian federal law or the laws of the States of where the specific Web site you are viewing is hosted without regard to its conflict of law principles. Any legal action or proceeding relating to your access to or use of the Site shall be instituted in a state or federal court in the jurisdiction in which the specific Web site you are viewing is hosted.
<br /><br />
If there is a determination that any provision of these Terms of Use is invalid or unenforceable, that determination will not affect the rest of the Terms of Use and the Terms of Use shall be deemed amended to the minimum extent necessary to make them valid and enforceable.
<br /><br />
Contact Information
<br /><br />
If you have any questions regarding these Terms of Use, please click here to contact us.
          </p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => {
            setOpen(false);
            afterclose();
          }
          } color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
