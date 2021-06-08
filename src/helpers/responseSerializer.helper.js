const RESOURCES = require('../common/constants/baseApiResource.constant');

class ResponseSerializerUtil {
    singleResourceResponse(data, resource) {
        return {
            data: data,
            meta: {
                type: resource,
            }
        }
    }

    collectionResourceResponse(data, resource) {
        const items = this.createListItems(data, resource);

        return {
            items: items,
            meta: {
                type: RESOURCES.COLLECTION,
                count: items.length
            }
        };
    }

    createListItems(data, resource) {
        const items = [];
        data.forEach(function (item) {
            items.push(item);
        });
        return items;
    }


    formatResponse(results, resource) {
        const formattedResponse = Array.isArray(results)
            ? this.collectionResourceResponse(results, resource)
            : this.singleResourceResponse(results, resource);
        return formattedResponse;
    }
}

module.exports = new ResponseSerializerUtil();