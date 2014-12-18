Ext.define('js.oper', {
    extend: 'Ext.panel.Panel',
    rolename: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/roleinfo',
            reader: {
                type: 'json',
                root: 'role_list'
            }
        }, fields: [
            { name: 'roleId', type: 'string'},
            {name: 'roleName', type: 'sting'}

        ], autoLoad: true
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/oper',
                reader: {
                    type: 'json',
                    root: 'tolist',
                    totalProperty: 'rowcount'
                }
            },
            fields: [
                { name: 'operId', type: 'string'},
                { name: 'operName', type: 'string'},
                {name: 'role.roleName', type: 'sting'},
                {name: 'pwd', type: 'sting'},
                {name: 'address', type: 'string'},
                {name: 'mobile', type: 'string'},
                {name: 'linkTel', type: 'string'},
                {name: 'qq', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'sortId', type: 'int'},
                {name: 'state', type: 'bit'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('opename');
                    if (name) {
                        if (name.getValue()) {
                            if (operation.params) {
                                operation.params.name = name.getValue();

                            } else {
                                operation.params = {name: name.getValue()};
                            }
                        }
                    }
                }
            }
        });
        store.load({
            params: {
                start: 0,
                limit: 4
            }
        });
        Ext.apply(this, {
            title: '操作员及相关权限',
            id: 'oper1',
            closable: true,
            layout: 'border',
            items: [
                {
                    id: 'oper',
                    region: 'center',
                    xtype: 'grid',
                    width: 900,
                    closable: true,
                    store: store,
                    columns: [
                        {text: '操作员编码', dataIndex: 'operId', flex: 1},
                        {text: '操作员姓名', dataIndex: 'operName', flex: 1},
                        {text: '角色名称', dataIndex: 'role.roleName', flex: 1},
                        {text: '密码', dataIndex: 'pwd', hidden: true, flex: 1},
                        {text: '地址', dataIndex: 'address', flex: 1},
                        {text: '联系电话', dataIndex: 'linkTel', flex: 1},
                        {text: 'QQ', dataIndex: 'qq', flex: 1},
                        {text: 'Email', dataIndex: 'email', flex: 1},
                        {text: '手机号码', dataIndex: 'mobile', flex: 1},
                        {text: '排序编码', dataIndex: 'sortId', flex: 1},
                        {text: '状态', dataIndex: 'state', flex: 1}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: store,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ], listeners: {
                    itemcontextmenu: function (view, record, item, index, e) {
                        //禁用浏览器的右键相应事件
                        e.preventDefault();
                        e.stopEvent();
                        var menu = new Ext.menu.Menu({
                            //控制右键菜单位置
                            float: true,
                            items: [
                                {
                                    text: "查看权限",
                                    iconCls: 'leaf',
                                    handler: function () {
                                        this.up("menu").hide();
                                        id = record.get("operId");
                                        name = record.get("roleName");
                                        var aa = Ext.getCmp("roletree2").getRootNode();
                                        Ext.Ajax.request({
                                            url: "/roletree?id=" + id,
                                            async: false,
                                            success: function (response) {
                                                me.jsonData = response.responseText;
                                                if (typeof(me.jsonData) === 'string') {
                                                    me.jsonData = Ext.JSON.decode(me.jsonData);
                                                    me.mystore = me.jsonData.treeNode.children;
                                                    aa.removeAll(false);
                                                    Ext.getCmp("roletree2").setRootNode(me.jsonData.treeNode);
                                                    Ext.getCmp("roletree2").expandAll();
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                    }},
                    tbar: [
                        { xtype: 'button', text: '添加', icon: "images/1-1.png", handler: function () {
                            me.insert(me);
                        }},
                        {xtype: 'button', text: '删除', icon: "images/1-2.png", handler: function () {
                            me.delete(me)
                        }},
                        {xtype: 'button', text: '修改', icon: "images/1-3.png", handler: function () {
                            me.update(me);
                        }},
                        {fieldLabel: '操作员名称', xtype: 'textfield', name: 'operName', labelAlign: "right", id: "opename"},
                        {xtype: 'button', text: '查询', icon: "images/1-4.png", handler: me.find}
                    ]
                },
                {
                    region: 'east',
                    title: "权限信息", width: 200,
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'roletree2',
                        border: false,
                        collapsible: true,
                        store: Ext.create("Ext.data.TreeStore", {
                            fields: [
                                {name: "text", type: "String", mapping: "menuinfo.title"}
                            ],
                            root: {
                                text: 'Ext JS',
                                id: '-1',
                                children: me.mystore
                            }
                        }),
                        rootVisible: false
                    })
                }
            ]

        });
        this.callParent();

    },
    insert: function (a) {
        Ext.apply(Ext.form.VTypes, {
            password: function (val, field) {//val指这里的文本框值，field指这个文本框组件，大家要明白这个意思
                if (field.confirmTo) {//confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
                    var pwd = Ext.getCmp("pass1")
                    return (val == pwd.getValue());
                }
                return true;
            }
        }),
            Ext.create('Ext.window.Window', {
                modal: true,
                title: '添加',
                id: "operinsert",
                border: false,
                items: [
                    {
                        layout: 'form',
                        xtype: 'form',
                        width: 280,
                        frame: true,
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 80,
                            labelAlign: "right"
                        },
                        items: [
                            {fieldLabel: '操作员编码', name: 'to.operId', maxLength: 13},
                            {fieldLabel: '操作员姓名', name: 'to.operName', maxLength: 13},
                            {xtype: 'combo', store: a.rolename, fieldLabel: '角色名称', name: 'to.role.roleId', editable: false, displayField: 'roleName', valueField: 'roleId'},
                            {fieldLabel: '密码', name: 'to.pwd', maxLength: 13, id: 'pass1', inputType: 'password'},
                            {fieldLabel: '确认新密码', vtype: "password", vtypeText: "两次密码不一致！", confirmTo: "pass1", name: 'pass', inputType: 'password'},
                            {fieldLabel: '地址', name: 'to.address', maxLength: 13},
                            {fieldLabel: '联系电话', name: 'to.linkTel', maxLength: 13},
                            {fieldLabel: 'QQ', name: 'to.qq', maxLength: 13},
                            {fieldLabel: 'Email', name: 'to.email', vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 13},
                            {fieldLabel: '手机号码', name: 'to.mobile', maxLength: 13},
                            {fieldLabel: '排序编码', name: 'to.sortId', maxLength: 13},
                            {fieldLabel: '状态', name: 'to.state', maxLength: 13}
                        ]
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    { text: '添加', handler: a.sumb1},
                    { text: '重置',
                        handler: function () {
                            this.up('window').down('form').getForm().reset();
                        } },
                    { text: '取消', handler: function () {
                        Ext.getCmp("operinsert").close();
                    }}
                ]
            }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/operinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("operinsert").close();
                        return;
                    }
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }, delete: function (a) {
        var record = Ext.getCmp('oper').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.create('Ext.window.Window', {
            title: '确认信息',
            border: false,
            id: 'operdelete',
            modal: true,
            padding: '5 5 5 5',
            frame: true,
            items: [
                {
                    layout: 'form',
                    xtype: 'form',

                    width: 280,
                    frame: true,
                    border: false,
                    defaults: {
                        labelWidth: 80,
                        labelAlign: "right",
                        readOnly: true,
                        border: false,
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '操作员编码', name: 'to.operId', value: record.get('operId')},
                        {fieldLabel: '操作员姓名', name: 'to.operName', value: record.get('operName')},
                        {xtype: 'combo', store: a.rolename, fieldLabel: '角色名称', name: 'to.role.roleId', displayField: 'roleName', editable: false, valueField: 'roleId', value: record.raw.role.roleId},
                        {fieldLabel: '密码', name: 'to.pwd', value: record.get('pwd'), hidden: true},
                        {fieldLabel: '地址', name: 'to.address', value: record.get('address')},
                        {fieldLabel: '联系电话', name: 'to.linkTel', value: record.get('linkTel')},
                        {fieldLabel: 'QQ', name: 'to.qq', value: record.get('qq')},
                        {fieldLabel: 'Email', name: 'to.email', value: record.get('email')},
                        {fieldLabel: '手机号码', name: 'to.mobile', value: record.get('mobile')},
                        {fieldLabel: '排序编码', name: 'to.sortId', value: record.get('sortId')},
                        {fieldLabel: '状态', name: 'to.state', value: record.get('state')}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("operdelete").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/operdelete',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("operdelete").close();
                        return;
                    }
                    ;
                },
                failure: function (form, action) {

                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }, update: function (a) {
        var record = Ext.getCmp('oper').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.create('Ext.window.Window', {
            title: '修改信息',
            border: false,
            modal: true,
            frame: true,
            id: 'operupdate',
            items: [
                {
                    layout: 'form',
                    xtype: 'form',
                    width: 280,
                    frame: true,
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 80,
                        labelAlign: "right"
                    },
                    items: [
                        {fieldLabel: '操作员编码', name: 'to.operId', value: record.get('operId'), readOnly: true},
                        {fieldLabel: '操作员姓名', name: 'to.operName', value: record.get('operName'), maxLength: 13},
                        {xtype: 'combo', store: a.rolename, fieldLabel: '角色名称', name: 'to.role.roleId', displayField: 'roleName', editable: false, valueField: 'roleId', value: record.raw.role.roleId},
                        {fieldLabel: '密码', name: 'to.pwd', value: record.get('pwd'), hidden: true},
                        {fieldLabel: '地址', name: 'to.address', value: record.get('address'), maxLength: 13},
                        {fieldLabel: '联系电话', name: 'to.linkTel', value: record.get('linkTel'), maxLength: 13},
                        {fieldLabel: 'QQ', name: 'to.qq', value: record.get('qq'), maxLength: 13},
                        {fieldLabel: 'Email', name: 'to.email', value: record.get('email'), vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 13},
                        {fieldLabel: '手机号码', name: 'to.mobile', value: record.get('mobile'), maxLength: 13},
                        {fieldLabel: '排序编码', name: 'to.sortId', value: record.get('sortId'), maxLength: 13},
                        {fieldLabel: '状态', name: 'to.state', value: record.get('state'), maxLength: 13}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("operupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/operupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("oper").store.reload();
                        Ext.getCmp("operupdate").close();

                        return;
                    }
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                },
                failure: function (form, action) {

                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }

    }, find: function () {
        Ext.getCmp('oper').store.load({params: {name: Ext.getCmp("opename").getValue()}});

    }
});