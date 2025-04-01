import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function ApplicationLayout() {
    return (
        <div>
            <Header />
            <main className="pt-14 px-4 pb-4 w-full bg-stone-50">
                <Outlet />
            </main>
        </div>
    )
}
