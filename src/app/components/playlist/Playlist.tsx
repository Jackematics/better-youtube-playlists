import { PlaylistData } from "@/app/types/youtube-playlist-items-types";

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
            <p className="pl-7">{index + 1}</p>
            <div className="bg-black w-[4.5rem] ml-7"></div>
            <p className="pl-7">{item.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlist;
