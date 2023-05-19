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
        path: '/pharmacies',
        component: lazy(() => import('../../views/pharmacy/Pharmacie'))
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
