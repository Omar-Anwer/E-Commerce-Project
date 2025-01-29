// src/constants/permissions.ts
export const PERMISSIONS = {};

const permissionNames = [
    // User Management
    'VIEW_USER',
    'CREATE_USER',
    'UPDATE_USER',
    'DELETE_USER',

    // Product Management
    'VIEW_PRODUCT',
    'CREATE_PRODUCT',
    'UPDATE_PRODUCT',
    'DELETE_PRODUCT',

    // Order Management
    'VIEW_ORDER',
    'CREATE_ORDER',
    'UPDATE_ORDER',
    'DELETE_ORDER',

    // Category Management
    'VIEW_CATEGORY',
    'CREATE_CATEGORY',
    'UPDATE_CATEGORY',
    'DELETE_CATEGORY',

    // Content Management
    'VIEW_CONTENT',
    'CREATE_CONTENT',
    'UPDATE_CONTENT',
    'DELETE_CONTENT',

    // Support Management
    'VIEW_TICKET',
    'CREATE_TICKET',
    'UPDATE_TICKET',
    'DELETE_TICKET',

    // Analytics and Reporting
    'VIEW_SALES_REPORT',
    'EXPORT_DATA',

    // Shipping and Logistics
    'VIEW_SHIPPING',
    'UPDATE_DELIVERY_STATUS',

    // Promotions and Discounts
    'VIEW_PROMOTION',
    'CREATE_PROMOTION',
    'UPDATE_PROMOTION',
    'DELETE_PROMOTION',
];

// Dynamically assign bitwise flags
permissionNames.forEach((permission, index) => {
    PERMISSIONS[permission] = (1 << index) >>> 0;
});

export const ROLES = {
    ADMIN: {
        name: 'Admin',
        permissions: Object.values(PERMISSIONS).reduce(
            (acc, perm) => acc | perm,
            0
        ), // All permissions
    },
    CUSTOMER: {
        name: 'Customer',
        permissions:
            PERMISSIONS.VIEW_PRODUCT |
            PERMISSIONS.CREATE_ORDER |
            PERMISSIONS.VIEW_ORDER |
            PERMISSIONS.UPDATE_ORDER |
            PERMISSIONS.DELETE_ORDER,
    },
    SELLER: {
        name: 'Seller',
        permissions:
            PERMISSIONS.VIEW_PRODUCT |
            PERMISSIONS.CREATE_PRODUCT |
            PERMISSIONS.UPDATE_PRODUCT |
            PERMISSIONS.DELETE_PRODUCT |
            PERMISSIONS.VIEW_ORDER |
            PERMISSIONS.UPDATE_ORDER,
    },
    SUPPORT_AGENT: {
        name: 'Support Agent',
        permissions:
            PERMISSIONS.VIEW_TICKET |
            PERMISSIONS.UPDATE_TICKET |
            PERMISSIONS.DELETE_TICKET,
    },
    CONTENT_MANAGER: {
        name: 'Content Manager',
        permissions:
            PERMISSIONS.VIEW_CONTENT |
            PERMISSIONS.CREATE_CONTENT |
            PERMISSIONS.UPDATE_CONTENT |
            PERMISSIONS.DELETE_CONTENT,
    },
    LOGISTICS_MANAGER: {
        name: 'Logistics Manager',
        permissions:
            PERMISSIONS.VIEW_SHIPPING | PERMISSIONS.UPDATE_DELIVERY_STATUS,
    },
    ANALYST: {
        name: 'Analyst',
        permissions: PERMISSIONS.VIEW_SALES_REPORT | PERMISSIONS.EXPORT_DATA,
    },
    GUEST: {
        name: 'Guest',
        permissions: PERMISSIONS.VIEW_PRODUCT,
    },
};

// export const PERMISSIONS = {
//     // ROLES:
//     ASSIGN_ROLE: 'assign_role', // Assign roles to users.
//     MANAGE_ROLES: 'manage_roles', // Create, update, delete roles.
//     VIEW_ROLE: 'view_role', // View role details.

