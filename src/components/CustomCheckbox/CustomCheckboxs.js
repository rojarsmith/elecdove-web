import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CustomCheckboxs(props) {
  const {
    all,
    checkboxsProps,
    formControlProps
  } = props;

  let checkboxItems = all ? all.map((prop, key) => {
    return (
    // <Checkbox id="emailVerified" />
    <FormControlLabel {...formControlProps}
        control={<Checkbox id={"checkbox" + prop.code}
        //    checked={inputs.emailVerified} onChange={handleChange}
        />}
        label={prop.name}
      />
    )

  }) : undefined

 return (
    <div>
      {checkboxItems}
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