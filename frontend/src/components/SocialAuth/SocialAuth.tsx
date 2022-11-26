import "./SocialAuth.css";

interface SocialAuthProps {
    title: string;
    icon: any;
    action?: () => void;
}

export default function SocialAuth({ title, icon, action }: SocialAuthProps) {
    return (
        <button className="signUpButton" type="submit" onClick={action}> {icon} {title}</button>
    )
}