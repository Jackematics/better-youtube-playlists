"use-client";

import { MouseEvent, useState } from "react";
import { PlaylistMetadata } from "../../types/youtube-playlist-metadata-types";
import Image from "next/image";

type PlaylistListProps = {
  playlistMetadataCollection: PlaylistMetadata[];
  openAddPlaylistModalCallback: () => void;
  selectPlaylistCallback: (playlistMetadata: PlaylistMetadata) => void;
};

const PlaylistList = ({
  playlistMetadataCollection,
  openAddPlaylistModalCallback,
  selectPlaylistCallback,
}: PlaylistListProps) => {
  const [focusedPlaylist, setFocusedPlaylist] = useState<string | undefined>(
    undefined
  );

  const handleSelectPlaylist = (metadata: PlaylistMetadata) => {
    setFocusedPlaylist(metadata.id);
    selectPlaylistCallback(metadata);
  };

  return (
    <>
      <h2 className="text-white text-5xl font-bold text-shadow-black flex justify-center mt-5 mb-5">
        Playlists
      </h2>
      <ul className="pl-6 flex flex-col">
        {playlistMetadataCollection.map((metadata) => (
          <li
            key={metadata.id}
            className="mb-3"
            onClick={() => handleSelectPlaylist(metadata)}
          >
            <option
              className={`pl-4 pr-4 pb-1 pt-1 text-3xl text-shadow-black text-left rounded-2xl w-max cursor-pointer truncate hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-white focus:bg-select-highlight-blue focus:text-black focus:text-shadow-white ${
                focusedPlaylist === metadata.id
                  ? "bg-select-highlight-blue text-black text-shadow-white"
                  : "text-white"
              }`}
            >
              {metadata.title}
            </option>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <button
          className="absolute bottom-0 left-0 w-[14.75rem] h-11 ml-[1.3rem] mb-5 rounded-lg border-2 flex bg-container-light-blue hover:bg-button-highlight-blue active:bg-button-select-blue"
          onClick={openAddPlaylistModalCallback}
        >
          <div className="w-10 h-10 bg-white rounded-lg border-2 flex items-center justify-center">
            <Image
              src="/assets/icons/plus.png"
              alt="add playlist"
              width={24}
              height={24}
              priority
            />
          </div>
          <div className="text-white text-3xl text-shadow-black pl-3 pt-0.5">
            Add Playlist
          </div>
        </button>
      </div>
    </>
  );
};

export default PlaylistList;
