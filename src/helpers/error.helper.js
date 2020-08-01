function buildErrorItem(resource, field, code, message, details) {
    const errorItem = {
        resource: resource,
        field: field,
        code: code,
        message: message,
        details: details,
        date: new Date(),
    };
    return errorItem;
}

module.exports = { buildErrorItem };