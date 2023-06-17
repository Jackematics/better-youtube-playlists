"use-client";

import { useState } from "react";

type AddPlaylistModalProps = {
  addPlaylistIdCallback: (playlistId: string) => void;
  closePlaylistModalCallback: () => void;
};

const AddPlaylistModal = ({
  addPlaylistIdCallback,
  closePlaylistModalCallback,
}: AddPlaylistModalProps) => {
  const [playlistId, setPlaylistId] = useState<string>("");

  const handlePlaylistIdInputChange = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setPlaylistId(e.currentTarget.value);
  };

  const handleAddClick = () => {
    addPlaylistIdCallback(playlistId);
    closePlaylistModalCallback();
  };

  return (
    <>
      <div className="w-[36rem] h-[21rem] bg-container-dark-blue border-4 fixed top-1/2 left-1/2 translate-center">
        <h2 className="text-white text-5xl font-bold text-shadow-black mt-5 ml-16">
          Add Playlist
        </h2>
        <p className="text-white text-lg text-shadow-black mt-7 ml-5">
          Input the playlist id of a Youtube playlist. This is the part after
          &apos;<i>www.youtube.com/playlist?list=</i>&apos; in the YouTube
          playlist url.
        </p>
        <div className="flex justify-center items-center">
          <div className="w-[30rem] h-14 bg-container-light-blue border-2 rounded flex justify-center mt-5">
            <input
              className="w-[29rem] h-10 bg-white rounded flex justify-center mt-1.5 pl-3 text-xl"
              data-testid="playlist-id-input"
              placeholder="e.g. PLtcWcWdp-TofpVedRiMRoH7rB20gQczgh"
              onChange={handlePlaylistIdInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            className="w-36 h-14 bg-confirm-green border-2 rounded-lg text-3xl font-bold"
            data-testid="add-id-button"
            onClick={handleAddClick}
          >
            Add
          </button>
          <button
            className="w-36 h-14 bg-cancel-red border-2 rounded-lg text-3xl font-bold ml-16 hover:bg-cancel-hover-red active:bg-cancel-active-red"
            onClick={closePlaylistModalCallback}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPlaylistModal;
