import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServices, fetchServiceDetails } from '../servicesSlice';
import { Table, Spin, Alert, Button, Typography, Modal, Checkbox, Tag } from 'antd';
import ServiceDetail from './ServiceDetailPage';

const { Title } = Typography;

const ServiceListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { services, loading, error, serviceDetails } = useSelector((state) => state.services);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedServices, setCheckedServices] = useState({});

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const showModal = (id) => {
        dispatch(fetchServiceDetails(id));
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCheckboxChange = (id, checked) => {
        setCheckedServices((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <Checkbox
                        checked={!!checkedServices[record.id]}
                        onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
                    />
                    <Button
                        type="link"
                        onClick={() => {
                            if (checkedServices[record.id]) {
                                showModal(record.id);
                            } else {
                                navigate(`/${record.id}/details`);
                            }
                        }}
                    >
                        {text}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Tag color="blue">{price}</Tag>,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
    ];

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
                <Button type="primary" onClick={() => dispatch(fetchServices())} style={{ marginTop: 16 }}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Services</Title>
            <Table columns={columns} dataSource={services} rowKey="id" bordered />
            <Modal
                title="Service Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <ServiceDetail serviceDetails={serviceDetails} />
                )}
            </Modal>
        </div>
    );
};

export default ServiceListPage;
