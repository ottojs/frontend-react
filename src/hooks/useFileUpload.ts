async function useFileUpload(extension: string, data: string | Blob) {
  // Get URL from Server
  const signedUrl = await fetch(
    import.meta.env.VITE_API_URL + "/v0/upload_url",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        extension: extension,
      }),
      mode: "cors",
      credentials: "include",
    },
  );
  if (signedUrl.status !== 201) {
    console.log("FAILED", signedUrl.status);
  }
  const signedUrlJson = await signedUrl.json();
  console.log("Signed", signedUrlJson);
  const response = await fetch(signedUrlJson.data.url, {
    method: "PUT",
    headers: {
      "Content-Type": signedUrlJson.data.mime,
    },
    body: data,
  });
  console.log("RES STATUS", response.status);
  return signedUrlJson.data;
}

export default useFileUpload;
