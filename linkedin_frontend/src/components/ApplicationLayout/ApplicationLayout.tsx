import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function ApplicationLayout() {
    return (
        <div>
            <Header />
            <main className="pt-12">
                <Outlet />
            </main>
        </div>
    )
}
