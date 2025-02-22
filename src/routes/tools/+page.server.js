export const load = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/demo/lucia/login');
    }
    return { user: event.locals.user }
};