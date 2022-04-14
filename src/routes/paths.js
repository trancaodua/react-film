// ----------------------------------------------------------------------

export function path(root, sublink) {
    return `${root}${sublink}`;
}

// ----------------------------------------------------------------------
const ROOTS_FILM = "/film";
const ROOTS_AUTH = "/auth";

export const PATH_FILM = {
    root: ROOTS_FILM,
    genres: path(ROOTS_FILM, "/genres"),
    favorite: path(ROOTS_FILM, "/favorite"),
    search: path(ROOTS_FILM, "/search"),
};

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, "/login"),
};
