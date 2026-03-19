import express from "express";
import pool from "../db/db.js";
import * as orderService from "../services/contact_service.js";

const router = express.Router();

// GET all orders with user info

router.get("/", async (req, res) => {
	console.log("getting orders");
	try {
		const orders = await orderService.getAllOrders();
		res.status(200).json({
			status: "success",
			results: orders.length,
			data: { orders },
		});
	} catch (err) {
		res.status(err.statusCode || 500).json({
			status: "fail",
			message: err.message || "Internal Server Error",
		});
	}
});

// GET order by id
router.get("/:id", async (req, res) => {
	if (!Number(req.params.id)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid Request Order ID format",
		});
	}
	try {
		const order = await orderService.getOrderById(req.params.id);

		if (order.length === 0) {
			return res.status(404).json({
				status: "fail",
				message: "Order not found",
			});
		}

		res.status(200).json({
			status: "success",
			data: { order },
		});
	} catch (err) {
		res.status(err.statusCode || 500).json({
			status: "fail",
			message: err.message || "Internal Server Error",
		});
	}
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - status
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
	console.log("create order");
	try {
		const newOrder = await orderService.createOrder(req.body);

		res.status(201).json({
			status: "success",
			data: { order: newOrder },
		});
	} catch (err) {
		res.status(err.statusCode || 500).json({
			status: "fail",
			message: err.message || "Internal Server Error",
		});
	}
});

//Update order
router.put("/:id", async (req, res) => {
	if (!Number(req.params.id)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid Request Order ID format",
		});
	}

	try {
		const updatedOrder = await orderService.updateOrder(
			req.params.id,
			req.body,
		);

		if (!updatedOrder) {
			return res.status(404).json({
				status: "fail",
				message: "Order not found",
			});
		}

		res.status(200).json({
			status: "success",
			data: { order: updatedOrder },
		});
	} catch (err) {
		res.status(err.statusCode || 500).json({
			status: "fail",
			message: err.message || "Internal Server Error",
		});
	}
});

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
	if (!Number(req.params.id)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid Request Order ID format",
		});
	}
	try {
		const deletedOrder = await orderService.deleteOrder(req.params.id);

		if (!deletedOrder) {
			return res.status(404).json({
				status: "fail",
				message: "Order not found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Order deleted successfully",
		});
	} catch (err) {
		res.status(err.statusCode || 500).json({
			status: "fail",
			message: err.message || "Internal Server Error",
		});
	}
});

export default router;
