import { PlaylistItem } from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";

type YoutubeVideoEmbedProps = {
  selectedPlaylistItem: PlaylistItem;
};

const YoutubeVideoEmbed = ({
  selectedPlaylistItem,
}: YoutubeVideoEmbedProps) => {
  return (
    <>
      {selectedPlaylistItem ? (
        <iframe
          width={608}
          height={416}
          src={`https://www.youtube.com/embed/${selectedPlaylistItem.videoId}`}
          title={selectedPlaylistItem.title}
        />
      ) : (
        <div
          title={"video-placeholder"}
          className="w-[38rem] h-[26rem] bg-black grid place-items-center"
        >
          <Image
            src="/assets/logos/jackematica-logo.svg"
            alt={"page-logo"}
            width={210}
            height={210}
            priority
          />
        </div>
      )}
    </>
  );
};

export default YoutubeVideoEmbed;
