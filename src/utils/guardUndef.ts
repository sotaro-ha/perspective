export function guardUndef<T>(value: T): NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error("value is undefined or null");
    }

    return value;
}
type DeepNonNullable<T> = T extends object
    ? { [key in keyof T]-?: DeepNonNullable<T[key]> }
    : NonNullable<T>;

export function guardRecursiveUndef<T>(value: T): DeepNonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error("value is undefined or null");
    }

    if (typeof value === "object" && value !== undefined && value !== null) {
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                (value as any)[key] = guardRecursiveUndef((value as any)[key]);
            }
        }
    }

    return value as DeepNonNullable<T>;
}
