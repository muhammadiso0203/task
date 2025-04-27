export const catchError = (res, code, err) => {
    return res.status(code).json({
        statusCOde: code,
        message: err
    });
}