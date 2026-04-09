/**
 * @swagger
 * /api/v1/auto/admin/vehicle-category/delete/{category_name}:
 *   delete:
 *     summary: Delete Vehicle Category
 *     description: Deletes a vehicle category based on the provided category name.
 *     tags:
 *       - Vehicle Category
 *     parameters:
 *       - in: path
 *         name: category_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the vehicle category to delete.
 *         example: Private Vehicle
 *     responses:
 *       200:
 *         description: Vehicle category deleted successfully.
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
 *                   example: Vehicle category deleted successfully
 *       400:
 *         description: Bad Request (e.g., invalid category name).
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */