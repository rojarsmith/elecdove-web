import React, { useEffect, useState, useCallback } from "react";

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

  // var dataSource = dataTable.dataRows.map((prop, key) => {
  //   return {
  //     actived: prop[0],
  //     id: prop[1],
  //     name: prop[2],
  //     email: prop[3],
  //     role: prop[4],
  //     actions: (
  //       // we've added some custom button actions
  //       <div className="actions-right">
  //         {/* use this button to add a like kind of action */}
  //         <Button
  //           justIcon
  //           round
  //           simple
  //           onClick={() => {
  //             let obj = data.find(o => o.id === key);
  //             alert(
  //               "You've clicked LIKE button on \n{ \nName: " +
  //               obj.name +
  //               ", \nposition: " +
  //               obj.position +
  //               ", \noffice: " +
  //               obj.office +
  //               ", \nage: " +
  //               obj.age +
  //               "\n}."
  //             );
  //           }}
  //           color="info"
  //           className="like"
  //         >
  //           <Favorite />
  //         </Button>{" "}
  //         {/* use this button to add a edit kind of action */}
  //         <Button
  //           justIcon
  //           round
  //           simple
  //           onClick={() => {
  //             let obj = data.find(o => o.id === key);
  //             alert(
  //               "You've clicked EDIT button on \n{ \nName: " +
  //               obj.name +
  //               ", \nposition: " +
  //               obj.position +
  //               ", \noffice: " +
  //               obj.office +
  //               ", \nage: " +
  //               obj.age +
  //               "\n}."
  //             );
  //           }}
  //           color="warning"
  //           className="edit"
  //         >
  //           <Dvr />
  //         </Button>{" "}
  //         {/* use this button to remove the data row */}
  //         <Button
  //           justIcon
  //           round
  //           simple
  //           onClick={() => {
  //             var newData = data;
  //             newData.find((o, i) => {
  //               if (o.id === key) {
  //                 // here you should add some custom code so you can delete the data
  //                 // from this component and from your server as well
  //                 newData.splice(i, 1);
  //                 return true;
  //               }
  //               return false;
  //             });
  //             setData([...newData]);
  //           }}
  //           color="danger"
  //           className="remove"
  //         >
  //           <Close />
  //         </Button>{" "}
  //       </div>
  //     )
  //   };
  // })

  const [dataSource, setDataSource] = useState([]);

  const refreshDataRows = (dataRows) => {
   return dataRows.map((prop, key) => {
    return {
      actived: prop[0],
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
            onClick={() => {
              let obj = dataSource.find(o => o.id === key);
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
            onClick={(event) => clickEdit(event, key)}
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
              var newData = dataSource;
              newData.find((o, i) => {
                if (o.id === key) {
                  // here you should add some custom code so you can delete the data
                  // from this component and from your server as well
                  newData.splice(i, 1);
                  return true;
                }
                return false;
              });
              setDataSource([...newData]);
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
  }

  const account = useSelector(state => state.account);

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource])

  useEffect(() => {
    let a = 0;
    // dispatch(creatorAccounts.userAll());
  }, []);


  useEffect(() => {
    let a = 0;
  });

  useEffect(() => {
    // dispatch(creatorAccounts.userAll());
    
  //   var bbb = async () => {
  //   var dbPromise = async () => {
  //     var a = await new Promise(async (resolve, reject) => {
  //       return await dispatch(creatorAccounts.userAll()).then(()=>{
  //         console.log("test");
  //         if (account.responseOK) {
  //           let userAll = account.userAll;
  //           }
  //       });
  //       // db.collection(coll).find(query).toArray(function (err, res) {
  //       //   err ? reject(err) : resolve(res);
  //       // });
  //     })

  //     return a;
  //   };

  //   return await dbPromise();
  // }

    // var qRes = bbb();

    dispatch(creatorAccounts.userAll()).then(()=>{
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
  
        let a = refreshDataRows(dataRows);
        setDataSource([...a]);
      }
    });


    // if (account.responseOK) {
    //   let userAll = account.userAll;
      
    //   // dataTable.
    //   let dataRows = userAll.map((prop, key) => {
    //     let row = [];
    //     row.push(prop.actived);
    //     row.push(prop.id);
    //     row.push(prop.name);
    //     row.push(prop.email);
    //     return row;
    //   })

    //   dataTable.dataRows = dataRows;
    //   let a = refreshDataRows(dataTable);
    //   setData(a);
    // }
  }, [dispatch]);

  const clickEdit = useCallback((event, key) => {
    // event.preventDefault();

    let obj = dataSource.find(o => o.id === key);
    // alert(
    //   "You've clicked EDIT button on \n{ \nName: " +
    //   obj.name +
    //   ", \nposition: " +
    //   obj.position +
    //   ", \noffice: " +
    //   obj.office +
    //   ", \nage: " +
    //   obj.age +
    //   "\n}."
    // );
  }, []);

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
