/**
 * @swagger
 * /api/v1/auto/admin/vehicle-category/getAll:
 *   get:
 *     summary: Get All Vehicle Categories
 *     description: Retrieves a list of all vehicle categories available in the system.
 *     tags:
 *       - Vehicle Category
 *     responses:
 *       200:
 *         description: Vehicle categories fetched successfully.
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
 *                   example: Vehicle categories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category_id:
 *                         type: string
 *                         example: "uuid-12345"
 *                       category_name:
 *                         type: string
 *                         example: Private Vehicle
 *                       description:
 *                         type: string
 *                         example: This is Private Vehicle
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-04-03T10:30:00Z
 *       500:
 *         description: Internal server error.
 */