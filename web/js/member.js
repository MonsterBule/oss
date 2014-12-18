Ext.define('js.member', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/member',
                reader: {
                    type: 'json',
                    root: 'tmlist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'userName', type: 'string'},
                {name: 'email', type: 'sting'},
                {name: 'lName', type: 'string'},
                {name: 'balance', type: 'string'},
                {name: 'status', type: 'string'},
                {name: 'regDate', type: 'string'},
                {name: 'activeDate', type: 'string'},
                {name: 'remark', type: 'String'}

            ], autoLoad: false


        });
        store.load({
            params: {
                start: 0,
                limit: 4
            }
        });
        Ext.apply(this, {
            title: '会员信息表',
            id: 'member',
            width: 600,
            closable: true,
            store: store,
            columns: [
                {text: '用户名', dataIndex: 'userName', flex: 1},
                {text: '姓名', dataIndex: 'lName', flex: 1},
                {text: 'Email', dataIndex: 'email', flex: 1},
                {text: '余额', dataIndex: 'balance', flex: 1},
                {text: '状态', dataIndex: 'status', flex: 1},
                {text: '注册日期', dataIndex: 'regDate', flex: 1},
                {text: '激活日期', dataIndex: 'activeDate', flex: 1},
                {text: '备注', dataIndex: 'remark', flex: 1}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ]
//            ,
//            tbar: [
//                { xtype: 'button', text: '添加', handler: function () {
//                    me.insert(me);
//                }},
//                {xtype: 'button', text: '删除', handler: function () {
//                    me.delete(me)
//                }},
//                {xtype: 'button', text: '修改', handler: function () {
//                    me.updata(me);
//                }},
//                {fieldLabel: '配送商名称', xtype: 'textfield', name: 'supplierName', id: "menname"},
//                {xtype: 'button', text: '查询', handler: me.find}
//            ]
        });
        this.callParent();
    }
