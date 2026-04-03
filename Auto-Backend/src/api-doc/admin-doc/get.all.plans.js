/**
 * @swagger
 * /api/v1/auto/admin/plan/getAllPlans:
 *   get:
 *     summary: Get All Plans
 *     description: Retrieves a list of all subscription plans available in the system.
 *     tags:
 *       - Vehicle Plan
 *     responses:
 *       200:
 *         description: Plans fetched successfully.
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
 *                   example: Plans fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       plan_id:
 *                         type: string
 *                         example: "uuid-12345"
 *                       plan_name:
 *                         type: string
 *                         example: Standard Plan
 *                       price:
 *                         type: number
 *                         example: 100
 *                       duration_days:
 *                         type: integer
 *                         example: 30
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-04-03T10:30:00Z
 *       500:
 *         description: Internal server error.
 */