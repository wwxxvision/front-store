export const API = {
    TOP_CATEGORIES: {
        url: "/api/get/model?endpoint=products/categories&method=GetList&parent=0",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    CHILD_TOP_CATEGORIES: {
        url: "/api/get/model?endpoint=products/categories&method=GetList",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    CATALOG_PRODUCTS: {
        url: "/api/get/model?endpoint=products&method=GetList&pagination=yes",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    FILTER_CATALOG_PRODUCTS: {
        url: "/api/get/model?endpoint=products&method=GetList",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    COUNT_PRODUCTS_IN_CATALOG: {
        url: "/api/get/model?type=productCount&method=Get",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    ATTRIBUTES: {
        url: "/api/get/model?endpoint=products/attributes&method=GetList",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    },
    ATTRIBUTE_TERMS: {
        url: "/api/get/model?type=attributeTerm&method=GetList",
        options: {
            method: "GET",
            headers:  {
                "Content-Type": "application/json"
            }
        }
    }
}
