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
                name: "Estudiante",
            },
            {
                path: "/Registrar/administrador",
                name: "Administrador",
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
    {
        path: "/EditarPerfil",
        name: "EditarPerfil",
    },
    
] as const 