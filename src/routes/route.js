import express from "express";
const router = express.Router();
import { MakePayment, ViewStatement } from "../controllers/loanController.js";
import { InsertCustomer } from "../controllers/migrateData.js";
import { Register,  CreateLoan, ViewLoan ,CheckEligibility } from "../controllers/customerController.js"

router.route("/make-payment/:customer_id/:loan_id").post(MakePayment);
router.route("/view-statement/:customer_id/:loan_id").get(ViewStatement);
router.route("/migrate").get(InsertCustomer)
router.route("/register").post(Register);
router.route("/check-eligibility").post(CheckEligibility);
router.route("/create-loan").post(CreateLoan);
router.route("/view-loan/:customer_id").get(ViewLoan);

export default router;


