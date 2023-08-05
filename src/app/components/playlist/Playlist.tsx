import {
  PlaylistData,
  PlaylistItem,
} from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PlaylistProps = {
  selectedPlaylistData: PlaylistData | undefined;
  currentVideoEnded: boolean;
  playlistItemSelectCallback: (playlistItem: PlaylistItem) => void;
};

const Playlist = ({
  selectedPlaylistData,
  currentVideoEnded,
  playlistItemSelectCallback,
}: PlaylistProps) => {
  const [selectedPlaylistItemIndex, setSelectedPlaylistItemIndex] = useState<
    number | undefined
  >();
  const playlistScrollRef = useRef<HTMLDivElement | undefined>();

  useEffect(() => {
    if (!playlistScrollRef.current) {
      playlistScrollRef.current = document.createElement("div");
    }
  }, []);

  const handleSelectPlaylistItem = (
    playlistItem: PlaylistItem,
    index: number
  ) => {
    setSelectedPlaylistItemIndex(index);
    playlistItemSelectCallback(playlistItem);
  };

  useEffect(() => {
    const firstItem = selectedPlaylistData?.playlistItems![0];
    firstItem && handleSelectPlaylistItem(firstItem, 0);
  }, [selectedPlaylistData]);

  const selectNextVideo = () => {
    const playlistItems = selectedPlaylistData?.playlistItems!;

    let nextItemIndex = selectedPlaylistItemIndex! + 1;
    if (selectedPlaylistItemIndex === playlistItems.length - 1) {
      nextItemIndex = 0;
    }

    setSelectedPlaylistItemIndex(nextItemIndex);
    handleSelectPlaylistItem(playlistItems[nextItemIndex], nextItemIndex);
  };

  const scrollItemToContainerCenter = () => {
    const playlistItemHeight = 51.2;
    const indexMultiplier = selectedPlaylistItemIndex!;

    let scrollCalc = playlistItemHeight * indexMultiplier;

    if (
      selectedPlaylistItemIndex! ===
      selectedPlaylistData!.playlistItems!.length - 1
    ) {
      scrollCalc = 0;
    }

    if (playlistScrollRef.current) {
      playlistScrollRef.current.scrollTop = scrollCalc;
    }
  };

  useEffect(() => {
    if (currentVideoEnded && selectedPlaylistItemIndex !== undefined) {
      selectNextVideo();
      scrollItemToContainerCenter();
    }
  }, [currentVideoEnded]);

  return (
    <>
      <div
        className="w-[79rem] h-[29.5rem] min-w-[30rem] bg-container-dark-blue mt-4 border-4 relative overflow-y-scroll"
        // @ts-ignore
        ref={playlistScrollRef}
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
