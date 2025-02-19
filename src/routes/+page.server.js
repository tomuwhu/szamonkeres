export function load(event) {
    console.log(event.locals.user)
    return {
        user: event.locals.user
    }
}