/**
 * @swagger
 * /api/v1/mobile/otp/send-otp:
 *   post:
 *     summary: Send OTP to Mobile Number
 *     description: Initiates an OTP request to the specified mobile number via the chosen channel (e.g., WhatsApp, SMS) for authentication or verification.
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
 *               - purpose
 *               - via
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
 *               purpose:
 *                 type: integer
 *                 description: The purpose of the OTP (e.g., 1 for Login, 2 for Password Reset/Verification).
 *                 example: 0
 *               via:
 *                 type: string
 *                 description: The delivery channel for the OTP.
 *                 enum:
 *                   - whatsapp
 *                   - sms
 *                 example: whatsapp
 *     responses:
 *       200:
 *         description: OTP sent successfully.
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
 *                   example: OTP sent successfully
 *       400:
 *         description: Bad Request (e.g., missing or invalid mobile number).
 *       500:
 *         description: Internal server error.
 */