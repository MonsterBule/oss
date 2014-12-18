Ext.define('js.role', {
    extend: 'Ext.panel.Panel',
    state: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {'abbr': 'true', 'name': '使用'},
            {'abbr': 'false', 'name': '停用'}
        ]
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: '/roleinfo',
                reader: {
                    type: 'json',
                    root: 'role_list',
                    totalProperty: 'rowcount'
                }
            },
            fields: [
                { name: 'roleId', type: 'string'},
                {name: 'roleName', type: 'sting'},
                {name: 'sortId', type: 'string'},
                {name: 'state', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('rolename');
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
                limit: 5
            }
        });
        Ext.apply(this, {
            layout: "border",
            title: '角色信息及权限信息',
            closable: true,
            id: 'role1',
            items: [
                {
                    xtype: "grid",
                    region: "center",
                    title: '角色信息',
                    id: 'role',
                    closable: true,
                    store: store,
                    columns: [
                        {text: '角色编码', dataIndex: 'roleId', flex: 1},
                        {text: '角色名称', dataIndex: 'roleName', flex: 1},
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
                    ],
                    tbar: [
                        { xtype: 'button', text: '添加', icon: "images/1-1.png", handler: function () {
                            me.insert(me);
                        }},
                        {xtype: 'button',
                            text: "删除",
                            icon: "images/1-2.png",
                            handler: function () {
                                me.delete(me)
                            }},
                        {xtype: 'button', text: '修改',
                            icon: "images/1-3.png",
                            handler: function () {
                                me.update(me);
                            }},
                        {fieldLabel: '角色名称', xtype: 'textfield', name: 'roleName', labelAlign: "right", id: "rolename"},
                        {xtype: 'button', text: '查询', icon: "images/1-4.png", handler: me.find}
                    ],
                    listeners: {
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
                                            roleid = record.get("roleId");
                                            name = record.get("roleName");
                                            var aa = Ext.getCmp("roletree1").getRootNode();
                                            Ext.Ajax.request({
                                                url: "/roletree?roleid=" + roleid,
                                                async: false,
                                                success: function (response) {
                                                    me.jsonData = response.responseText;
                                                    if (typeof(me.jsonData) === 'string') {
                                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                                        me.mystore = me.jsonData.treeNode.children;
                                                        aa.removeAll(false);
                                                        Ext.getCmp("roletree1").setRootNode(me.jsonData.treeNode);
                                                        Ext.getCmp("roletree1").expandAll();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }}
                },
                {
                    region: "east",
                    title: "权限信息", width: 200,
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'roletree1',
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
        Ext.Ajax.request({
            url: '/treechecked',
            async: false,
            success: function (response) {
                a.json = response.responseText;
                if (typeof( a.json) === 'string') {
                    a.json = Ext.JSON.decode(a.json);
                    a.mystore = a.json.treeNodeChecked.children;
                }
            }
        });
        var insertstore = Ext.create("Ext.data.TreeStore", {
            fields: [
                {name: "id", type: "int", mapping: "menuinfo.menuId"},
                {name: "text", type: "String", mapping: "menuinfo.title"}
            ],
            root: {
                id: '-1',
                text: "权限信息",
                children: a.mystore

            }
        });
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "roleinsert",
            modal: true,
            border: false,
            width: 500,
            height: 560,
            layout: 'border',
            items: [
                { region: 'north',
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
                        {fieldLabel: '角色编码', allowBlank: false, name: 'role.roleId', maxLength: 3 },
                        {fieldLabel: '角色名称', allowBlank: false, name: 'role.roleName', maxLength: 20},
                        {fieldLabel: '排序编码', name: 'role.sortId'},
                        {fieldLabel: '状态', allowBlank: false, store: a.state, name: 'role.state', xtype: 'combo', valueField: 'abbr', displayField: 'name'}
                    ]
                },
                {
                    region: "center",
                    title: "权限信息",
                    autoScroll: true,
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'allroletree',
                        border: false,
                        autoScroll: true,
                        collapsible: true,
                        store: insertstore,
                        listeners: {
                            'checkchange': function (node, checked) {
                                node.expand();
                                node.checked = checked;
                                if (true == checked) {
                                    var parent_node = node.parentNode;
                                    while (parent_node != null) {
                                        parent_node.set('checked', checked);
                                        parent_node = parent_node.parentNode;
                                    }
                                }
                                node.eachChild(function (child) {
                                    child.set('checked', checked);
                                    child.fireEvent('checkchange', child, checked);
                                });
                            }
                        }
                    })
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '添加', handler: a.sumb1},
                { text: '重置',
                    handler: function () {
                        this.up('window').down('form').getForm().reset();
                        Ext.getCmp('allroletree').getChecked().reset();
                    } },
                { text: '取消', handler: function () {
                    Ext.getCmp("roleinsert").close();
                }}
            ]
        }).show().center();
        Ext.getCmp("allroletree").expandAll();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        var chencked = Ext.getCmp('allroletree').getChecked()
//        var menuid = new Array();
        var menuid = "";
        Ext.each(chencked, function (name, index) {
            if (name.data.id != "-1") {
//                menuid.push(name.data.id);
                menuid += 'menuid[' + index + '].menu.menuId=' + name.data.id;
                if (index != chencked.length - 1) {
                    menuid += "&";
                }
            }

        });
        if (form.isValid()) {
            form.submit({
                url: '/roleinsert?' + menuid,//+menuid,
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("role").store.reload();
                        Ext.getCmp("roleinsert").close();
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
        var record = Ext.getCmp('role').getSelectionModel().getSelection()[0];
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
            id: 'roledelete',
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
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'role.roleId', value: record.get('roleId') },
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'role.roleName', value: record.get('roleName') },
                        {fieldLabel: '排序编码', name: 'role.sortId', value: record.get('sortId') },
                        {fieldLabel: '状态', name: 'role.state', value: record.get('state') }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("roledelete").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/roledelete',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("role").store.reload();
                        Ext.getCmp("roledelete").close();
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
        var record = Ext.getCmp('role').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.Ajax.request({
            url: '/treechecked',
            async: false,
            success: function (response) {
                a.json = response.responseText;
                if (typeof( a.json) === 'string') {
                    a.json = Ext.JSON.decode(a.json);
                    a.mystore = a.json.treeNodeChecked.children;
                }
            }
        });
        var insertstore = Ext.create("Ext.data.TreeStore", {
            fields: [
                {name: "id", type: "int", mapping: "menuinfo.menuId"},
                {name: "text", type: "String", mapping: "menuinfo.title"}
            ],
            root: {
                id: '-1',
                text: "权限信息",
                children: a.mystore
            }
        });
        Ext.create('Ext.window.Window', {
            title: '修改信息',
            border: false,
            modal: true,
            frame: true,
            width: 500,
            height: 560,
            id: 'roleupdate',
            layout: 'border',
            items: [
                { region: 'north',
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
                        {fieldLabel: '角色编码', allowBlank: false, name: 'role.roleId', maxLength: 3, value: record.get('roleId')},
                        {fieldLabel: '角色名称', allowBlank: false, name: 'role.roleName', maxLength: 20, value: record.get('roleName')},
                        {fieldLabel: '排序编码', name: 'role.sortId', value: record.get('sortId')},
                        {fieldLabel: '状态', allowBlank: false, store: a.state, name: 'role.state', xtype: 'combo', valueField: 'abbr', displayField: 'name', value: record.raw.state}
                    ]
                },
                {
                    region: "center",
                    title: "权限信息",
                    autoScroll: true,
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'allroletree',
                        border: false,
                        autoScroll: true,
                        collapsible: true,
                        store: insertstore,
                        listeners: {
                            'checkchange': function (node, checked) {
                                node.expand();
                                node.checked = checked;
                                if (true == checked) {
                                    var parent_node = node.parentNode;
                                    while (parent_node != null) {
                                        parent_node.set('checked', checked);
                                        parent_node = parent_node.parentNode;
                                    }
                                }
                                node.eachChild(function (child) {
                                    child.set('checked', checked);
                                    child.fireEvent('checkchange', child, checked);
                                });
                            }
                        }
                    })
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("roleupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        var chencked = Ext.getCmp('allroletree').getChecked()
//        var menuid = new Array();
        var menuid = "";
        Ext.each(chencked, function (name, index) {
            if (name.data.id != "-1") {
//                menuid.push(name.data.id);
                menuid += 'menuid[' + index + '].menu.menuId=' + name.data.id;
                if (index != chencked.length - 1) {
                    menuid += "&";
                }
            }

        });
        if (form.isValid()) {
//            params:{
//                authorizations:menuid
//            }
            form.submit({
                url: '/roleupdate?' + menuid,//+menuid,
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("role").store.reload();
                        Ext.getCmp("roleupdate").close();
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
        var record = Ext.getCmp('role').getSelectionModel().getSelection()[0];
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
            id: 'roledelete',
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
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'role.roleId', value: record.get('roleId') },
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'role.roleName', value: record.get('roleName') },
                        {fieldLabel: '排序编码', name: 'role.sortId', value: record.get('sortId') },
                        {fieldLabel: '状态', name: 'role.state', value: record.get('state') }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("roledelete").close();
                }}
            ]
        }).show().center();
    }, find: function () {
        Ext.getCmp('role').store.load({params: {name: Ext.getCmp("rolename").getValue()}});

    }
});