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
        if (retrievedMajors.length > 0) {
            ctx.body = retrievedMajors[0];
        } else {
            ctx.status = 404;
            ctx.message = "record not found"
        }
    }

    /**
     * Get every major and return it in a list
     * 
     * @param ctx - the context of the koa function
     */
    export async function getAll(ctx: Koa.Context) {
        ctx.body = await Major.get();
    }
}

export default MajorController;