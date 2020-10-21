import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";

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

// import { dataTableMock } from "variables/general.js";

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
  const [dataSource, _setDataSource] = useState([]);
  const dataSourceRef = useRef(dataSource);
  const setDataSource = (data) => {
    dataSourceRef.current = data;
    _setDataSource(data);
  };

  const account = useSelector(state => state.account);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(creatorAccounts.userAll()).then(() => {
      if (account.responseOK) {
        let userAll = account.userAll;

        // dataTable.
        let dataRows = userAll.map((prop, key) => {
          let row = [];
          row.push(prop.actived);
          row.push(prop.id);
          row.push(prop.name);
          row.push(prop.email);
          return row;
        })

        let rows = refreshDataRows(dataRows);
        setDataSource([...rows]);
      }
    });
  }, [dispatch]);

  const refreshDataRows = (dataRows) => {
    return dataRows.map((prop, key) => {
      return {
        actived: prop[0] ? "T" : "F",
        id: prop[1],
        name: prop[2],
        email: prop[3],
        role: prop[4],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={(event) => clickActive(event, prop[1])}
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
              onClick={(event) => clickEdit(event, prop[1])}
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
              onClick={(event) => clickDelete(event, prop[1])
              }
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    })
  }

  const clickActive = (event, userId) => {
    event.preventDefault();

    let obj = dataSourceRef.current.find(o => o.id === userId);
    alert(
      "Active button on \n{ \nId: " +
      userId +
      ", \nName: " +
      obj.name +
      "\n}."
    );
  };

  const clickEdit = (event, userId) => {
    event.preventDefault();

    let obj = dataSourceRef.current.find(o => o.id === userId);
    alert(
      "EDIT button on \n{ \nId: " +
      userId +
      ", \nName: " +
      obj.name +
      "\n}."
    );
  };

  const clickDelete = (event, userId) => {
    event.preventDefault();

    var newData = dataSourceRef.current;
    newData.find((o, i) => {
      if (o.id === userId) {
        // here you should add some custom code so you can delete the data
        // from this component and from your server as well
        newData.splice(i, 1);
        return true;
      }
      return false;
    });
    setDataSource([...newData]);
  };

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
                  Header: "Actived",
                  accessor: "actived"
                },
                {
                  Header: "ID",
                  accessor: "id"
                },
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Role",
                  accessor: "role"
                },
                {
                  Header: "Actions",
                  accessor: "actions"
                }
              ]}
              data={dataSource}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
