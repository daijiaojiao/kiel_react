import React,{Suspense, lazy} from 'react';
import { HashRouter, Route,Switch  } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { createBrowserHistory } from "history";

const HomeContainer = lazy(()=> import('./pages/HomeContainer/HomeContainer'));
const Home = lazy(()=> import('./pages/Home/Home'));
const SearchList = lazy(()=> import('./pages/SearchList/SearchList'));
const SearchDoc = lazy(()=> import('./pages/SearchDoc/SearchDoc'));
const SearchIp = lazy(()=> import('./pages/SearchIp/SearchIp'));
const ItemDetail = lazy(()=> import('./pages/ItemDetail/ItemDetail'));
const Login = lazy(()=> import('./pages/Login/Login'));
const Register = lazy(()=>import('./pages/Register/Register'));
const MyAccount = lazy(()=>import('./pages/MyAccount/MyAccount'));
const history = createBrowserHistory();
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
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/register" component={Register}></Route>
                        <Route strict path="/" component={()=>
                            <HomeContainer history={ history}>
                                <Route exact  path="/" component={Home}></Route>
                                <Route exact  path="/home" component={Home}></Route>
                                <Route exact  path="/searchList/:mcid" component={SearchList}></Route>
                                <Route exact  path="/searchDoc" component={SearchDoc}></Route>
                                <Route exact  path="/searchIp" component={SearchIp}></Route>
                                <Route exact path="/detail/:itemId" component={ItemDetail}></Route>
                                <Route exact path="/myAccount" component={MyAccount}></Route>
                            </HomeContainer>
                        }>
                        </Route>
                        
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}

export default RouterPage;