//    ,未写完的字段
//    insert: function (a) {
//        Ext.create('Ext.window.Window', {
//            title: '添加',
//            id: "meminsert",
//            border: false,
//            items: [
//                {
//                    layout: 'form',
//                    xtype: 'form',
//                    width: 280,
//                    frame: true,
//                    defaults: {
//                        xtype: 'textfield',
//                        labelWidth: 80,
//                        labelAlign: "right"
//                    },
//                    items: [
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'TD.deliveryId' },
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'TD.deliveryName'},
//                        {fieldLabel: '住址', allowBlank: false, name: 'TD.address'},
//                        {fieldLabel: '联系人', allowBlank: false, name: 'TD.linkName'},
//                        {fieldLabel: '联系电话', allowBlank: false, name: 'TD.linkTel'},
//                        {fieldLabel: 'QQ', name: 'TD.QQ'},
//                        {fieldLabel: 'Email', name: 'TD.email'},
//                        {fieldLabel: '排序编码', name: 'TD.sortId'},
//                        {fieldLabel: '排序状态', allowBlank: false, name: 'TD.state' }
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '添加', handler: a.sumb1},
//                { text: '重置',
//                    handler: function () {
//                        this.up('window').down('form').getForm().reset();
//                    } },
//                { text: '取消', handler: function () {
//                    Ext.getCmp("meminsert").close();
//                }}
//            ]
//        }).show().center();
//    },
//    sumb1: function () {
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/meminsert',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    if (msg.ishave) {
//                        Ext.MessageBox.show({
//                            title: '系统提示',
//                            msg: msg.mag,
//                            icon: Ext.MessageBox.WARNING,
//                            buttons: Ext.MessageBox.YES
//                        });
//                        Ext.getCmp("memder").store.reload();
//                        Ext.getCmp("meminsert").close();
//                        return;
//                    }
//                    Ext.MessageBox.show({
//                        title: '系统提示',
//                        msg: msg.mag,
//                        icon: Ext.MessageBox.WARNING,
//                        buttons: Ext.MessageBox.YES
//                    });
//                },
//                failure: function (form, action) {
//
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.MessageBox.show({
//                        title: '系统提示',
//                        msg: msg.mag,
//                        icon: Ext.MessageBox.QUESTION,
//                        buttons: Ext.MessageBox.YES
//                    });
//                }
//            });
//        }
//    }, delete: function (a) {
//        var record = Ext.getCmp('memder').getSelectionModel().getSelection()[0];
//
//        Ext.create('Ext.window.Window', {
//            title: '确认信息',
//            border: false,
//            id: 'memdelete',
//            modal: true,
//            padding: '5 5 5 5',
//            frame: true,
//            items: [
//                {
//                    layout: 'form',
//                    xtype: 'form',
//                    width: 280,
//                    frame: true,
//                    border: false,
//                    defaults: {
//                        labelWidth: 80,
//                        labelAlign: "right",
//                        border: false,
//                        xtype: 'textfield'
//                    },
//                    items: [
//                        //  {
////                            bodyBorder: false,
////                            border: false,
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'TD.deliveryId', value: record.get('deliveryId')},
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'TD.deliveryName', value: record.get('deliveryName')},
//                        {fieldLabel: '住址', allowBlank: false, name: 'TD.address', value: record.get('address')},
//                        {fieldLabel: '联系人', allowBlank: false, name: 'TD.linkName', value: record.get('linkName')},
//                        {fieldLabel: '联系电话', allowBlank: false, name: 'TD.linkTel', value: record.get('linkTel')},
//                        {fieldLabel: 'QQ', name: 'TD.QQ', value: record.get('QQ')},
//                        {fieldLabel: 'Email', name: 'TD.email', value: record.get('email')},
//                        {fieldLabel: '排序编码', name: 'TD.sortId', value: record.get('sortId')},
//                        {fieldLabel: '排序状态', allowBlank: false, name: 'TD.state', value: record.get('state')}
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '确认', handler: a.sumdelete},
//                { text: '取消', handler: function () {
//                    Ext.getCmp("memdelete").close();
//                }}
//
//
//            ]
//
//        }).show().center();
//    },
//    sumdelete: function () {
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/memdelete',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    if (msg.ishave) {
//                        Ext.MessageBox.show({
//                            title: '系统提示',
//                            msg: msg.mag,
//                            icon: Ext.MessageBox.WARNING,
//                            buttons: Ext.MessageBox.YES
//                        });
//                        Ext.getCmp("memder").store.reload();
//                        Ext.getCmp("memdelete").close();
//                        return;
//                    }
//                    ;
//                },
//                failure: function (form, action) {
//
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.MessageBox.show({
//                        title: '系统提示',
//                        msg: msg.mag,
//                        icon: Ext.MessageBox.QUESTION,
//                        buttons: Ext.MessageBox.YES
//                    });
//                }
//            });
//        }
//    }, updata: function (a) {
//        var record = Ext.getCmp('memder').getSelectionModel().getSelection()[0];
//        Ext.create('Ext.window.Window', {
//            title: '修改信息',
//            border: false,
//            frame: true,
//            id: 'memupdata',
//            items: [
//                {
//                    layout: 'form',
//                    xtype: 'form',
//                    width: 280,
//                    frame: true,
//                    defaults: {
//                        xtype: 'textfield',
//                        labelWidth: 80,
//                        labelAlign: "right"
//
//                    },
//                    items: [
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'TD.deliveryId', value: record.get('deliveryId')},
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'TD.deliveryName', value: record.get('deliveryName')},
//                        {fieldLabel: '住址', allowBlank: false, name: 'TD.address', value: record.get('address')},
//                        {fieldLabel: '联系人', allowBlank: false, name: 'TD.linkName', value: record.get('linkName')},
//                        {fieldLabel: '联系电话', allowBlank: false, name: 'TD.linkTel', value: record.get('linkTel')},
//                        {fieldLabel: 'QQ', name: 'TD.QQ', value: record.get('QQ')},
//                        {fieldLabel: 'Email', name: 'TD.email', value: record.get('email')},
//                        {fieldLabel: '排序编码', name: 'TD.sortId', value: record.get('sortId')},
//                        {fieldLabel: '排序状态', allowBlank: false, name: 'TD.state', value: record.get('state')}
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '提交', handler: a.sumupdata},
//                { text: '取消', handler: function () {
//                    Ext.getCmp("memupdata").close();
//                }}
//
//            ]
//
//        }).show().center();
//    },
//    sumupdata: function () {
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/memupdata',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//
//                    if (msg.ishave) {
//                        Ext.MessageBox.show({
//                            title: '系统提示',
//                            msg: msg.mag,
//                            icon: Ext.MessageBox.WARNING,
//                            buttons: Ext.MessageBox.YES
//                        });
//                        Ext.getCmp("memder").store.reload();
//                        Ext.getCmp("memupdata").close();
//
//                        return;
//                    }
//                    Ext.MessageBox.show({
//                        title: '系统提示',
//                        msg: msg.mag,
//                        icon: Ext.MessageBox.WARNING,
//                        buttons: Ext.MessageBox.YES
//                    });
//
//
//                },
//                failure: function (form, action) {
//
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    Ext.MessageBox.show({
//                        title: '系统提示',
//                        msg: msg.mag,
//                        icon: Ext.MessageBox.QUESTION,
//                        buttons: Ext.MessageBox.YES
//                    });
//                }
//            });
//        }
//
//    }, find: function () {
//        Ext.getCmp('memder').store.load({params: {name: Ext.getCmp("memname").getValue()}});
//
//    }
});