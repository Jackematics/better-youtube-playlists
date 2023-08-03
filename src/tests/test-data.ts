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
    items: [
      {
        snippet: {
          title: "Test Song 1",
          thumbnails: {
            default: {
              url: "/test-thumbnail-url-1",
              width: 420,
              height: 69,
            },
          },
          resourceId: {
            videoId: "test-video-id-1",
          },
        },
      },
      {
        snippet: {
          title: "Test Song 2",
          thumbnails: {
            default: {
              url: "/test-thumbnail-url-2",
              width: 420,
              height: 69,
            },
          },
          resourceId: {
            videoId: "test-video-id-2",
          },
        },
      },
    ],
    pageInfo: {
      totalResults: 123,
    },
  };
}
