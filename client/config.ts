export const CONFIG = {
    PRODUCTS_PER_PAGE: 6,
    ORGANIZATION: {
      EMAIL_SUPPORT: 'fafafff@gmail.com'
    },
    ATTRIBUTES: [{
        "id": 2,
        "name": "Цвет",
        "slug": "pa_color",
        "type": "select",
        "order_by": "menu_order",
        "has_archives": false,
        "terms": [{
            "id": 21,
            "name": "Зеленый|#32a852",
            "slug": "green",
            "description": "",
            "menu_order": 0,
            "count": 2,
        }, {
            "id": 20,
            "name": "Красный|#FF0000",
            "slug": "red",
            "description": "",
            "menu_order": 0,
            "count": 1,
        }]
    },
        {
            "id":
                1, "name":
                "Размер", "slug":
                "pa_size", "type":
                "select", "order_by":
                "menu_order",
            "has_archives": false,
            "terms":
                [{
                    "id": 22,
                    "name": "L",
                    "slug": "l",
                    "description": "",
                    "menu_order": 0,
                    "count": 1,
                }, {
                    "id": 19,
                    "name": "M",
                    "slug": "m",
                    "description": "",
                    "menu_order": 0,
                    "count": 2,
                }, {
                    "id": 18,
                    "name": "S",
                    "slug": "s",
                    "description": "",
                    "menu_order": 0,
                    "count": 1,
                }]
        }
    ],
    TOP_CATEGORIES: [{
        "id": 15,
        "name": "Женская одежда",
        "slug": "women",
        "parent": 0,
        "description": "",
        "display": "default",
        "image": null,
        "menu_order": 0,
        "count": 0,
    }, {
        "id": 16,
        "name": "Мужская одежда",
        "slug": "men",
        "parent": 0,
        "description": "Мужская одежда",
        "display": "default",
        "image": null,
        "menu_order": 0,
        "count": 7,
    }],
    CATEGORIES: [{
        "id": 17,
        "name": "Футболки",
        "slug": "t-shirts",
        "parent": 16,
        "description": "Мужские футболки",
        "display": "default",
        "image": null,
        "menu_order": 0,
        "count": 7,
    }]
}
