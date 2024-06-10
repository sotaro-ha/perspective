import { defineConfig } from "orval";

export default defineConfig({
    backend: {
        input: {
            target: "./openAPI/openapi.oas3.yml",
        },
        output: {
            target: "./src/generated/api.ts",
            schemas: "./src/generated/model",
            clean: true,
            client: "react-query",
            mode: "split",
            override: {
                query: {
                    useSuspenseQuery: true,
                    version: 5,
                },
            },
        },
    },
});
