import { whiteColor } from 'assets/jss/material-dashboard-pro-react';
import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoadingIndicator(props) {
    return (
        <div style={{
            backgroundColor: whiteColor,
            width: "100%",
            height: "100vh",
            position: "fixed",
            display: "flex",
            opacity: 0.8,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
            flexDirection: "column"
        }}>
            <div style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '30px',
                marginBottom: "10vh",
                height: "100",
                fontSize: "2.5em"
            }}>
                Loading ...
            </div>
            <div>
                <Loader type="ThreeDots" color="#2BAD60" width="100%" />
            </div>
        </div>
    );
}