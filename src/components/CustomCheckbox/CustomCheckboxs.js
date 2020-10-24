import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CustomCheckboxs(props) {
  const {
    checkboxs,
    checkboxsProps,
    formControlProps
  } = props;
  const [checked, setChecked] = useState([...props.checkedIndexes]);
  const handleToggle = (item) => {
    const currentIndex = checked.map((item2) => { return item2.code }).indexOf(item.code);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    if (props.checkedIndexes.length >= 1) {
      setChecked([...props.checkedIndexes]);
    }
  }, [props.checkedIndexes]);

  const handleChangeChecked = (item) => {
    if (!checked || checked.length <= 0) return false;
    let idx = checked.map((item2) => { return item2.code }).indexOf(item.code)
    if (idx >= 0) {
      return true;
    }
    return false;
  }

  return (
    <div>
      {
        checkboxs && checkboxs.map((item) =>
          <FormControlLabel {...formControlProps}
            key={item.id}
            control={<Checkbox id={item.code}
              {...checkboxsProps}
              checked={handleChangeChecked(item)
              }
              onClick={() => handleToggle(item)}
            />}
            label={item.name}
          />
        )
      }
    </div>
  )
}

CustomCheckboxs.propTypes = {
  checkboxsProps: PropTypes.object
}