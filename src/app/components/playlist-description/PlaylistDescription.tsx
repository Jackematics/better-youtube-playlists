import { SelectedPlaylistMetadata } from "@/app/types/youtube-playlist-metadata-types";

type PlaylistDescriptionProps = {
  selectedPlaylistMetadata: SelectedPlaylistMetadata | undefined;
};

const PlaylistDescription = ({
  selectedPlaylistMetadata,
}: PlaylistDescriptionProps) => {
  return (
    <>
      <h2
        className="text-white text-7xl font-bold text-shadow-black-thick mt-5 ml-5"
        data-testid="selected-playlist-title"
      >
        {selectedPlaylistMetadata ? selectedPlaylistMetadata.title : ""}
      </h2>
      <p className="text-white text-4xl font-semibold text-shadow-black mt-10 ml-5">
        {selectedPlaylistMetadata ? selectedPlaylistMetadata.channelTitle : ""}
      </p>
      <p className="text-white text-4xl font-semibold text-shadow-black mt-9 ml-5">
        {selectedPlaylistMetadata
          ? `${selectedPlaylistMetadata.totalResults} videos`
          : ""}
      </p>
    </>
  );
};

export default PlaylistDescription;
