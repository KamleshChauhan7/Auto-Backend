/**
 * @openapi
 * /auto/vehicle/{vehicle_id}:
 *   get:
 *     summary: Get full vehicle details for UI Overview
 *     tags: [Vehicle Listing]
 *     parameters:
 *       - in: path
 *         name: vehicle_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Success - Returns data formatted for UI cards
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 title: "HYUNDAI CRETA"
 *                 price: 1500000
 *                 overview:
 *                   register_year: "2021-05-10"
 *                   vin: "PFGHV511VMM23768"
 *                   seats: "5 Seats"
 */