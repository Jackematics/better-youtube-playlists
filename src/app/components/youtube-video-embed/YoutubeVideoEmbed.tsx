import Image from "next/image";

const YoutubeVideoEmbed = () => {
  return (
    <>
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
    </>
  );
};

export default YoutubeVideoEmbed;
