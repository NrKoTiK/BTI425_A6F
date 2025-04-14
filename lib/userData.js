import { getToken } from "./authenticate";
const dotenv = require("dotenv");
dotenv.config();

export async function addToFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function removeFromFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
 }

export async function getFavourites() { 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, { // add the env back
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
 }

export async function removeFromHistory(id) { 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function getHistory() { 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`,
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}
