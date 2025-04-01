import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function ApplicationLayout() {
    return (
        <div>
            <Header />
            <main className="pt-14 w-full px-4  bg-stone-50">
                <Outlet />
            </main>
        </div>
    )
}
