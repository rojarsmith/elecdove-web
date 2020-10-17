import React, { useEffect, useState, useCallback } from "react";
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
import { actionModals, actionAuthentications, actionMessages, actionAccounts } from "redux/action";
import { creatorAuthentications, creatorAccounts } from "redux/creator";
// import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import ValidationUtils from "util/ValidationUtils";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

const useStyles = makeStyles(styles);


export default function UserProfile(props) {
  const authe = useSelector(state => state.authentication);
  const accou = useSelector(state => state.account);
  // const [acc, setAcc] = useState(() => {
  //   if (props.account && props.account != '') {
  //     if (props.account.authorities && props.account.authorities.length <= 0) {
  //       history.push('/');
  //     }
  //     return props.account;
  //   } else {
  //     return { user_name: 'Reading...' }
  //   }
  // });
  const [accountID, setAccountID] = useState(0);
  const [email, setEmail] = useState('');
  const [inputs, setInputs] = useState({
    realname: '',
    realnameState: '',
    realnameStateMessage: '',
    company: '',
    companyState: false,
    companyStateMessage: '',
    job: '',
    jobState: false,
    jobStateMessage: '',
    taxcode: '',
    taxcodeState: false,
    taxcodeStateMessage: '',
    address: '',
    addressState: false,
    addressStateMessage: '',
    phone: '',
    phoneState: false,
    phoneStateMessage: '',
    updateProfileButton: false
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const fetchItems = useCallback(() => {
    dispatch(creatorAccounts.current());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    //dispatch({ type: actionAccounts.GET_CURRENT_INITIAL, action: '' });

    dispatch(creatorAccounts.current({ history: history }));



    // fillDefaultValue();
    // if(init){
    //   setInit(false);
    // //  fetchItems();
    // }
    // dispatch(creatorAccounts.current());
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
  }, [dispatch]);

  useEffect(() => {
    if (accou.responseOK) {
      fillDefaultValue()
      // handleChange({target:{id: 'realname', value: accou.account.personInformation.realName}})
      // setInputs({realname: accou.account.personInformation.realName});
    }
  }, [accou.responseOK]);

  function fillDefaultValue() {
    setAccountID(accou.account.personInformation.id);
    handleChange({ target: { id: 'realname', value: accou.account.personInformation.realName } })
    handleChange({ target: { id: 'company', value: accou.account.personInformation.company } })
    handleChange({ target: { id: 'job', value: accou.account.personInformation.job } })
    handleChange({ target: { id: 'phone', value: accou.account.personInformation.phone } })
    handleChange({ target: { id: 'address', value: accou.account.personInformation.address } })
    handleChange({ target: { id: 'taxcode', value: accou.account.personInformation.taxcode } })
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setInputs(inputs => ({ ...inputs, [id]: value }));
  }

  function handleInputValidate(event) {
    if (process.env.REACT_APP_DEV) console.log()
    handleInputValidateLogic(event.target.id);
  }

  function handleInputValidateLogic(itemname) {

    // if(inputs[itemname] === ''){
    //   setInputs(inputs => ({
    //     ...inputs,
    //     [itemname + 'State']: "error",
    //     [itemname + 'StateMessage']: "Required."
    //   }));
    //   return false;
    // }

    switch (itemname) {
      case 'realname':
        if (inputs.realname === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Please input user name.'
          }));
          return false;
        }
        else if (ValidationUtils.validateRealName(inputs.realname) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid real name.'
          }));
          return false;
        }
        break;
      case 'company':
        if (ValidationUtils.validateCompany(inputs.company) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid company.'
          }));
          return false;
        }
        break;
      case 'job':
        if (ValidationUtils.validateJob(inputs.job) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid job.'
          }));
          return false;
        }
        break;
      case 'phone':
        if (inputs.phone === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "State"]: 'error',
            [itemname + 'StateMessage']: "Required."
          }));
          return false;
        }
        else if (ValidationUtils.validatePhone(inputs.phone) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid phone.'
          }));
          return false;
        }
        break;
      case 'address':
        if (inputs.address === '') {
          setInputs(inputs => ({
            ...inputs,
            [itemname + "State"]: 'error',
            [itemname + 'StateMessage']: "Required."
          }));
          return false;
        }
        else if (ValidationUtils.validateAddress(inputs.address) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid phone.'
          }));
          return false;
        }
        break;
      case 'taxcode':
        if (ValidationUtils.validateTaxCode(inputs.taxcode) === false) {
          setInputs(inputs => ({
            ...inputs,
            [itemname + 'State']: 'error',
            [itemname + 'StateMessage']: 'Invalid phone.'
          }));
          return false;
        }
        break;
      default:
        return false;
    }

    setInputs(inputs => ({
      ...inputs,
      [itemname + 'State']: 'success',
      [itemname + 'StateMessage']: ''
    }));
    return true;
  }

  const handleClickUpdateProfileButton = (event) => {
    event.preventDefault();

    if (checkInputComplete(['realname', 'company', 'job', 'phone', 'address', 'taxcode']) === false) {
      return false;
    }


  }

  function checkInputComplete(inputs) {
    var validates = [];

    for (let i = 0; i < inputs.length; i++) {
      validates[i] = handleInputValidateLogic(inputs[i]);
    }

    var result = true;

    for (let i = 0; i < validates.length; i++) {
      result = result && validates[i];
    }

    return result;
  }
  
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
                    User Name: {accou.account?.name}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    Email: {accou.account?.email}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Real Name *"
                      id="realname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.realname,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                        // defaultValue only gets set on initial load for a form. 
                        // After that, it won't get "naturally" updated because the intent was only to set an initial default value.
                        //  defaultValue: (accou.account?.personInformation?.realName),

                        // Lock input can not control.
                        //  value: (accou.account?.personInformation?.realName)
                        // defaultValue:"aaaa"
                      }}
                      success={inputs.realnameState === "success"}
                      error={inputs.realnameState === "error"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company"
                      id="company"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.company,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                      }}
                      success={inputs.companyState === "success"}
                      error={inputs.companyState === "error"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Job"
                      id="job"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.job,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                      }}
                      success={inputs.jobState === "success"}
                      error={inputs.jobState === "error"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone *"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.phone,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                      }}
                      success={inputs.phoneState === "success"}
                      error={inputs.phoneState === "error"}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address *"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.address,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                      }}
                      success={inputs.addressState === "success"}
                      error={inputs.addressState === "error"}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tax Code"
                      id="taxcode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: inputs.taxcode,
                        onChange: (event) => handleChange(event),
                        onBlur: (event) => handleInputValidate(event)
                      }}
                      success={inputs.taxcodeState === "success"}
                      error={inputs.taxcodeState === "error"}
                    />
                    <div className={classes.formCategory}>
                      <small>*</small> Required fields
              </div>
                  </GridItem>
                </GridContainer>
                <Button id="update-profile-button" color="rose" className={classes.updateProfileButton}
                  onClick={(event) => handleClickUpdateProfileButton(event)}>
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
