import type { Handle } from "@sveltejs/kit";
import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";

async function get_user_details(token: string, user_id: string): Promise<any> {
    const request: Request = new Request(`https://api.guidor.fr/user/${user_id}/details`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    const res: Response = await fetch(request);
    const json: any = await res.json();

    return json;
}

async function login(email: string, password: string): Promise<Response> {
    const request: Request = new Request(`https://api.guidor.fr/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "device": {
                "device_id": "TEST",
                "device_name": "TEST"
            }
        }),
    });
    const res: Response = await fetch(request);
    return res;
}

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
                if (!credentials.email || !credentials.password) return null;
                // eslint-disable-next-line prefer-const
                let res: any = await (await login(credentials.email as string, credentials.password as string)).json()
                if (res.status === "fail") return null;
                // eslint-disable-next-line prefer-const
                let details = await get_user_details(res.Authorization, res.user_id);
                if (details.status === "fail") return null;
                res.user_details = details;
                return res;
            }
        }),
    ],
}) satisfies Handle;