//     // System Settings
//     MANAGE_SYSTEM_SETTINGS: 'manage_system_settings',
//     UPDATE_SYSTEM_SETTING: 'update_system_setting',

//     // PERMISSIONS:
//     MANAGE_PERMISSIONS: 'manage_permissions', // Create, update, delete permissions.
//     VIEW_PERMISSION: 'view_permission', // View permission details.

//     // GROUPS:
//     MANAGE_GROUPS: 'manage_groups', // Create, update, delete groups.
//     VIEW_GROUP: 'view_group', // View group details.

//     // GROUP PERMISSIONS:
//     MANAGE_GROUP_PERMISSIONS: 'manage_group_permissions', // Assign permissions to groups.

//     // USERS:
//     CREATE_USER: 'create_user', //Create a new user.
//     VIEW_USER: 'view_user', // View user details.
//     UPDATE_USER: 'update_user', // Update user information.
//     DELETE_USER: 'delete_user', // Delete a user.

//     // PRODUCTS:
//     MANAGE_PRODUCTS: 'manage_products',
//     CREATE_PRODUCT: 'create_product', // Add a new product.
//     VIEW_PRODUCT: 'view_product', // View product details.
//     UPDATE_PRODUCT: 'update_product', //  Update product information.
//     DELETE_PRODUCT: 'delete_product', // Delete a product.

//     // ORDERS:
//     MANAGE_ORDERS: 'manage_orders', //  Process payments for orders.
//     CREATE_ORDER: 'create_order', //Place a new order.
//     VIEW_ORDER: 'view_order', // View order details.
//     UPDATE_ORDER: 'update_order', // Update order status (e.g., mark as shipped).
//     DELETE_ORDER: 'delete_order', //  Cancel an order.

//     // CATEGORY:
//     CREATE_CATEGORY: 'create_category', // Create a new category.
//     VIEW_CATEGORY: 'view_category', // View category details.
//     UPDATE_CATEGORY: 'update_category', // Update category information.
//     DELETE_CATEGORY: 'delete_category', // Delete a category.

//     // CARTS:
//     ADD_TO_CART: 'add_to_cart',
//     REMOVE_FROM_CART: 'remove_from_cart',
//     UPDATE_CART: 'update_cart',
//     VIEW_CART: 'view_cart',
//     // CARTS:
//     ADD_TO_CART: 'add_to_cart',
//     REMOVE_FROM_CART: 'remove_from_cart',
//     UPDATE_CART: 'update_cart',
//     VIEW_CART: 'view_cart',

//     // PROMOTIONS:
//     CREATE_PROMOTION: 'create_promotion',
//     VIEW_PROMOTION: 'view_promotion',
//     UPDATE_PROMOTION: 'update_promotion',
//     DELETE_PROMOTION: 'delete_promotion',

//     // SHIPPING:
//     MANAGE_SHIPPING: 'manage_shipping',
//     CREATE_SHIPPING: 'create_shipping',
//     VIEW_SHIPPING: 'view_shipping',
//     UPDATE_SHIPPING: 'update_shipping',
//     DELETE_SHIPPING: 'delete_shipping',

//     // RETURNS:
//     MANAGE_RETURNS: 'manage_returns',
//     CREATE_RETURN: 'create_return',
//     VIEW_RETURN: 'view_return',
//     UPDATE_RETURN: 'update_return',
//     DELETE_RETURN: 'delete_return',

//     // ORDER STATUS:
// };

// export const ROLES = {
//     ADMIN: [
//         PERMISSIONS.CREATE_PRODUCT,
//         PERMISSIONS.DELETE_PRODUCT,
//         PERMISSIONS.MANAGE_USERS,
//         PERMISSIONS.VIEW_ORDERS,
//     ],
//     MANAGER: [PERMISSIONS.CREATE_PRODUCT, PERMISSIONS.VIEW_ORDERS],
//     CUSTOMER: [PERMISSIONS.VIEW_ORDERS],
// };

// // admin: {
// //     can: ['create', 'edit', 'delete', 'view'],
// //   },
// //   editor: {
// //     can: ['create', 'edit', 'view'],
// //   },
// //   viewer: {
// //     can: ['view'],
// //   },
