import { NextResponse } from "next/server";
export function logoutUser() {
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.set("token", "", { path: "/", httpOnly: true, expires: new Date(0) });
    return response;
}
//# sourceMappingURL=logout.js.map