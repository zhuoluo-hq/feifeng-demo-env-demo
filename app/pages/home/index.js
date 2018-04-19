import React, { Component } from "react";
import { Nav, Icon, Menu } from '@bone/bone-web-ui';
import IotPluginPanel from '@boneweb/iot-plugin-panel';
import MyModel from './model';
import style from "./index.scss";

const { Item, SubNav } = Nav;

// 导出Home页组件
export default class Home extends Component {
    static Model = MyModel

    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: []
        };

        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.actions.getList();
    }

    componentDidUpdate(){
        if(this.location.params.id && (!this.state.selectedKeys[0] || this.location.params.id !== this.state.selectedKeys[0])){
            this.setState(prevState => ({
                ...prevState,
                selectedKeys: [this.location.params.id]
            }));
        }
    }

    onSelect(selectedKeys) {
        this.setState(prevState => ({
            ...prevState,
            selectedKeys
        }));
        this.navigation.push({
            pathname: `/${selectedKeys[0]}`
        });
    }

    render() {
        const { list } = this.props;
        const { selectedKeys } = this.state;

        return (<div className={style.container}>
            <div className={style.header}>
                <Icon type="credit-level" className={style.logo} />
                <span className={style.title}>办公室环境监控</span>
            </div>
            <div className={style.body}>
                <div className={style.side}>
                    <Nav type="primary"
                        defaultOpenKeys={['officeRoomList']}
                        selectedKeys={selectedKeys}
                        onSelect={this.onSelect}
                    >
                        <SubNav key="officeRoomList" label="办公室列表">
                            {
                                list.map(item => (
                                    <Item key={item.id}>
                                        <Icon type="process" />
                                        {item.name}
                                    </Item>
                                ))
                            }
                        </SubNav>
                    </Nav>
                </div>
                <div className={style.content}>
                    <IotPluginPanel
                        id="b122I7KCiaMPcG8a"
                        api="https://official.api.feifengiot.com/app/manifest/webplugin/router"
                        url={this.location.pathname} />
                </div>
            </div>
        </div>);
    }
}