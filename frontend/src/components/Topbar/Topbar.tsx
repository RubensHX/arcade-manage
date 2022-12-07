import { FiArrowLeft } from "react-icons/fi";
import "./Topbar.css";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <div className="topbar">
      <header>
        <a href="/homePage">
          <button className="arrowLeft">
            <FiArrowLeft />
          </button>
        </a>
        <h2>{title}</h2>
        <img src="../../assets/Rectangle 475.svg" alt="logo"/>
      </header>
    </div>
  );
}
