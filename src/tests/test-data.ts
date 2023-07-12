export default class TestData {
  public static readonly youtubePlaylistMetadata = {
    items: [
      {
        id: "test-id",
        snippet: {
          title: "Test Playlist",
          channelTitle: "Test Channel Title",
        },
      },
    ],
  };

  public static readonly youtubePlaylistItemsData = {
    pageInfo: {
      totalResults: 123,
    },
  };
}
