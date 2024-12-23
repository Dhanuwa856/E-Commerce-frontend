export default function decodeToken(token) {
  try {
    // Split the token to get the payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode the base64 payload
    const jsonPayload = atob(base64);

    // Parse it as JSON
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
