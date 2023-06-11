'use client'

import Image from 'next/image'

type PlaylistListProps = {
    openAddPlaylistModalCallback: () => void;
}

const PlaylistList = ({openAddPlaylistModalCallback}: PlaylistListProps) => {
        return (
        <>
            <div className="w-72 h-screen bg-container-dark-blue m-5 border-4 relative">
                <h2 className="text-white text-5xl font-bold text-shadow-black flex justify-center mt-5 mb-5">Playlists</h2>
                <div className="pl-6 flex flex-col">
                    <button className="text-white text-3xl text-shadow-black text-left mb-2 rounded-2xl w-max pl-4 pr-4 pb-1 pt-1 hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-white focus:bg-select-highlight-blue focus:text-black focus:text-shadow-white">Synth Haven</button>
                    <button className="text-white text-3xl text-shadow-black text-left mb-2 rounded-2xl w-max pl-4 pr-4 pb-1 pt-1 hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-white focus:bg-select-highlight-blue focus:text-black focus:text-shadow-white">Classical Me</button>
                    <button className="text-white text-3xl text-shadow-black text-left mb-2 rounded-2xl w-max pl-4 pr-4 pb-1 pt-1 hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-white focus:bg-select-highlight-blue focus:text-black focus:text-shadow-white">Jackass</button>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        className="absolute bottom-0 left-0 w-5/6 h-11 ml-5 mb-4 rounded-lg border-2 flex bg-container-light-blue hover:bg-button-highlight-blue focus:bg-button-select-blue"
                        onClick={openAddPlaylistModalCallback}
                        data-testid="add-playlist-button"
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
                        <div className="text-white text-3xl text-shadow-black pl-3 pt-0.5">Add Playlist</div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PlaylistList