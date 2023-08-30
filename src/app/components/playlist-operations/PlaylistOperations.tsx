import Image from "next/image";

type PlaylistOperationsProps = {
  prevPlaylistItemCallback: () => void;
  nextPlaylistItemCallback: () => void;
};

const PlaylistOperations = ({
  prevPlaylistItemCallback,
  nextPlaylistItemCallback,
}: PlaylistOperationsProps) => {
  return (
    <>
      <div className="flex flex-row">
        <button
          onClick={prevPlaylistItemCallback}
          className="w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer hover:bg-hover-highlight-blue"
          data-testid="previous-playlist-item-button"
        >
          <Image
            src="/assets/icons/previous.png"
            alt="prev playlist item"
            width={42}
            height={42}
            priority
          />
        </button>
        <button
          onClick={nextPlaylistItemCallback}
          className="w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer ml-5 hover:bg-hover-highlight-blue"
          data-testid="next-playlist-item-button"
        >
          <Image
            src="/assets/icons/next.png"
            alt="next playlist item"
            width={42}
            height={42}
            priority
          />
        </button>
      </div>
    </>
  );
};

export default PlaylistOperations;
