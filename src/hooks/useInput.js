import useLocalStorage from "./useLocalStorage";

// If you want to persist value throughout application, use this input hook
const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const resetValue = () => setValue(initValue);

    const handleValue = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, resetValue, handleValue];
}

export default useInput 