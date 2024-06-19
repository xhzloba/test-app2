import React from 'react';
import { Spin, Alert, Button } from 'antd';

const withLoadingAndError = (WrappedComponent) => {
    return ({ loading, error, retry, ...props }) => {
        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Spin size="large" />
                </div>
            );
        }

        if (error) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Alert message="Error" description={error} type="error" showIcon />
                    <Button type="primary" onClick={retry} style={{ marginTop: 16 }}>
                        Retry
                    </Button>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export {withLoadingAndError};
