export default class FetchHandler {
  public static async fetch(url: string): Promise<unknown> {
    const res: Response = await fetch(url);

    return await res.json();
  }
}
