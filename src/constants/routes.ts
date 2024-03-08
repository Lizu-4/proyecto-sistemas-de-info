export const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/agrupaciones",
        name: "Agrupaciones",
    },
    {
        path: "/ingresar",
        name: "Ingresar",
    },
    {
        path: "/Registrar",
        name: "Registrar",
        children:[
            {
                path: "/Registrar/estudiante",
                name: "estudiante",
            },
            {
                path: "/Registrar/administrador",
                name: "administrador",
            },
        ],
    },
] as const 