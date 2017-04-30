import * as Koa from 'koa';
import Major from '../models/Major';

/**
 * A controller for accessing Major models
 */
namespace MajorController {

    /**
     * Get a single major by its ID
     * 
     * @param ctx - the context of the koa function
     */
    export async function getById(ctx: Koa.Context) {
        const retrievedMajors: Major[] = await Major.get({ id: ctx.params.id });
        ctx.major = retrievedMajors[0];
    }

    /**
     * Get every major and return it in a list
     * 
     * @param ctx - the context of the koa function
     */
    export async function getAll(ctx: Koa.Context) {
        ctx.majors = await Major.get();
    }
}

export default MajorController;