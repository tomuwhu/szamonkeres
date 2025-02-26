import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db'
import { eq, or } from 'drizzle-orm'
import * as table from '$lib/server/db/schema'
export const load = async (event) => {
    var toolslist = await db.select()
        .from(table.tools)
        .leftJoin(table.user, eq(table.user.id, table.tools.user_id)).all()
    var userlist = await db.select({ id: table.user.id, name: table.user.name })
        .from(table.user)
        .all()
    if (!event.locals.user) {
        return redirect(302, '/demo/lucia/login')
    }
    return { user: event.locals.user, toolslist, userlist }
}

export const actions = {
    "torles": async (event) => {
        const formData = await event.request.formData();
        const tool_id = formData.get('id');
        try {
            await db.delete(table.tools).where(eq(table.tools.id, tool_id)).returning();
        } catch (e) {
            console.log(e)
        }
        return redirect(302, '/tools')
    },
    "ujeszkoz": async (event) => {  
        const formData = await event.request.formData();
        const tool_id = formData.get('id');
        const title = formData.get('title');
        const description = formData.get('description');
        const image = formData.get('image');
        const serialnum = formData.get('serialnum');
        const userId = formData.get('user');
        console.log(tool_id);
        if (tool_id != "-") {
            try {
                await db.update(table.tools)
                    .set({ title, description, image, serialnum, user_id: userId })
                    .where(eq(table.tools.id, tool_id)).returning();
            } catch (e) {
                console.log(e)
            }   
        } else {
            try {
                await db.insert(table.tools)
                        .values({ title, description, image, serialnum, user_id: userId })
                        .returning();
            } catch (e) {
                console.log(e)
            }
        }
        return redirect(302, '/tools')
    }
}