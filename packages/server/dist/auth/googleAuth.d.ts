interface GoogleUserInfo {
    email: string;
    name: string;
    picture: string;
}
export declare function googleOAuthToken(code: string): Promise<{
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
export declare function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo>;
export {};
//# sourceMappingURL=googleAuth.d.ts.map