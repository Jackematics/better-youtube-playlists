import { PlaylistData } from "@/app/types/youtube-playlist-items-types";
import Image from "next/image";

type PlaylistProps = {
  selectedPlaylistData: PlaylistData | undefined;
};

const Playlist = ({ selectedPlaylistData }: PlaylistProps) => {
  return (
    <>
      <ul data-testid="playlist" className="flex flex-col pt-5">
        {selectedPlaylistData?.items!.map((item, index) => (
          <li
            key={item.videoId}
            className="pt-2 pr-7 pb-2 mr-3 ml-3 flex flex-row text-3xl text-shadow-black text-left cursor-pointer text-white font-medium hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold"
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
            <p className="pl-7">{item.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlist;
