const URL_CATALOG = 'https://japceibal.github.io/emercado-api/cats_products/101.json';


/**
 * {
 *  "catID": Number,
 * "catName": String,
 * "products": Array [{
 *      "id": 50921,
        "name": "Chevrolet Onix Joy",
        "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
        "cost": 13500,
        "currency": "USD",
        "soldCount": 14,
        "image": "img/prod50921_1.jpg"
 *  },
    ...
 ]
 * }
 */

async function getCatalogData() {
    const result = {};

    try {
        const response = await fetch(URL_CATALOG);

        if (response.ok) {
            const json = await response.json();
            result.status = 'ok';
            result.body = json;
        } else {
            throw Error(response.statusText);
        }
    } catch (err) {
        result.status = 'error';
        result.errorMessage = err.message;
        result.body = {}
    }

    return result;
}
