export async function onRequestPost(context) {
  const body = await context.request.json();

  const searchText = body.city || body.postCode || "";

  const response = await fetch(
    "https://net.posta.hu/postoffice/public/postoffice-api/rest/postoffice-api/rest/postoffice/search",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchField: "város,cím,név",
        searchText
      })
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
