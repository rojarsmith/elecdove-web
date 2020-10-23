import React, { useEffect, useState, useCallback } from "react";
import PropTypes, { element } from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CustomCheckboxs(props) {
  const {
    all,
    value,
    checkboxsProps,
    formControlProps
  } = props;
  const [boxs, setBoxs] = useState([]);
  const [initial, setInitial] = useState(true);
  // let checkboxItems = all ? all.map((prop, key) => {
  //   // boxs = { ...boxs, ["checkbox" + prop.code]: false };

  //   return (
  //     // <Checkbox id="emailVerified" />
  //     <FormControlLabel {...formControlProps}
  //       control={<Checkbox id={"checkbox" + prop.code}
  //         // checked={boxs["checkbox" + prop.code]} 
  //         checked={boxs.checkboxROLE_GUEST}
  //         onChange={(event) => handleChange(event)}
  //       />}
  //       label={prop.name}
  //     />
  //   )

  // }) : undefined

  useEffect(() => {
    // if (initial) {
    //   if (all) {
    //     handleReset();

    //     setInitial(false);
    //   }
    // }
    handleReset();
  }, [all]);

  useEffect(() => {
    // if (initial) {
    //   if (all) {
    //     handleReset();

    //     setInitial(false);
    //   }
    // }
    // handleReset();

    value.map((prop, key) => {

      all.map((prop2, key2) => {
        if (prop.code === prop2.code) {
          let idx0;

          boxs.map((prop3, key3) => {
            if (prop3.code === prop2.code) {
              idx0 = key3;
              let dbg = 0;
            }
          })

          setBoxs((prevState) => {
            prevState[idx0].checked = true;
            return (
              prevState
            )
          })
          let dbg = 0;
        }
      });

      // let idx = -1;

      // if (value.length > 0) {
      //   value.findIndex((ele) => {
      //     return ele.code === prop.code;
      //   })
      // }

      // if(idx >= 0){
      //   boxs.map((prop, key) => {
      //     let a = 0;
      //     // checked: (idx >= 0 ? true : false)
      //   })
      // }
    });

  }, [value]);

  // useEffect(() => {
  //   handleReset();
  //   let dbg = 0;
  // }, [all, value]);

  // useEffect(() => {

  //   if (value && all) {
  //     value.map((prop, key) => {
  //       let a = prop;
  //       setBoxs(boxs => ({ ...boxs, ["checkbox" + prop.code]: true }));

  //     })
  //   }
  //   // for (let [key, value] of Object.entries(defaultInputs)) {
  //   //   if (key) { setInputs({ ...inputs, [key]: value }); }
  //   // }


  // }, [value]);


  const handleChange = (event) => {
    console.log("value:" + event.target.value + " checked: " + event.target.checked);

let code;

    for(const each of boxs){
      if( each.code == event.target.id){
        code = each.code;
        each.checked = !each.checked;
        break;
      }
  }

  let  idx0;
  boxs.map((prop3, key3) => {
    if (prop3.code === code) {
      idx0 = key3;
      let dbg = 0;
    }
  })

  setBoxs((prevState) => {
    prevState[idx0].checked = true;
    return (
      prevState
    )
  })

  // setBoxs( boxs);

    // setBoxs({ [event.target.id]: true });
    // setBoxs(() => ({ ['checkboxROLE_GUEST']: true }));
    // setBoxs({["checkbox" + prop.code]: true});
    //find student with that id and set checked value to it
    // for(const each of this.state.studentList){
    //     if( each.id == event.target.value){
    //       each.checked = event.target.checked;
    //     }
    // }

    // //update student list state
    // this.setState({ studentList: this.state.studentList});
  }

  const handleReset = () => {
    if (all) {
      // let boxs = [];

      all.map((prop, key) => {
        let idx = -1;

        if (value.length > 0) {
          value.findIndex((ele) => {
            return ele.code === prop.code;
          })
        }

        boxs.push({
          key: key,
          checked: (idx >= 0 ? true : false),
          ...prop
        });
      });

      // setBoxs({boxs: boxsTemp});
    }
  }

  return (
    <div>
      {
        boxs && boxs.map((item) =>
          //Store the the student id in the value of each check box
          // <div>{student.id} : {student.name} : { student.checked ? "true" : "false" } </div>

          <FormControlLabel {...formControlProps}
            control={<Checkbox id={item.code}
              // checked={boxs["checkbox" + prop.code]} 
              checked={item.checked}
              onChange={(event) => handleChange(event)}
            />}
            label={item.name}
          />

        )
      }
      {/* {checkboxItems} */}
      {/* <FormControlLabel {...formControlProps}
        control={<Checkbox id="emailVerified"
        //    checked={inputs.emailVerified} onChange={handleChange}
        />}
        label="Email Verified"
      />
      <FormControlLabel {...formControlProps}
        control={<Checkbox id="emailVerified"
        //    checked={inputs.emailVerified} onChange={handleChange} 
        />}
        label="Email Verified"
      /> */}
    </div>
  )
}

CustomCheckboxs.propTypes = {
  checkboxsProps: PropTypes.object
}