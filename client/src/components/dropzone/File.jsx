import { ReactComponent as CloseIcon } from "assets/icons/cross.svg";

const File = (props) => {
  const { filePreview, file, setFiles, setFilesPreview } = props;

  return (
    <div className="col-span-2 sm:col-span-2 md:col-span-1 relative">
      <button
        className="w-5 circle bg-slate-50 absolute z-10 right-2 top-2 border-2 border-[var(--primary-color)]"
        onClick={() => {
          setFiles((prev) => {
            let newArray = prev.filter((product) => product != file);
            return newArray;
          });
          setFilesPreview((prev) => {
            let newArray = prev.filter((product) => product != filePreview);
            return newArray;
          });
        }}
      >
        <div className="text-black w-full hover:text-[var(--primary-color)] transition">
          <CloseIcon />
        </div>
      </button>
      <div className="rounded-xl overflow-hidden border-2 border-[var(--primary-color)] aspect-square">
        {file.type.startsWith("image") ? (
          <img className="max-w-full min-h-full" src={filePreview} />
        ) : (
          <video className="max-w-full min-h-full bg-black" src={filePreview} />
        )}
      </div>
    </div>
  );
};

export default File;
