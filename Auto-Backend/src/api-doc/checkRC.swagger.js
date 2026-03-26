/**
 * @swagger
 * /verify-rc:
 *   post:
 *     summary: Verify Vehicle RC details via Cashfree
 *     tags: [Vehicle Listing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle_number
 *             properties:
 *               vehicle_number:
 *                 type: string
 *                 example: "HJ01ME5678"
 *     responses:
 *       200:
 *         description: RC details retrieved successfully
 *       400:
 *         description: Verification failed or invalid number
 */