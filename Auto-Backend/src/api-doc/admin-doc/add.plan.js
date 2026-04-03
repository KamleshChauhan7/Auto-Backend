/**
 * @swagger
 * /api/v1/auto/admin/plan/add-plan:
 *   post:
 *     summary: Add New Plan
 *     description: Creates a new subscription plan with name, price, and duration.
 *     tags:
 *       - Vehicle Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan_name
 *               - price
 *               - duration_days
 *             properties:
 *               plan_name:
 *                 type: string
 *                 description: Name of the subscription plan.
 *                 example: Standard Plan
 *               price:
 *                 type: number
 *                 description: Price of the plan.
 *                 example: 100
 *               duration_days:
 *                 type: integer
 *                 description: Duration of the plan in days.
 *                 example: 30
 *     responses:
 *       201:
 *         description: Plan created successfully.
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
 *                   example: Plan created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     plan_id:
 *                       type: string
 *                       example: "uuid-12345"
 *                     plan_name:
 *                       type: string
 *                       example: Standard Plan
 *                     price:
 *                       type: number
 *                       example: 100
 *                     duration_days:
 *                       type: integer
 *                       example: 30
 *       400:
 *         description: Bad Request (e.g., missing or invalid fields).
 *       500:
 *         description: Internal server error.
 */