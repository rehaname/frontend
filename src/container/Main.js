import React, { Component } from 'react';
import '../css/App.css';
import Button from 'antd/lib/button';
import axios from 'axios'
import { Layout, Menu, Avatar, Icon, Skeleton } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {
  state = {
    collapsed: true,
  };

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }


    click() {
        axios.get("http://localhost:8888/sample").then(res => {
            console.log(res);
            alert("Received Successful response from server!");
            this.setState({clickMessage: res.data});
        }, err => {
            alert("Server rejected response with: " + err);
        });
    };

    constructor(props) {
        super(props);
        this.state = {clickMessage: 'Not click :('}

        this.click = this.click.bind(this);
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                   <Sider
                     collapsible
                     collapsed={this.state.collapsed}
                     onCollapse={this.onCollapse}
                     theme='light'
                   >
                   <br/>
                    <div><Avatar shape="square" size="large" icon="user" /></div>
                     <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                       <Menu.Item key="homemenu">
                         <Icon type="home" />
                         <span>Home</span>
                       </Menu.Item>
                       <SubMenu
                         key="toolsubmenu"
                         title={<span><Icon type="tool" /><span>Support Tool</span></span>}
                       >
                         <Menu.Item key="tool1">Tool 1</Menu.Item>
                         <Menu.Item key="tool2">Tool 2</Menu.Item>
                         <Menu.Item key="tool3">Tool 3</Menu.Item>
                       </SubMenu>
                       <SubMenu
                         key="habiticasubmenu"
                         title={<span><Icon type="team" /><span>Habitica</span></span>}
                       >
                         <Menu.Item key="3">Ranking</Menu.Item>
                         <Menu.Item key="4">Charts</Menu.Item>
                         <Menu.Item key="5">Tasks</Menu.Item>
                       </SubMenu>
                       <SubMenu
                         key="agilesubmenu"
                         title={<span><Icon type="rocket" /><span>Agile</span></span>}
                       >
                         <Menu.Item key="6">Pairing Matrix</Menu.Item>
                         <Menu.Item key="7">Tech Debt</Menu.Item>
                         <Menu.Item key="8">Code Review Changes</Menu.Item>
                       </SubMenu>
                       <Menu.Item key="teammenu">
                         <Icon type="smile" />
                         <span>The Team</span>
                       </Menu.Item>
                     </Menu>
                   </Sider>
                   <Layout>
                     <Header style={{ background: '#fff', padding: 0 }} >
                     <div>ITS/GSP</div>
                     </Header>
                     <Content style={{ margin: '24px 16px 0' }}>
                       <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                         <div>
                             <Button onClick={this.click} type="primary">Button</Button>
                             <div>Clicked??: {this.state.clickMessage}</div>
                         </div>
                       </div>
                     </Content>
                     <Footer style={{ textAlign: 'center' }}>
                       Hamster ©2018 Created by ITS-GSP
                     </Footer>
                   </Layout>
                 </Layout>
        );
    };
}
export default Main;
