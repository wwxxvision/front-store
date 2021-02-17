const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const ApiConnection = new WooCommerceRestApi({
    url: process.env.API_URL,
    consumerKey: process.env.API_USER_KEY,
    consumerSecret: process.env.API_SECRET_KEY,
    version: "wc/v3"
});
