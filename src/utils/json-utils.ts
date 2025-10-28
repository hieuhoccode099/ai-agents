export const cleanJsonContent = (content: string): string => {
  return content
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
};

export const parseJsonSafely = <T>(content: string): T => {
  try {
    const cleaned = cleanJsonContent(content);
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error(
      `Failed to parse JSON: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const extractTextFromContent = (content: unknown): string => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    const textPart = content.find((c) => c?.type === "text")?.text;
    return textPart ?? "";
  }

  if (typeof content === "object" && content !== null) {
    const obj = content as Record<string, unknown>;

    // Handle LangChain message format: { kwargs: { content: "..." } }
    if (obj.kwargs && typeof obj.kwargs === "object" && obj.kwargs !== null) {
      const kwargs = obj.kwargs as Record<string, unknown>;
      if (kwargs.content && typeof kwargs.content === "string") {
        return kwargs.content;
      }
    }

    // Handle case where content is directly in the object
    if (obj.content && typeof obj.content === "string") {
      return obj.content;
    }

    // Fallback: stringify the whole object
    return JSON.stringify(content);
  }

  throw new Error("Invalid response format from LLM");
};
