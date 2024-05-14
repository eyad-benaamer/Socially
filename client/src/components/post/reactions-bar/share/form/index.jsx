import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { submit } from "./submit";

import { PostContext } from "components/post";
import { PostsContext } from "components/posts";

const Form = (props) => {
  const { data, setData, setIsOpened } = props;
  const [isValidPost, setIsValidPost] = useState(false);
  const { _id: userId, token } = useSelector((state) => state.user);
  const { _id: postId, creatorId } = useContext(PostContext);
  const { posts, setPosts } = useContext(PostsContext);

  const { id: userIdParam } = useParams();

  useEffect(() => {
    if (data.text != "") {
      setIsValidPost(true);
    } else {
      setIsValidPost(false);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-3 w-[280px] sm:w-[500px]">
      <textarea
        autoFocus
        value={data.text}
        className="mt-2"
        dir="auto"
        name="text"
        placeholder="Type anything about this...."
        onChange={(e) => {
          setData((prev) => ({ ...prev, text: e.target.value }));
        }}
      />
      <button
        disabled={!isValidPost}
        className={`${
          isValidPost ? "bg-primary" : "bg-secondary"
        } self-end py-2 px-4 rounded-xl text-white`}
        onClick={() => {
          setIsOpened(false);
          submit(data, token, creatorId, postId).then((response) => {
            /*
            check if the current page is niether another user's page nor the home page
            if so, then the shared post will appear on the top of the existing posts
            */
            if (!userIdParam || userId == userIdParam) {
              if (posts) {
                setPosts([response, ...posts]);
              } else {
                setPosts(response);
              }
            }
          });
        }}
      >
        Share
      </button>
    </div>
  );
};

export default Form;
