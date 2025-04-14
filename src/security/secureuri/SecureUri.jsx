export const encodeId = (id) => btoa(id); // Base64 encode
export const decodeId = (encodedId) => atob(encodedId); // Base64 decode
