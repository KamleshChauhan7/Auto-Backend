/**
 * @swagger
 * /api/v1/auto/vehicle/get-owner:
 *   post:
 *     summary: Fetch vehicle owner details by Registration Number (Mobile API)
 *     description: Retrieves official vehicle information and owner details from the RTO database using Cashfree.
 *     tags:
 *       - Vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reg_no
 *             properties:
 *               reg_no:
 *                 type: string
 *                 description: The official registration number of the vehicle.
 *                 example: hj01me5678
 *     responses:
 *       200:
 *         description: Vehicle information successfully found in the database.
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
 *                   example: Vehicle Information Found in Database
 *                 owner_name:
 *                   type: string
 *                   description: The masked name of the vehicle owner.
 *                   example: K****h C*****n
 *       201:
 *         description: Vehicle information newly fetched from RTO and saved to the database.
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
 *                   example: Vehicle Information Fetched and Saved
 *                 owner_name:
 *                   type: string
 *                   example: K****h C*****n
 *       400:
 *         description: Bad Request (e.g., missing reg_no).
 *       404:
 *         description: Verification failed or invalid vehicle registration number.
 *       500:
 *         description: Internal server error.
 */