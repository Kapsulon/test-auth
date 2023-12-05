export const load = (async ({parent, data}: (any)) => {
    await parent();
    if (data === null) return;
    return data;
});
