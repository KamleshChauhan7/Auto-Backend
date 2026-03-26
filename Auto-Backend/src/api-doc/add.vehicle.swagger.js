/**
 * @swagger
 * /api/v1/auto/add-vehicle:
 *   post:
 *     summary: Add New Vehicle
 *     tags: [Vehicle Listing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-product-key
 *         required: true
 *         description: Enter your unique Product Key (Integer)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle_register_number
 *             properties:
 *               category_name:
 *                 type: string
 *                 example: "Private Vehicle"
 *               brand_name:
 *                 type: string
 *                 example: "Hyundai"
 *               fuel_name:
 *                 type: string
 *                 example: "Petrol"
 *               model_name:
 *                 type: string
 *                 example: "Creta"
 *               image:
 *                 type: string
 *                 example: "URL_TO_IMAGE"
 *               vehicle_register_number:
 *                 type: string
 *                 example: "GJ23KP7353"
 *               price:
 *                 type: number
 *                 example: 10000000
 *               year:
 *                 type: integer
 *                 example: 2026
 *               owner_name:
 *                 type: string
 *                 example: "Kamal"
 *               description:
 *                 type: string
 *                 example: "This is private vehicle"
 *               color:
 *                 type: string
 *                 example: "black"
 *               transmission:
 *                 type: string
 *                 example: "Manual"
 *               km_driven:
 *                 type: integer
 *                 example: 1
 *               ownership_count:
 *                 type: integer
 *                 example: 1
 *               drive_type:
 *                 type: string
 *                 example: "All Wheels"
 *               mileage:
 *                 type: number
 *                 example: 70
 *               horse_power:
 *                 type: integer
 *                 example: 7454
 *               seater:
 *                 type: integer
 *                 example: 4
 *               insurance:
 *                 type: boolean
 *                 example: true
 *               puc:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-23"
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

