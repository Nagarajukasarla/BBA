import { Layout } from 'antd';
import './App.css';
// import AppRoutes from "./router/AppRoutes";

// const App = () => {
//     return (
//         <>
//             <AppRoutes />
//         </>
//     );
// };
const { Header, Sider, Content } = Layout;
const App = () => {
    return (
        <Layout>
            <Header className='header'></Header>
            <Layout>
                <Sider className='sider'></Sider>
                <Content className='content'></Content>
            </Layout>
        </Layout>
    );
}

export default App;
