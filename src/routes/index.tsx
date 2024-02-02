import {AppRoutes} from '@routes/app.routes';
import { useCart } from '@contexts/useCart';


export const Routes = ()=>{

    const test = useCart();
    // console.log('test', test)
    

    return (
        <AppRoutes />
    )
}