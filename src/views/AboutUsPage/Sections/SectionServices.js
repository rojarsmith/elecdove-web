import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Gesture from "@material-ui/icons/Gesture";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import servicesStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/servicesStyle.js";

const useStyles = makeStyles(servicesStyle);

export default function SectionServices() {
  const classes = useStyles();
  return (
    <div className={classes.services}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mlAuto,
            classes.mrAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>We have long relationships</h2>
          <h5 className={classes.description}>
             With our distributors and direct customers – with mutual trust and collaboration, together we will find the best and most suitable solutions to meet customers’ needs.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="History"
            description={
              <span>
                <p>
                  In 1994 – two student friends started building up the business Emerging Display Technologies Corp. from scratch with the vision of becoming one of the leading display manufacturing companies worldwide – offering the best in Quality, Technology, Service and Value to our customers.{" "}
                </p>
              </span>
            }
            icon={Gesture}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Technology"
            description={
              <span>
                <p>
                 One of the first display companies to embrace Capacitive Touch technology – today we are an integrated touchscreen manufacturer combining displays, touch panels, and cover lenses to provide customers with complete user interface solutions for their products.{" "}
                </p>
              </span>
            }
            icon={Build}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Long Relationships"
            description={
              <span>
                <p>
                  With our distributors and direct customers – with mutual trust and collaboration, together we will find the best and most suitable solutions to meet customers’ needs.{" "}
                </p>
              </span>
            }
            icon="mode_edit"
            iconColor="rose"
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
