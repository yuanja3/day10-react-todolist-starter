import {NavLink, Outlet, useLocation} from "react-router";
import { Flex, Layout } from 'antd';
import { Menu } from 'antd';
import {useState} from "react";
import {HomeOutlined, IssuesCloseOutlined, QuestionCircleOutlined} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
const items=[{
    key:'Home',
    label:<NavLink to={'/'}>Home</NavLink>,
    icon:<HomeOutlined />
},
    {
        key:'todo list',
        label:<NavLink to={'todos'}>todo list</NavLink>,
        icon: <IssuesCloseOutlined />
    },
    {
        key:'About',
        label:<NavLink to={'/about'}>About</NavLink>,
        icon: <QuestionCircleOutlined />
    },
    {
        key:'Done',
        label:<NavLink to={'/done'}>Done</NavLink>,
        icon: <IssuesCloseOutlined />
    }
]
export function DefaultLayout() {
    const location=useLocation();
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Layout>
        <Header>
            <Menu onClick={onClick} theme="dark" mode="horizontal" selectedKeys={[current]} defaultSelectedKey={[location.pathname]} items={items}/>

        </Header>
        <Content>
            <Outlet/>
        </Content>
        <Footer>
            Footer Copyright
        </Footer>
    </Layout>;
}