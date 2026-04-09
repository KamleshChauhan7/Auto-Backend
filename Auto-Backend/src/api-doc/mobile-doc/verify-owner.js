/**
 * @swagger
 * /api/v1/auto/mobile/vehicle/verify-owner:
 *   post:
 *     summary: Verify Vehicle Owner
 *     description: Verifies whether the provided first name and last name match the official vehicle owner details for the given registration number.
 *     tags:
 *       - Mobile Vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reg_no
 *               - firstName
 *               - lastName
 *             properties:
 *               reg_no:
 *                 type: string
 *                 description: Vehicle registration number.
 *                 example: hj01me5678
 *               firstName:
 *                 type: string
 *                 description: First name of the owner to verify.
 *                 example: john
 *               lastName:
 *                 type: string
 *                 description: Last name of the owner to verify.
 *                 example: doe
 *     responses:
 *       200:
 *         description: Owner verification result.
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
 *                   example: Owner verified successfully
 *                 is_match:
 *                   type: boolean
 *                   description: Indicates whether the provided name matches the official owner.
 *                   example: true
 *       400:
 *         description: Bad Request (e.g., missing or invalid input fields).
 *       404:
 *         description: Vehicle not found or invalid registration number.
 *       500:
 *         description: Internal server error.
 */