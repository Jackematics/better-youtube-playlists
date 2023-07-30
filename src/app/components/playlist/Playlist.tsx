const Playlist = () => {
  return (
    <>
      <ul className="flex flex-col pt-5">
        <li className="pt-2 pr-7 pb-2 mr-3 ml-3 flex flex-row text-3xl text-shadow-black text-left cursor-pointer text-white font-medium hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold">
          <p className="pl-7">1</p>
          <div className="bg-black w-[4.5rem] ml-7"></div>
          <p className="pl-7">Kid Moxie & NINA - Electric Kiss</p>
          <p className="absolute right-3 pr-7">4:01</p>
        </li>
        <li className="pt-2 pr-7 pb-2 mr-3 ml-3 flex flex-row text-3xl text-shadow-black text-left cursor-pointer text-white font-medium hover:bg-hover-highlight-blue hover:text-black hover:text-shadow-none hover:font-semibold">
          <p className="pl-7">1</p>
          <div className="bg-black w-[4.5rem] ml-7"></div>
          <p className="pl-7">Kid Moxie & NINA - Electric Kiss</p>
          <p className="absolute right-3 pr-7">4:01</p>
        </li>
      </ul>
    </>
  );
};

export default Playlist;
