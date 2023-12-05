export const load = (async (event) => {
    const session: any = await event.locals.getSession();
    return session;
});
