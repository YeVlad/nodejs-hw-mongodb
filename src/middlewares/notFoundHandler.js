import createHttpError from "http-errors";

export const notFoundHandler = (req, res, next) => {
    throw createHttpError(res.status(404).json({
        status: 404,
        message: "Route not found",
    })
    );
};
