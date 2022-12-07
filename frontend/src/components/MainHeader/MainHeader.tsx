import { FiArrowLeft } from "react-icons/fi";
import "./MainHeader.css";

interface MainHeaderProps {
    title: string;
    href: string;
    action?: () => void;
}

export default function SocialAuth({ title, href}: MainHeaderProps) {
    return (
        <div className="headerMain">
            <a href={href}>
                <button className="goBackMain">
                    <FiArrowLeft />
                </button>
            </a>
            <p className="titleMain">{title}</p>
            <img className="imgMain" src="../../assets/Rectangle 475.svg" alt="" />
            
        </div>
    )
}