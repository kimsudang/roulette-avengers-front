import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const linkLogin = () => {
    navigate("/user");
  };

  const linkLoginSuc = () => {
    navigate("/post/list/0");
  };

  const linkIDE = () => {
    navigate("/code");
  };

  const token = localStorage.getItem("access_token");
  console.log("home");

  return (
    <div className="transform -translate-x-[50%] -translate-y-[50%] Home_Container fixed top-1/2 left-1/2">
      <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl">
        Catch CODE
      </h1>
      {!token && (
        <button
          className="w-full mt-20 text-2xl font-bold bg-transparent border-0 md:text-4xl Link_Btn"
          onClick={linkLogin}
        >
          START
        </button>
      )}
      {token && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <button
            className="w-full mt-20 text-2xl font-bold bg-transparent border-0 md:text-4xl Start_Btn"
            onClick={linkLoginSuc}
          >
            START
          </button>
          <button
            className="w-full mt-20 text-2xl font-bold bg-transparent border-0 md:text-4xl IDE_Btn"
            onClick={linkIDE}
          >
            Go to IDE
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
