import express from "express";
import { Router } from "express";

import { validateBody } from "../middlewares/validateBody.js";
import {
    getGoogleOAuthUrlController,
    loginUserController,
    loginWithGoogleController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
    requestResetEmailController,
    resetPasswordController,
} from "../controllers/auth.js";
import {
    loginUserSchema,
    loginWithGoogleOAuthSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from "../db/validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = Router();
const jsonParser = express.json();

router.post(
    "/register",
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController));
router.post(
    "/login",
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController));

router.post("/logout",
    ctrlWrapper(logoutUserController));

router.post("/refresh",
    ctrlWrapper(refreshUserSessionController));

router.post("/send-reset-email",
    jsonParser,
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController));

router.post("/reset-pwd",
    jsonParser,
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController)
);

router.get("/get-oauth-url",
    ctrlWrapper(getGoogleOAuthUrlController)
);

router.post("/confirm-oauth",
    jsonParser,
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController)
);
export default router;
