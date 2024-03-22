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
    {
        path: "/Perfil",
        name: "Perfil",
    },
    {
        path: "/RecuperarClave",
        name: "RecuperarClave",
    },
    {
        path: "/Grupo/:id",
        name: "Grupo",
    },
    {
        path: "/Dashboard",
        name: "Dashboard",
    },
    
] as const 