import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const useFetchData = (fetchData = { url: '', callBack: () => { }, manualTrigger: false, params: {} }) => {
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            getData();
        } else {
            didMount.current = true;
            if (fetchData.manualTrigger) {
                getData();
            }
        }
    }, [fetchData]);

    console.log("1");
    console.log("fetchData", fetchData);
    const getData = () => {
        console.log("2");
        setIsLoading(true);
        setError(null);
        axios
            .get(fetchData.url, {
                params: {
                    ...fetchData.params
                },
            })
            .then((res) => {
                setResult(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });

    }

    return (
        { isLoading, error, result }
    )
}
export default useFetchData