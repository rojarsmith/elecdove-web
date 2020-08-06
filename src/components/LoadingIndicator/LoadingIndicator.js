import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoadingIndicator(props) {
    return (
        <div>
            <div style={{ display: 'block', textAlign: 'center', marginTop: '30px' }}>
                Loading ...
        </div>
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
        </div>
    );
}