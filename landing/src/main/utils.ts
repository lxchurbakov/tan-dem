export const debounce = (p, t) => {
    let k = null as any;

    return (...args) => {
        if (k) {
            clearTimeout(k);
        }

        k = setTimeout(() => p(...args), t);
    };
};
