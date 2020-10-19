import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainerDash.js";
import GridItem from "components/Grid/GridItemDash.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/CardDash/Card.js";
import CardBody from "components/CardDash/CardBody.js";
import CardIcon from "components/CardDash/CardIcon.js";
import CardHeader from "components/CardDash/CardHeader.js";
import ReactTable from "components/CustomReactTable/CustomReactTable.js";
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionModals, actionAuthentications, actionMessages, actionAccounts } from "redux/action";
import { creatorAuthentications, creatorAccounts } from "redux/creator";

import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

export default function UserManagement() {
  const account = useSelector(state => state.account);
  const [data, setData] = React.useState(
    dataTable.dataRows.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find(o => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                  obj.name +
                  ", \nposition: " +
                  obj.position +
                  ", \noffice: " +
                  obj.office +
                  ", \nage: " +
                  obj.age +
                  "\n}."
                );
              }}
              color="info"
              className="like"
            >
              <Favorite />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find(o => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                  obj.name +
                  ", \nposition: " +
                  obj.position +
                  ", \noffice: " +
                  obj.office +
                  ", \nage: " +
                  obj.age +
                  "\n}."
                );
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    })
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(creatorAccounts.userAll());
  }, [dispatch]);

  useEffect(() => {
    if (account.responseOK) {
      let userAll = account.userAll;
      let userAll2 = account.userAll;
    }
  }, [account.responseOK]);

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Update {'&'} Delete</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Position",
                  accessor: "position"
                },
                {
                  Header: "Office",
                  accessor: "office"
                },
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Actions",
                  accessor: "actions"
                }
              ]}
              data={data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
