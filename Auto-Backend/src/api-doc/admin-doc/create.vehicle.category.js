/**
 * @swagger
 * /api/v1/auto/admin/vehicle-category/create:
 *   post:
 *     summary: Create Vehicle Category
 *     description: Creates a new vehicle category with name and description.
 *     tags:
 *       - Vehicle Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Name of the vehicle category.
 *                 example: Private Vehicle
 *               description:
 *                 type: string
 *                 description: Description of the vehicle category.
 *                 example: This is New Private Vehicle
 *     responses:
 *       201:
 *         description: Vehicle category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Vehicle category created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category_id:
 *                       type: string
 *                       example: "uuid-12345"
 *                     category_name:
 *                       type: string
 *                       example: Private Vehicle
 *                     description:
 *                       type: string
 *                       example: This is New Private Vehicle
 *       400:
 *         description: Bad Request (e.g., missing or invalid fields).
 *       500:
 *         description: Internal server error.
 */