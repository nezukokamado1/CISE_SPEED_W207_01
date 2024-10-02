// components/ModeratorLayout.tsx
import Link from 'next/link';

const ModeratorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="moderator-portal">
            <div className="sidebar">
                <h2>Moderator Tools</h2>
                <ul>
                    <li><Link href="/submission-form" className="linkButton">Submission</Link></li>
                    <li><button className="linkButton">Analyst</button></li>
                    <li><button className="linkButton">Notifications</button></li>
                    <Link href="/" className="logoutButton">Logout</Link>
                </ul>
            </div>

            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default ModeratorLayout;
