import { useParams } from 'react-router-dom';
import {Card, Alert, Tag} from 'antd';
import useServiceDetails from '../hooks/useServiceDetails';
import {withLoadingAndError} from '../hoc/withLoadingAndError';

const ServiceDetail = ({ serviceDetails }) => {
    if (!serviceDetails) {
        return <Alert message="No details available" type="info" />;
    }

    return (
        <Card title={serviceDetails.name} style={{ width: '100%' }}>
            <p>Price: <Tag color="orange">{serviceDetails.price}</Tag></p>
            <p>Content: {serviceDetails.content}</p>
        </Card>
    );
};

const ServiceDetailWithLoadingAndError = withLoadingAndError(ServiceDetail);

const ServiceDetailPage = () => {
    const { id } = useParams();
    const { serviceDetails, loading, error, retry } = useServiceDetails(id);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ServiceDetailWithLoadingAndError
                loading={loading}
                error={error}
                retry={retry}
                serviceDetails={serviceDetails}
            />
        </div>
    );
};

export default ServiceDetailPage;

