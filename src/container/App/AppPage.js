import React, { Component } from 'react';
import '../../css/App.css';
import { Layout, Menu, Avatar, Icon } from 'antd';
import { Route, NavLink, Switch } from 'react-router-dom';
import Pairing from "../Pairing/PairingPage";
import Home from "../Home/HomePage";
import TechDebt from "../TechDebt/TechDebtPage"
import * as AppActions from "./AppActions";
import { connect } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AppPage extends Component {
    render() {
        return (
            <Switch>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.props.collapsed} onCollapse={this.props.onCollapse()} theme='light'>
                        <br />
                        <div>
                            <Avatar shape="square" size="large" icon="user" />
                        </div>
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="homemenu" >
                                <Icon type="home" />
                                <span><NavLink to="/">Home</NavLink></span>
                            </Menu.Item>
                            <SubMenu key="toolsubmenu" title={<span>
                                <Icon type="tool" /><span>Support Tool</span></span>}
                            >
                                <Menu.Item key="tool1">Tool 1</Menu.Item>
                                <Menu.Item key="tool2">Tool 2</Menu.Item>
                                <Menu.Item key="tool3">Tool 3</Menu.Item>
                            </SubMenu>
                            <SubMenu key="habiticasubmenu" title={<span>
                                <Icon type="team" /><span>Habitica</span></span>}
                            >
                                <Menu.Item key="3">Ranking</Menu.Item>
                                <Menu.Item key="4">Charts</Menu.Item>
                                <Menu.Item key="5">Tasks</Menu.Item>
                            </SubMenu>
                            <SubMenu key="agilesubmenu" title={<span>
                                <Icon type="rocket" /><span>Agile</span></span>}
                            >
                                <Menu.Item key="6">
                                    <NavLink to="/pairing">Pairing Matrix</NavLink>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <NavLink to="/techDebt">Tech Debt</NavLink>
                                </Menu.Item>
                            <Menu.Item key="8">Code Review Changes</Menu.Item>
                            </SubMenu>
                        <Menu.Item key="teammenu">
                            <Icon type="smile" />
                            <span>The Team</span>
                        </Menu.Item>
                        </Menu>
                    </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div>ITS/GSP</div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <div>
                                <Route exact path="/" component={Home} />
                                <Route path="/pairing" component={Pairing} />
                                <Route path="/techDebt" component={TechDebt} />
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Hamster ©2018 Created by ITS-GSP
                        </Footer>
                </Layout>
                </Layout>
            </Switch >
        );
    };
}

function mapStateToProps(state) {
    return {
        collapsed: state.collapseApp.collapsed
    };
}

const mapDispatchToProps = dispatch => ({
    onCollapse() {
        dispatch(AppActions.onAppCollapse());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
