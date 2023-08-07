import Image from "next/image";

type PlaylistOperationsProps = {
  prevPlaylistItemCallback: () => void;
};

const PlaylistOperations = ({
  prevPlaylistItemCallback,
}: PlaylistOperationsProps) => {
  return (
    <>
      <button
        onClick={prevPlaylistItemCallback}
        className="w-16 h-16 bg-white rounded-lg border-2 flex items-center justify-center cursor-pointer"
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
    </>
  );
};

export default PlaylistOperations;
