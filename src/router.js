import React,{Suspense, lazy} from 'react';
import { HashRouter, Route,Switch  } from 'react-router-dom';
// import { withRouter } from 'react-router';
// import { createBrowserHistory } from "history";
import history from './util/history'

const HomeContainer = lazy(()=> import('./pages/HomeContainer/HomeContainer'));
const Home = lazy(()=> import('./pages/Home/Home'));
const SearchList = lazy(()=> import('./pages/SearchList/SearchList'));
const SearchDoc = lazy(()=> import('./pages/SearchDoc/SearchDoc'));
const SearchIp = lazy(()=> import('./pages/SearchIp/SearchIp'));
const ItemDetail = lazy(()=> import('./pages/ItemDetail/ItemDetail'));
const Login = lazy(()=> import('./pages/Login/Login'));
const Register = lazy(()=>import('./pages/Register/Register'));
const MyAccount = lazy(()=>import('./pages/MyAccount/MyAccount'));
const SearchTask = lazy(()=>import('./pages/SearchTask/SearchTask'));
const TaskDetail = lazy(()=>import('./pages/TaskDetail/TaskDetail'));
// const history = createBrowserHistory();
class RouterPage extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render (){
        return (
            <HashRouter history={ history}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch  history={ history}>
                        {/* component渲染嵌套路由 */}
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/" component={()=>
                            <HomeContainer>
                                <Route path="/" exact component={Home}></Route>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/searchList/:mcid" component={SearchList}></Route>
                                <Route path="/searchTask" component={SearchTask}></Route>
                                <Route path="/searchDoc" component={SearchDoc}></Route>
                                <Route path="/searchIp" component={SearchIp}></Route>
                                <Route path="/detail/:itemId" component={ItemDetail}></Route>
                                <Route path="/taskDetail/:itemId" component={TaskDetail}></Route>
                                
                                <Route path="/myAccount" component={MyAccount}></Route>
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
