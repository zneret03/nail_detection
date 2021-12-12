import { useState, useCallback } from 'react';

const UseToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const isToggleFunction = useCallback(() => setState((state) => !state), []);

    return [state, isToggleFunction];
}

export default UseToggle;