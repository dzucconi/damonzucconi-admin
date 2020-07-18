type Status = "AUTHENTICATED" | "UNAUTHENTICATED";

export const authenticate = (): { status: Status; token?: string } => {
  const token = localStorage.getItem("token");
  if (!token) return { status: "UNAUTHENTICATED", token: "UNAUTHENTICATED" };
  return { status: "AUTHENTICATED", token };
};
