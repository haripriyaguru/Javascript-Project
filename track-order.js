$(document).ready(function () {
    $("#track-order-form").submit(function (event) {
        event.preventDefault(); // Prevent form submission

        let orderNumber = $("#order-number-input").val().trim();

        if (orderNumber === "") {
            alert("Please enter a valid order number.");
            return;
        }

        // Simulate fetching order details (In real cases, fetch from a server)
        let fakeOrders = {
            "123456": {
                orderNumber: "123456",
                deliveryDate: "April 2, 2025",
                status: 4 // (4 means 'Out for Delivery')
            },
            "654321": {
                orderNumber: "654321",
                deliveryDate: "April 5, 2025",
                status: 3 // (3 means 'Order Shipped')
            }
        };

        if (fakeOrders[orderNumber]) {
            let orderDetails = fakeOrders[orderNumber];

            // Update tracking details
            $("#tracking-order-number").text(orderDetails.orderNumber);
            $("#tracking-delivery-date").text(orderDetails.deliveryDate);

            // Show the tracking section
            $("#tracking-results").slideDown();

            // Update progress based on order status
            $(".tracking-step").each(function () {
                let step = $(this).data("step");
                if (step <= orderDetails.status) {
                    $(this).addClass("completed");
                }
            });

        } else {
            alert("Order not found. Please enter a valid order number.");
        }
    });
});
