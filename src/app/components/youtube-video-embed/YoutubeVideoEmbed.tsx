import { PlaylistItem } from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";
import Youtube from "react-youtube";

type YoutubeVideoEmbedProps = {
  selectedPlaylistItem: PlaylistItem | undefined;
  videoEndCallback: () => void;
};

const youtubeEmbedOptions = {
  width: 608,
  height: 416,
  playerVars: {
    autoplay: 1,
  },
  allow: "autoplay",
};

const YoutubeVideoEmbed = ({
  selectedPlaylistItem,
  videoEndCallback,
}: YoutubeVideoEmbedProps) => {
  return (
    <>
      <div className="flex-initial min-w-[38rem] h-[26rem] mt-4 mr-4 relative">
        {selectedPlaylistItem ? (
          <div data-testid={selectedPlaylistItem.title}>
            <Youtube
              videoId={selectedPlaylistItem.videoId}
              opts={youtubeEmbedOptions}
              onEnd={videoEndCallback}
            />
          </div>
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
      </div>
    </>
  );
};

export default YoutubeVideoEmbed;
