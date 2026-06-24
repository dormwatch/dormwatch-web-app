export function makeTokenProvider(clerkAuth) {
  return async () => {
    if (!clerkAuth) return null;
    const { isSignedIn, getToken } = clerkAuth;
    if (!isSignedIn) return null;
    return await getToken({ template: "api_token" });
  };
}
