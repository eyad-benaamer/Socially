import { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

import useCloseWidget from "hooks/useCloseWidget";

import Delete from "./Delete";
import Edit from "./Edit";
import CopyLink from "./CopyLink";

import { PostContext } from "components/post";

import { ReactComponent as MoreIcon } from "assets/icons/more.svg";

const OptionsBtn = (props) => {
  const { commentId, replyId, replyCreatorId, setIsModifying } = props;
  const profile = useSelector((state) => state.profile);
  const theme = useSelector((state) => state.settings.theme);
  const [isOpen, setIsOpen] = useState(false);
  const post = useContext(PostContext);
  const optionsList = useRef(null);

  useCloseWidget(optionsList, setIsOpen);

  return (
    <div ref={optionsList} className="relative">
      <button
        aria-label="comment options"
        className={`aspect-square w-10 flex justify-center ${
          theme === "dark"
            ? "hover:bg-[#303343] focus:bg-[#303343]"
            : "hover:bg-[#eaedfb] focus:bg-[#eaedfb]"
        } items-center icon transition cursor-pointer `}
        style={{ borderRadius: "50%" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreIcon style={{ fill: theme === "dark" ? "#c3c5cd" : "#5b5d67 " }} />
      </button>
      {isOpen && (
        <ul
          className={`menu absolute top-[100%] right-0 rounded-xl w-max overflow-hidden z-20 ${
            theme === "dark" ? "bg-300" : "bg-100"
          }`}
        >
          {profile && profile._id === replyCreatorId && (
            <Delete
              userId={post.creatorId}
              postId={post._id}
              commentId={commentId}
              replyId={replyId}
            />
          )}
          {profile && profile._id === replyCreatorId && (
            <Edit setIsModifying={setIsModifying} />
          )}
          <CopyLink
            commentPath={`${post.creatorId}/${post._id}/${commentId}/${replyId}`}
          />
        </ul>
      )}
    </div>
  );
};

export default OptionsBtn;
