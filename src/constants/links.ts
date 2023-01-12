export interface PageRoute {
    path: string;
    displayName: string;
}

export const links: PageRoute[] = [
    { path: "", displayName: "Prva stran" },
    { path: "categories", displayName: "Kategorije" },
    { path: "merchants", displayName: "Trgovci" },
]