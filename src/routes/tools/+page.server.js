import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
export const load = async (event) => {
    var toolslist = await db.select().from(table.tools)
    if (!event.locals.user) {
        return redirect(302, '/demo/lucia/login')
    }
    return { user: event.locals.user, toolslist }
}

export const actions = {
    "ujeszkoz": async (event) => {  
        const formData = await event.request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const image = formData.get('image');
        const serialnum = formData.get('serialnum');
        const userId = event.locals.user.id;
        try {
            await db.insert(table.tools).values({ title, description, image, serialnum, user_id: userId }).returning();
        } catch (e) {
            console.log(e)
        }
        return redirect(302, '/tools')
    }
}