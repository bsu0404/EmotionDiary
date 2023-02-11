import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);

  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정페이지입니다.</p>
      <button onClick={() => setSearchParams({ who: "sungeun" })}>
        바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        home으로
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
};

export default Edit;
