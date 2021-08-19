//Stores data in localstorage and gets it again from the local store
export const loadState = () => {
    try {
        const stateVal = localStorage.getItem('state');
        if (stateVal === null) {
            return undefined;
        }
        return JSON.parse(stateVal);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const stateVal = JSON.stringify(state);
        localStorage.setItem('state', stateVal);
    } catch {
        // ignore write errors
    }
};