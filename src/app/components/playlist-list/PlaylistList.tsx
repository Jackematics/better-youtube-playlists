import Image from 'next/image'

const PlaylistList = () => {
    return (
        <>
            <div className="w-1/6 h-screen bg-container-dark-blue m-5 border-4 relative">
                <h2 className="text-white text-5xl font-bold text-shadow-black flex justify-center mt-5 mb-5">Playlists</h2>
                <div className="pl-10 flex flex-col">
                    <button className="text-white text-3xl text-shadow-black text-left mb-4">Synth Haven</button>
                    <button className="text-white text-3xl text-shadow-black text-left mb-4">Classical Me</button>
                    <button className="text-white text-3xl text-shadow-black text-left mb-4">Jackass</button>
                </div>
                <div className="flex items-center justify-center">
                    <div className="absolute bottom-0 left-0 w-5/6 h-11 ml-5 mb-4 rounded-lg border-2 flex bg-container-light-blue">
                        <div className="w-10 h-10 bg-white rounded-lg border-2 flex items-center justify-center">
                            <Image
                                src="/assets/icons/plus.png"
                                alt="add playlist" 
                                width={24}
                                height={24}
                                priority
                            />
                        </div>
                        <button className="text-white text-3xl text-shadow-black pl-3">Add Playlist</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaylistList