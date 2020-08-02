const buildErrorItem = (resource, field, code, message, details) => {
    const errorItem = {
        resource,
        field,
        code,
        message,
        details,
        date: new Date(),
    };
    return errorItem;
}

module.exports = { buildErrorItem };