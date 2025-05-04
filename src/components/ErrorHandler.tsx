import Error from "@/assets/error.png";

interface ErrorHandlerProps {
  fullHeight?: boolean;
}

const ErrorHandler = ({ fullHeight }: ErrorHandlerProps) => {
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center w-full ${
        fullHeight ? "h-screen" : ""
      }`}
    >
      <img className="h-20 w-20" src={Error} alt="Error Icon" />
      <h2 className="text-2xl font-bold font-interFont text-custom-text-primary">
        Something went wrong.
      </h2>
      <p className="text-sm font-interFont font-semibold text-custom-text-primary">
        Refresh and make sure you have a good network.
      </p>
    </div>
  );
};

export default ErrorHandler;
