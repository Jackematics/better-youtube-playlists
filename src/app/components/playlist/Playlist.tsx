import {
  PlaylistData,
  PlaylistItem,
} from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";
import { useState } from "react";

type PlaylistProps = {
  selectedPlaylistData: PlaylistData | undefined;
  playlistItemSelectCallback: (playlistItem: PlaylistItem) => void;
};

const Playlist = ({
  selectedPlaylistData,
  playlistItemSelectCallback,
}: PlaylistProps) => {
  const [focusedPlaylistItem, setFocusedPlaylistItem] = useState<
    string | undefined
  >(undefined);

  const handleSelectPlaylistItem = (playlistItem: PlaylistItem) => {
    setFocusedPlaylistItem(playlistItem.videoId);
    playlistItemSelectCallback(playlistItem);
  };

  return (
    <>
      <ul data-testid="playlist" className="flex flex-col pt-3">
        {selectedPlaylistData?.playlistItems!.map((playlistItem, index) => (
          <li
            key={playlistItem.videoId}
            data-testid={playlistItem.videoId}
            className={`h-[3.2rem] pt-1 pb-1 pr-3 mr-2 ml-3 flex flex-row text-[1.75rem] text-left cursor-pointer hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold ${
              focusedPlaylistItem === playlistItem.videoId
                ? "bg-select-highlight-blue text-black text-shadow-none font-semibold"
                : "text-white text-shadow-black"
            }`}
            onClick={() => handleSelectPlaylistItem(playlistItem)}
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
    </>
  );
};

export default Playlist;
