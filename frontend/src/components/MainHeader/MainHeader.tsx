import { FiArrowLeft } from "react-icons/fi";
import "./MainHeader.css";

interface MainHeaderProps {
    title: string;
    action?: () => void;
}

export default function SocialAuth({ title, }: MainHeaderProps) {
    return (
        <div className="headerMain">
            <button className="goBackMain">
              <FiArrowLeft />
            </button>
            <p className="titleMain">{title}</p>
            <img className="imgMain" src="../../assets/Rectangle 475.svg" alt="" />
            
        </div>
    )
}