import React,{Suspense, lazy} from 'react';
import { HashRouter, Route,Switch  } from 'react-router-dom';

const HomeContainer = lazy(()=> import('./pages/HomeContainer/HomeContainer'));
const Home = lazy(()=> import('./pages/Home/Home'));
const ItemDetail = lazy(()=> import('./pages/ItemDetail/ItemDetail'));
const Login = lazy(()=> import('./pages/Login/Login'));

class RouterPage extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render (){
        return (
            <HashRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {/* component渲染嵌套路由 */}
                        <Route exact path="/" component={()=>
                            <HomeContainer>
                                <Route exact  path="/" component={Home}></Route>
                                <Route exact  path="/home" component={Home}></Route>
                                <Route exact  path="/detail" component={ItemDetail}></Route>
                            </HomeContainer>
                        }>
                        </Route>
                        <Route exact path="/login" component={Login}></Route>
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}

export default RouterPage;
