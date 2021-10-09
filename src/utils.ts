
// Works as a universal fetch to get URLs from the flask backend
export const postWithURLAndBody = async (
    url: string,
    body: Record<string, unknown> = {}
  ): Promise<Response> => {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
