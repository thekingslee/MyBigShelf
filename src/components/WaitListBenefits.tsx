// import Apple from "@/assets/Apple.svg";
// import Android from "@/assets/Android.svg";
// import CustomButton from "@/components/CustomButton";

interface Props {
  number: string;
  children: string;
}

const WaitListBenefits = ({ number, children }: Props) => {
  return (
    <div className="flex items-center gap-6">
      <div className="bg-white w-[50px] h-[50px] rounded-[10px] lg:w-[72.5px] lg:h-[72.5px] lg:rounded-[20px] border border-solid border-custom-secondary flex justify-center items-center">
        <p className="text-3xl text-black font-bold">{number}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="w-[200px] md:w-[350px] text-custom-text-primary text-base lg:text-lg">
          {children}
        </h3>
        {/* Uncomment this when the app is ready */}
        {/* {number === "1" && (
          <div className="flex gap-2">
            <CustomButton img={Apple} text="iPhone" />
            <CustomButton img={Android} text="Android" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WaitListBenefits;
