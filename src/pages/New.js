import { useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";
const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  usePageTitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate(input.date, input.content, input.emotion);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로 가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <DiaryEditor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
