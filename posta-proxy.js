export async function onRequestPost(context) {
  const requestBody = await context.request.text();

  const response = await fetch(
    "https://net.posta.hu/postoffice/public/postoffice-api/rest/postoffice/search",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody
    }
  );

  const data = await response.text();

  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
