import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetails } from '../servicesSlice';

const useServiceDetails = (id) => {
    const dispatch = useDispatch();
    const { serviceDetails, loading, error } = useSelector((state) => state.services);

    useEffect(() => {
        if (id) {
            dispatch(fetchServiceDetails(id));
        }
    }, [dispatch, id]);

    const retry = () => {
        dispatch(fetchServiceDetails(id));
    };

    return { serviceDetails, loading, error, retry };
};

export default useServiceDetails;
