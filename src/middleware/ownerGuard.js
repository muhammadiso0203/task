import { catchError } from "../utils/error-response.js";

export const ownerGuard = ( req, res, next ) => {
    try {
        const task = req?.task;
        if (!task || task.user_role != 'admin') {
            catchError(res, 403, 'Forbidden user')
        }
        next();
    } catch (error) {
        catchError(res, 500, error.message);
    }
}