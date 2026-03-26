// Auto-Backend\src\controllers\v1\vehicle\getFullFleetDetails.js
import axios from "axios";
import { Vehicle } from "../../../models/index.js";
import { stat } from "fs";

export const getFullDetails = async (req, res, next) => {
  try {
    // Call Central Server to get the "Business -> Branches" tree
    const centralRes = await axios.get(`http://localhost:9495/api/v1/internal/product-businesses`, {
      params: { product_key: 'auto' },
      headers: { 'x-api-secret': process.env.AUTO_SECRET } 
    });

    const businessData = centralRes.data.data;

    // Extract all Branch IDs
    const branchIds = businessData.flatMap(biz => 
      biz.Branches.map(br => br.branch_id)
    );

    // Fetch all local vehicles matching those branch IDs from Auto DB
    const vehicles = await Vehicle.findAll({
      where: { branch_id: branchIds },
      raw: true
    });

    // vehicles inside their respective branch
    const finalResult = businessData.map(biz => ({
      ...biz,
      Branches: biz.Branches.map(br => ({
        ...br,
        vehicles: vehicles.filter(v => v.branch_id === br.branch_id)
      }))
    }));

    return res.status(200).json({
      success: true,
      count: finalResult.length,
      data: finalResult
    });

  } catch (error) {
    console.error("Aggregation Error:", error.message);
    next(error);
  }
};

