// API documentation using Swagger
/**
 * @swagger
 * /api/v1/car/create:
 *   post:
 *     summary: Add New Car
 *     tags: [Car Listing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Car Registation No
 *             properties:
 *               car_registration_number:
 *                 type: string
 *                 example: "GJ23GJ2332"
 *               owner_name:
 *                 type: string
 *                 example: "SeaNeB Auto"
 *               Description:
 *                 type: string
 *                 example: "This is second hand car"
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Validation error
 *       401: 
 *         description: Unathorized
 */