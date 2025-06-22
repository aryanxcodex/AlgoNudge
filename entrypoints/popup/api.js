export async function getGeminiHint({ code, prompt, title, description, apiKey }) {
    console.log(apiKey);
  try {
    const res = await fetch("http://localhost:3000/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        code,
        prompt,
        title,
        description,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Server error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return data.hint || "No hint generated.";
  } catch (error) {
    console.error("Error fetching Gemini hint:", error);
    return "Failed to generate hint. Please try again.";
  }
}
