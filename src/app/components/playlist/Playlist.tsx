import { PlaylistData } from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";

type PlaylistProps = {
  selectedPlaylistData: PlaylistData | undefined;
};

const Playlist = ({ selectedPlaylistData }: PlaylistProps) => {
  return (
    <>
      <ul data-testid="playlist" className="flex flex-col pt-3">
        {selectedPlaylistData?.items!.map((item, index) => (
          <li
            key={item.videoId}
            className="h-[3.2rem] pt-1 pb-1 pr-3 mr-2 ml-3 flex flex-row text-[1.75rem] text-shadow-black text-left cursor-pointer text-white hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold"
          >
            <div className="w-[4.5rem] flex justify-center">
              <p className="">{index + 1}</p>
            </div>
            <Image
              src={item.thumbnail.url}
              alt="add playlist"
              width={60}
              height={36}
              priority
              className="ml-6 mr-2"
            />
            <p className="pl-7 w-[67rem] truncate">{item.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlist;
