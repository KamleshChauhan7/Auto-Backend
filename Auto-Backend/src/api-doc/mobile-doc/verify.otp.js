/**
 * @swagger
 * /api/v1/mobile/otp/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the user's mobile number for authentication or verification purposes.
 *     tags:
 *       - Mobile Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier_type
 *               - country_code
 *               - mobile_number
 *               - otp
 *               - purpose
 *               - product_key
 *             properties:
 *               identifier_type:
 *                 type: integer
 *                 description: Type of identifier (e.g., 0 for Mobile, 1 for Email).
 *                 example: 0
 *               country_code:
 *                 type: string
 *                 description: Country code without the '+' sign.
 *                 example: "91"
 *               mobile_number:
 *                 type: string
 *                 description: The user's mobile number.
 *                 example: "9313400412"
 *               otp:
 *                 type: string
 *                 description: One-Time Password received by the user.
 *                 example: "0000"
 *               purpose:
 *                 type: integer
 *                 description: Purpose of OTP (e.g., 1 for Login, 2 for Verification/Password Reset).
 *                 example: 0
 *               product_key:
 *                 type: string
 *                 description: Product identifier for which OTP verification is being performed.
 *                 example: auto
 *     responses:
 *       200:
 *         description: OTP verified successfully.
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
 *                   example: OTP verified successfully
 *       400:
 *         description: Bad Request (e.g., invalid or missing fields).
 *       401:
 *         description: Unauthorized (invalid or expired OTP).
 *       500:
 *         description: Internal server error.
 */