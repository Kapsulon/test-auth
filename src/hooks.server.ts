import type { Handle } from "@sveltejs/kit";
import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";

export const handle: Handle = SvelteKitAuth({
    secret: "7c532a746339f3e0da6df8853584da99",
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            async authorize(credentials, req) {
                return { "logged": true }
            }
        }),
    ],
}) satisfies Handle;
