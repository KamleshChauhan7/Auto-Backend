/**
 * @swagger
 * /api/v1/auto/admin/vehicle-category/update-category:
 *   put:
 *     summary: Update Vehicle Category
 *     description: Updates an existing vehicle category name and description.
 *     tags:
 *       - Vehicle Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentCategoryName
 *               - new_category_name
 *             properties:
 *               currentCategoryName:
 *                 type: string
 *                 description: Current name of the vehicle category.
 *                 example: Private Vehicle
 *               new_category_name:
 *                 type: string
 *                 description: New name for the vehicle category.
 *                 example: New Private Vehicle
 *               description:
 *                 type: string
 *                 description: Updated description of the vehicle category.
 *                 example: This is New Private Vehicle
 *     responses:
 *       200:
 *         description: Vehicle category updated successfully.
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
 *                   example: Vehicle category updated successfully
 *       400:
 *         description: Bad Request (e.g., missing or invalid fields).
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */