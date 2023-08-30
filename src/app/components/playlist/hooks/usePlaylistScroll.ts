import { useEffect, useRef } from "react";

const usePlaylistScroll = () => {
  const playlistScrollRef = useRef<HTMLDivElement | undefined>();

  const scrollToPlayedItem = (
    selectedPlaylistItemIndex: number,
    indexOffset: number = 0
  ) => {
    const playlistItemHeight = 51.2;
    const scrollOffset = selectedPlaylistItemIndex! + indexOffset;

    if (playlistScrollRef.current) {
      playlistScrollRef.current.scrollTop = playlistItemHeight * scrollOffset;
    }
  };

  useEffect(() => {
    if (!playlistScrollRef.current) {
      playlistScrollRef.current = document.createElement("div");
    }
  }, []);

  return {
    playlistScrollRef,
    scrollToPlayedItem,
  };
};

export default usePlaylistScroll;
