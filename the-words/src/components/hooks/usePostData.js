import { useState } from "react";
import axios from "axios";

const usePostData = ({ url = '', callBack = () => { }, body = {} }) => {
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const postData = () => {
        setIsLoading(true);
        setError(null);
        axios
            .post(url, body)
            .then((res) => {
                setResult(res.data);
                callBack(res.data)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });

    }

    return (
        { isLoading, error, result, postData }
    )
}
export default usePostData