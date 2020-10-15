import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/CardDash/Card.js";
import CardBody from "components/CardDash/CardBody.js";
import CardHeader from "components/CardDash/CardHeader.js";
import CardIcon from "components/CardDash/CardIcon.js";
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionModals, actionAuthentications, actionMessages } from "redux/action";
import { creatorAuthentications, creatorAccounts } from "redux/creator";
// import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

const useStyles = makeStyles(styles);


export default function UserProfile(props) {
  const authe = useSelector(state => state.authentication);
  const [acc, setAcc] = useState(() => {
    if (props.account && props.account != '') {
      if (props.account.authorities && props.account.authorities.length <= 0) {
        history.push('/');
      }
      return props.account;
    } else {
      return { user_name: 'Reading...' }
    }
  });
  const [email, setEmail] = useState('');
  const [inputs, setInputs] = useState({
    realname: '',
    realnameError: false,
    realnameErrorMessage: '',
    company: '',
    companyError: false,
    companyErrorMessage: '',
    job: '',
    jobError: false,
    jobErrorMessage: '',
    taxcode: '',
    taxcodeError: false,
    taxcodeErrorMessage: '',
    address: '',
    addressError: false,
    addressErrorMessage: '',
    phone: '',
    phoneError: false,
    phoneErrorMessage: '',
    updateProfileButton: false
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    dispatch(creatorAccounts.current());
    // if (props.account && props.account != '') 
    // {
    //   dispatch(creatorAccounts.getAccountDetail({
    //     // user: authe.user.access_token,
    //     // account: props.account.user_name,
    //     user: authe.user,
    //     account: props.account,
    //     hitory: history
    //   }));
    // }
    // if (typeConfirmMail) {
    //   dispatch(creatorAuthentications.confirmMail(token));
    // }
  }, []);

  return (
    <div>
      {/* {account.loading && <LoadingIndicator />} */}
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    User Name: {acc.user_name}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    Email: aaa@aaa.com
                </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Real Name"
                      id="realname"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company"
                      id="company"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Job"
                      id="job"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tax Code"
                      id="taxcode"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button id="update-profile-button" color="rose" className={classes.updateProfileButton}>
                  Update Profile
              </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
