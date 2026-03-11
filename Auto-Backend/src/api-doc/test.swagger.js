// API documentation using Swagger
/**
 * @swagger
 * /api/v1/business/create:
 *   post:
 *     summary: Create new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-product-key
 *         required: true
 *         schema:
 *           type: string
 *         example: "seaneb"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - business_name
 *               - display_name
 *             properties:
 *               business_name:
 *                 type: string
 *                 example: "Seaneb Technology Pvt Ltd"
 *               display_name:
 *                 type: string
 *                 example: "Seaneb Tech"
 *               main_category_id:
 *                 type: string
 *                 example: "de00ce64-1df4-4fae-a470-c0b2a564f99b"
 *     responses:
 *       201:
 *         description: Business created successfully
 *       400:
 *         description: Validation error
 */