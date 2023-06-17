export default class FetchHandler {
  public static async fetch(url: string): Promise<unknown> {
    const res: Response = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  }
}
