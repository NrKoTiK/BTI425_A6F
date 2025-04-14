import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { useEffect } from "react";
import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from "next/router";   
import { useState } from "react";

const PUBLIC_PATHS = ['/register', '/login', '/home'];

export default function RouteGuard(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }
    useEffect(() => {
        authCheck(router.asPath);
        updateAtoms();
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);
    return authorized && props.children;
}
