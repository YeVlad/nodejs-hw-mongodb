import {
    loginUser,
    registerUser,
    logoutUser,
    refreshUsersSession,
    requestResetToken,
    resetPassword,
    loginOrSignupWithGoogle,
} from "../services/auth.js";
import { THIRTY_DAYS } from "../constants/index.js";
import { generateAuthUrl } from "../utils/googleOAuth2.js";



export const registerUserController = async (req, res) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const user = await registerUser(payload);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const session = await loginUser(email, password);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        },
    });

};

export const logoutUserController = async (req, res) => {

    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).end();
};

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};

export const refreshUserSessionController = async (req, res) => {

    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        },
    });

};

export const requestResetEmailController = async (req, res) => {

    await requestResetToken(req.body.email);

    res.json({
        status: 200,
        message: "Reset password email has been successfully sent!",
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        status: 200,
        message: "Password has been successfully reset!",
        data: {},
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: 200,
        message: "Successfully get Google OAuth url!",
        data: {
            url,
        },
    });
};

export const loginWithGoogleController = async (req, res) => {
    const session = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully logged in via Google OAuth!",
        data: {
            accessToken: session.accessToken,
        },
    });
};
