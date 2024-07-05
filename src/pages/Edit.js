import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const { id } = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const currentData = useDiary(id);
  const navigate = useNavigate();

  usePageTitle("일기 수정하기");

  const onClickDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 수정하시겠습니까?")) {
      onUpdate(id, input.date, input.content, input.emotion);
    }
    navigate("/", { replace: true });
  };

  return (
    <div>
      <MyHeader
        headText={"일기 수정하기"}
        leftChild={
          <MyButton
            text={"< 뒤로 가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          <MyButton
            text={"삭제하기"}
            type={"negative"}
            onClick={onClickDelete}
          />
        }
      />
      {currentData && (
        <DiaryEditor initData={currentData} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default Edit;
