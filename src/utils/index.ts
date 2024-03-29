import { useEffect, useRef, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [callback]);
};

export const cleanObject = (object?: { [key: string]: unknown }) => {
    if (!object) {
        return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 在 value 变化时设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 在上一个 useEffect 处理完之后再运行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    };
};

export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle]);
};

/**
 * 返回对应对象中存在的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
    const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K));
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
