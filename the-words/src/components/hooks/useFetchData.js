import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = ({ url = '', callBack = () => { }, params = {}, enabled = true }) => {
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (enabled) {
            getData();
        }
    }, []);

    const getData = () => {
        setIsLoading(true);
        setError(null);
        axios
            .get(url, {
                params: {
                    ...params
                },
            })
            .then((res) => {
                setResult(res.data);
                callBack(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });

    }

    return (
        { isLoading, error, result, getData }
    )
}
export default useFetchData