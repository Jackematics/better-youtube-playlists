import {
  PlaylistData,
  PlaylistItem,
} from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import usePlaylistScroll from "./hooks/usePlaylistScroll";

type PlaylistProps = {
  selectedPlaylistData: PlaylistData | undefined;
  nextVideoSelected: boolean;
  prevVideoSelected: boolean;
  playlistItemSelectCallback: (
    playlistItem: PlaylistItem,
    itemIndex: number
  ) => void;
};

const Playlist = ({
  selectedPlaylistData,
  nextVideoSelected,
  prevVideoSelected,
  playlistItemSelectCallback,
}: PlaylistProps) => {
  const [selectedPlaylistItemIndex, setSelectedPlaylistItemIndex] = useState<
    number | undefined
  >();
  const { playlistScrollRef, scrollToPlayedItem } = usePlaylistScroll();

  const handleSelectPlaylistItem = (
    playlistItem: PlaylistItem,
    index: number
  ) => {
    setSelectedPlaylistItemIndex(index);
    playlistItemSelectCallback(playlistItem, index);
  };

  useEffect(() => {
    const firstItem = selectedPlaylistData?.playlistItems![0];
    firstItem && handleSelectPlaylistItem(firstItem, 0);
    setSelectedPlaylistItemIndex(0);
    scrollToPlayedItem(selectedPlaylistItemIndex!);
  }, [selectedPlaylistData]);

  const selectPrevVideo = () => {
    const playlistItems = selectedPlaylistData?.playlistItems!;

    let prevItemIndex = selectedPlaylistItemIndex! - 1;

    setSelectedPlaylistItemIndex(prevItemIndex);
    handleSelectPlaylistItem(playlistItems[prevItemIndex], prevItemIndex);
  };

  const selectNextVideo = () => {
    const playlistItems = selectedPlaylistData?.playlistItems!;

    let nextItemIndex = selectedPlaylistItemIndex! + 1;

    setSelectedPlaylistItemIndex(nextItemIndex);
    handleSelectPlaylistItem(playlistItems[nextItemIndex], nextItemIndex);
  };

  useEffect(() => {
    if (
      nextVideoSelected &&
      selectedPlaylistItemIndex !== selectedPlaylistData?.playlistItems!.length
    ) {
      selectNextVideo();
      scrollToPlayedItem(selectedPlaylistItemIndex!);
    }
  }, [nextVideoSelected]);

  useEffect(() => {
    if (selectedPlaylistItemIndex === 0) {
      scrollToPlayedItem(selectedPlaylistItemIndex!);
    }
  }, [selectedPlaylistItemIndex]);

  // User clicks previous button
  useEffect(() => {
    if (prevVideoSelected && selectedPlaylistItemIndex !== 0) {
      selectPrevVideo();
      scrollToPlayedItem(selectedPlaylistItemIndex!, -2);
    }
  }, [prevVideoSelected]);

  return (
    <>
      <div
        className="w-[79rem] h-[29.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative overflow-y-scroll"
        // @ts-ignore
        ref={playlistScrollRef!}
      >
        <ul data-testid="playlist" className="flex flex-col pt-3">
          {selectedPlaylistData?.playlistItems!.map((playlistItem, index) => (
            <li
              key={playlistItem.videoId}
              data-testid={playlistItem.videoId}
              className={`h-[3.2rem] pt-1 pb-1 pr-3 mr-2 ml-3 flex flex-row text-[1.75rem] text-left cursor-pointer hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold ${
                selectedPlaylistItemIndex === index
                  ? "bg-select-highlight-blue text-black text-shadow-none font-semibold"
                  : "text-white text-shadow-black"
              }`}
              onClick={() => handleSelectPlaylistItem(playlistItem, index)}
            >
              <div className="w-[4.5rem] flex justify-center">
                <p className="">{index + 1}</p>
              </div>
              <Image
                src={playlistItem.thumbnail.url}
                alt="add playlist"
                width={70}
                height={36}
                priority
                className="ml-6 mr-2"
              />
              <p className="pl-7 w-[67rem] truncate">{playlistItem.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Playlist;
