export const PERMISSIONS = {
    CREATE_PRODUCT: 'create_product',
    DELETE_PRODUCT: 'delete_product',
    MANAGE_USERS: 'manage_users',
    VIEW_ORDERS: 'view_orders',
};

export const ROLES = {
    ADMIN: [
        PERMISSIONS.CREATE_PRODUCT,
        PERMISSIONS.DELETE_PRODUCT,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.VIEW_ORDERS,
    ],
    MANAGER: [PERMISSIONS.CREATE_PRODUCT, PERMISSIONS.VIEW_ORDERS],
    CUSTOMER: [PERMISSIONS.VIEW_ORDERS],
};
