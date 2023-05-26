import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    {
        path: '/home',
        component: lazy(() => import('../../views/Home'))
    },
    {
        path: '/cities',
        component: lazy(() => import('../../views/villes/Ville'))
    },
    {
        path: '/create-city',
        component: lazy(() => import('../../views/villes/CreateVille'))
    },
    {
        path: '/pharmacies',
        component: lazy(() => import('../../views/pharmacy/Pharmacie'))
    },
    {
        path: '/pharmacy/:id',
        component: lazy(() => import('../../views/pharmacy/PharmacyDetail'))
    },
    {
        path: '/create-pharmacy',
        component: lazy(() => import('../../views/pharmacy/CreatePharmacie'))
    },
    {
        path: '/zones',
        component: lazy(() => import('../../views/zone/Zone'))
    },
    {
        path: '/create-zone',
        component: lazy(() => import('../../views/zone/CreateZone'))
    },
    {
        path: '/gardes',
        component: lazy(() => import('../../views/garde/Garde'))
    },
    {
        path: '/create-garde',
        component: lazy(() => import('../../views/garde/CreateGarde'))
    },
    {
        path: '/second-page',
        component: lazy(() => import('../../views/SecondPage'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    }
]

export {DefaultRoute, TemplateTitle, Routes}
