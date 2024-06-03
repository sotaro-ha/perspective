export function guardUndef<T>(value: T): NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error("value is undefined or null");
    }

    return value;
}

export function guardAllUndef<T extends Record<string, any>>(object: T): T {
    if (Object.values(object).every((val) => val === undefined || val === null)) {
        throw new Error("Object has all undefined or null properties");
    }
    return object;
}
