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
    },
    {
        path: "/Reg",
        name: "Reg",
        children:[
            {
                path: "/Reg/estudiante",
                name: "estudiante",
            },
            {
                path: "/Reg/administrador",
                name: "administrador",
            },
        ],
    },
] as const 