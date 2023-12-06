import { useSelector } from "react-redux";
import { ReactComponent as MoreIcon } from "../../../../assets/icons/more.svg";
import { useContext, useRef, useState } from "react";
import useCloseWidget from "hooks/useCloseWidget";
import Delete from "./Delete";
import Edit from "./Edit";
import SavePost from "./SavePost";
import ToggleComments from "./ToggleComments";
import { PostContext } from "pages/post";
import CopyLink from "./CopyLink";

const OptionsBtn = (props) => {
  const { setIsModifying } = props;
  const { _id: id, creatorId } = useContext(PostContext);

  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.settings.mode);
  const [isOpen, setIsOpen] = useState(false);
  // const { isCommentsDisabled, setIsCommentsDisabled } = useContext(PostContext);
  const optionsList = useRef(null);
  useCloseWidget(optionsList, setIsOpen);
  return (
    <div className="relative">
      <button
        aria-label="post options"
        className={`aspect-square w-10 flex justify-center ${
          mode === "dark"
            ? "hover:bg-[#303343] focus:bg-[#303343]"
            : "hover:bg-[#eaedfb] focus:bg-[#eaedfb]"
        } items-center icon transition cursor-pointer `}
        style={{ borderRadius: "50%" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreIcon style={{ fill: mode === "dark" ? "#c3c5cd" : "#5b5d67 " }} />
      </button>
      {isOpen && (
        <ul
          className={`absolute top-[100%] right-0 radius w-max overflow-hidden z-10 ${
            mode === "dark" ? "bg-300" : "bg-100"
          }`}
          ref={optionsList}
          onClick={() => setIsOpen(!isOpen)}
        >
          {user._id === creatorId && (
            <>
              <Delete id={id} user={user} />
              <Edit setIsModifying={setIsModifying} id={id} user={user} />
              <ToggleComments />
            </>
          )}
          <SavePost postPath={`${creatorId}/${id}`} />
          <CopyLink postPath={`${creatorId}/${id}`} />
        </ul>
      )}
    </div>
  );
};

export default OptionsBtn;
