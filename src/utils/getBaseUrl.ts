import { match } from "ts-pattern";

import { guardUndef } from ".";

export function getBaseUrl() {
    return match([process.env.NEXT_PUBLIC_ENV, process.env.NEXT_PUBLIC_ENABLE_API_MOCK])
        .when(
            ([env]) => env === "production",
            () => guardUndef(process.env.NEXT_PUBLIC_API_URL_PROD)
        )
        .when(
            ([, enableApiMock]) => enableApiMock === "true",
            () => guardUndef(process.env.NEXT_PUBLIC_API_URL_MOCK)
        )
        .when(
            ([, enableApiMock]) => enableApiMock === "false",
            () => guardUndef(process.env.NEXT_PUBLIC_API_URL_DEV)
        )
        .otherwise(() => {
            throw new Error("Invalid environment");
        });
}
