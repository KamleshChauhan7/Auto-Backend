/**
 * @swagger
 * /api/v1/auto/admin/plan/update-plan:
 *   put:
 *     summary: Update Plan
 *     description: Updates an existing plan including name, price, and duration.
 *     tags:
 *       - Vehicle Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPlanName
 *               - new_plan_name
 *             properties:
 *               currentPlanName:
 *                 type: string
 *                 description: Current name of the plan to be updated.
 *                 example: standard plan
 *               new_plan_name:
 *                 type: string
 *                 description: New name of the plan.
 *                 example: Basic Plan
 *               price:
 *                 type: number
 *                 description: Updated price of the plan.
 *                 example: 200
 *               duration_days:
 *                 type: integer
 *                 description: Updated duration of the plan in days.
 *                 example: 60
 *     responses:
 *       200:
 *         description: Plan updated successfully.
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
 *                   example: Plan updated successfully
 *       400:
 *         description: Bad Request (e.g., missing or invalid fields).
 *       404:
 *         description: Plan not found.
 *       500:
 *         description: Internal server error.
 */