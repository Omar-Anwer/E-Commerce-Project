/**
    POST /orders                Create an order from the cart	Body: { paymentMethod, shippingAddressId }
    POST /orders/{id}/cancel    Cancel an order (if pending)
    POST /orders/{id}/payment   Retry failed payment


    GET /orders/{id}            Get order details (with items, status)
    GET /orders/history		    List user’s order history

    PATCH /orders/{id}/status   Update order status (e.g., "shipped").



 */
