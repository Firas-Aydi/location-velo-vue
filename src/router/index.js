import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ModifierClientComponent from '@/components/client/ModifierClient';
import ModifierVeloComponent from '@/components/velo/ModifierVelo';
import ModifierTarifComponent from '@/components/tarif/ModifierTarif';
import AjouterClientComponent from '@/components/client/AjouterClient';
import AjouterVeloComponent from '@/components/velo/AjouterVelo';
import AjouterTarifComponent from '@/components/tarif/AjouterTarif';
import ClientComponent from '@/components/client/Client';
import VeloComponent from '@/components/velo/Velo';
import TarifComponent from '@/components/tarif/Tarif';
import GuideComponent from '@/components/guide/Guide';
import AjouterGuideComponent from '@/components/guide/AjouterGuide';
import ModifierGuideComponent from '@/components/guide/ModifierGuide';
import DommageComponent from '@/components/dommage/Dommage';
import AjouterDommageComponent from '@/components/dommage/AjouterDommage';
import ModifierDommageComponent from '@/components/dommage/ModifierDommage';
import ReparationComponent from '@/components/reparation/Reparation';
import AjouterReparationComponent from '@/components/reparation/AjouterReparation';
import ModifierReparationComponent from '@/components/reparation/ModifierReparation';
import AccessoireComponent from '@/components/accessoire/Accessoire';
import AjouterAccessoireComponent from '@/components/accessoire/AjouterAccessoire';
import ModifierAccessoireComponent from '@/components/accessoire/ModifierAccessoire';
import UserComponent from '@/components/user/User';
import AjouterUserComponent from '@/components/user/AjouterUser';
import ModifierUserComponent from '@/components/user/ModifierUser';
import RetourComponent from '@/components/retour/Retour';
import ReserverComponent from '@/components/reservation/Reserver';
import ProduitComponent from '@/components/reservation/Produit';
import InformationComponent from '@/components/reservation/Information';
import PaiementComponent from '@/components/reservation/Paiement';
import TypeClientComponent from '@/components/client/TypeClient';
import AjouterTypeClientComponent from '@/components/client/AjouterTypeClient';
import ModifierTypeClientComponent from '@/components/client/ModifierTypeClient';
import MarqueVeloComponent from '@/components/velo/MarqueVelo';
import AjouterMarqueVeloComponent from '@/components/velo/AjouterMarqueVelo';
import ModifierMarqueVeloComponent from '@/components/velo/ModifierMarqueVelo';
import ModeleComponent from '@/components/velo/Modele';
import AjouterModeleComponent from '@/components/velo/AjouterModele';
import ModifierModeleComponent from '@/components/velo/ModifierModele';
import Location from '@/components/location/Location';
import Detail from '@/components/location/Detail';
import Contrat from '@/components/location/Contrat';

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Logout from '@/components/auth/Logout'
import store from '../store';
// import store from '@/store/index'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/client',
    name: 'Client',
    component: ClientComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable de location'
    }
  },
  {
    path: '/velo',
    name: 'Velo',
    component: VeloComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/tarif',
    name: 'Tarif',
    component: TarifComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable commercial'
    }
  },
  {
    path: '/AjouterClient',
    name: 'AjouterClient',
    component: AjouterClientComponent
  },
  {
    path: '/AjouterVelo',
    name: 'AjouterVelo',
    component: AjouterVeloComponent
  },
  {
    path: '/AjouterTarif',
    name: 'AjouterTarif',
    component: AjouterTarifComponent
  },
  {
    path: '/modifierClient/:id',
    name: 'ModifierClient',
    component: ModifierClientComponent
  },
  {
    path: '/modifierVelo/:id',
    name: 'ModifierVelo',
    component: ModifierVeloComponent
  },
  {
    path: '/modifierTarif/:id',
    name: 'ModifierTarif',
    component: ModifierTarifComponent
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuideComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/AjouterGuide',
    name: 'AjouterGuide',
    component: AjouterGuideComponent
  },
  {
    path: '/modifierGuide/:id',
    name: 'ModifierGuide',
    component: ModifierGuideComponent
  },
  {
    path: '/dommage',
    name: 'Dommage',
    component: DommageComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable de location'
    }
  },
  {
    path: '/AjouterDommage',
    name: 'AjouterDommage',
    component: AjouterDommageComponent
  },
  {
    path: '/modifierDommage/:id',
    name: 'ModifierDommage',
    component: ModifierDommageComponent
  },
  {
    path: '/reparation',
    name: 'Reparation',
    component: ReparationComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/AjouterReparation',
    name: 'AjouterReparation',
    component: AjouterReparationComponent
  },
  {
    path: '/modifierReparation/:id',
    name: 'ModifierReparation',
    component: ModifierReparationComponent
  },
  {
    path: '/accessoire',
    name: 'Accessoire',
    component: AccessoireComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/AjouterAccessoire',
    name: 'AjouterAccessoire',
    component: AjouterAccessoireComponent
  },
  {
    path: '/modifierAccessoire/:id',
    name: 'ModifierAccessoire',
    component: ModifierAccessoireComponent
  },
  {
    path: '/user',
    name: 'User',
    component: UserComponent,
    meta: {
      requiresAuth: true,
      role: 'Administrateur'
    }
  },
  {
    path: '/AjouterUser',
    name: 'AjouterUser',
    component: AjouterUserComponent
  },
  {
    path: '/modifierUser/:id',
    name: 'ModifierUser',
    component: ModifierUserComponent
  },
  {
    path: '/retour',
    name: 'Retour',
    component: RetourComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable de location'
    }
  },
  {
    path: '/reserver',
    name: 'Reserver',
    component: ReserverComponent,
    meta: {
      requiresAuth: true,
      // role: 'Administrateur'
    }
  },
  {
    path: '/produit',
    name: 'Produit',
    component: ProduitComponent
  },
  {
    path: '/information',
    name: 'Information',
    component: InformationComponent
  },
  {
    path: '/paiement',
    name: 'Paiement',
    component: PaiementComponent
  },
  {
    path: '/type-client',
    name: 'TypeClient',
    component: TypeClientComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable de location'
    }
  },
  {
    path: '/AjouterTypeClient',
    name: 'AjouterTypeClient',
    component: AjouterTypeClientComponent
  },
  {
    path: '/modifierTypeClient/:id',
    name: 'ModifierTypeClient',
    component: ModifierTypeClientComponent
  },
  {
    path: '/marque-velo',
    name: 'MarqueVelo',
    component: MarqueVeloComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/AjouterMarqueVelo',
    name: 'AjouterMarqueVelo',
    component: AjouterMarqueVeloComponent
  },
  {
    path: '/modifierMarqueVelo/:id',
    name: 'ModifierMarqueVelo',
    component: ModifierMarqueVeloComponent
  },
  {
    path: '/modele',
    name: 'Modele',
    component: ModeleComponent,
    meta: {
      requiresAuth: true,
      role: 'Responsable vélo et guide'
    }
  },
  {
    path: '/AjouterModele',
    name: 'AjouterModele',
    component: AjouterModeleComponent
  },
  {
    path: '/modifierModele/:id',
    name: 'ModifierModele',
    component: ModifierModeleComponent
  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
    meta: {
      requiresAuth: true,
      role: 'Responsable de location'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/contrat',
    name: 'Contrat',
    component: Contrat
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
let allowedPaths = (role)=>{
    return routes.filter(rt=>rt.meta && rt.meta.role===role).map(rt=>rt.name)
}
router.beforeEach((to, from, next) => {
  store.commit("updateRole")
  store.commit("updateToken")
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } 
      else {
          let role = localStorage.getItem('role')
          if(to.matched.some(record => record.meta.role !== "")) {
            let paths = allowedPaths(role)
              if(role === "Administrateur"){
                  next()
              }else if(paths.indexOf(to.name)>=0){
                 next()
              }
              else if(to.name==='Reserver'){
                  next()
              }
          }else {
              next()
          }
      }
  } 
  else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'Reserver'})
      }
  }else {
      next()
  }
})
export default router
