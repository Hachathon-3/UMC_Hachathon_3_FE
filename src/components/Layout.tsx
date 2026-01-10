import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <header>
                <nav>
                    <h1>Anxiety Community</h1>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>© 2026 Anxiety Community. All rights reserved.</p>
            </footer>
        </div>
    );
}
