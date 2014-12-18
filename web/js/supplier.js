Ext.define('js.supplier', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/supplier',
                reader: {
                    type: 'json',
                    root: 'tslist',
                    totalProperty: 'rowcount'
                }

            },
            fields: [
                { name: 'supplierId', type: 'string'},
                {name: 'supplierName', type: 'sting'},
                {name: 'supplierAb', type: 'string'},
                {name: 'address', type: 'string'},
                {name: 'linkName', type: 'string'},
                {name: 'linkTel', type: 'string'},
                {name: 'qq', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'sortId', type: 'int'},
                {name: 'state', type: 'bit'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('supname');
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
            title: '供应商信息',
            id: 'supplier',
            width: 600,
            closable: true,
            store: store,
            columns: [
                {text: '供应商编码', dataIndex: 'supplierId', flex: 1},
                {text: '供应商名称', dataIndex: 'supplierName', flex: 1},
                {text: '供应商助记码', dataIndex: 'supplierAb', flex: 1},
                {text: '地址', dataIndex: 'address', flex: 1},
                {text: '联系人', dataIndex: 'linkName', flex: 1},
                {text: '联系电话', dataIndex: 'linkTel', flex: 1},
                {text: 'QQ', dataIndex: 'qq', flex: 1},
                {text: 'Email', dataIndex: 'email', flex: 1},
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
                { xtype: 'button', text: '添加', icon: 'images/1-1.png', handler: function () {
                    me.insert(me);
                }},
                {xtype: 'button', text: '删除', icon: 'images/1-2.png', handler: function () {
                    me.delete(me)
                }},
                {xtype: 'button', text: '修改', icon: 'images/1-3.png', handler: function () {
                    me.update(me);
                }},
                {fieldLabel: '供应商名称', xtype: 'textfield', name: 'supplierName', labelAlign: "right", id: "supname"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();

    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "supinsert",
            modal: true,
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
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'ts.supplierId', maxLength: 6},
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'ts.supplierName', maxLength: 25},
                        {fieldLabel: '供应商助记码', name: 'ts.supplierAb', hidden: true},
                        {fieldLabel: '住址', allowBlank: false, name: 'ts.address', maxLength: 100},
                        {fieldLabel: '联系人', allowBlank: false, name: 'ts.linkName', maxLength: 13},
                        {fieldLabel: '联系电话', allowBlank: false, name: 'ts.linkTel', maxLength: 13},
                        {fieldLabel: 'QQ', name: 'ts.qq', maxLength: 13},
                        {fieldLabel: 'Email', name: 'ts.email', vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 50},
                        {fieldLabel: '排序编码', name: 'ts.sortId'},
                        {fieldLabel: '排序状态', allowBlank: false, name: 'ts.state' }
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
                    Ext.getCmp("supinsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/supinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("supplier").store.reload();
                        Ext.getCmp("supinsert").close();
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
        var record = Ext.getCmp('supplier').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择一条数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.create('Ext.window.Window', {
            title: '确认信息',
            border: false,
            id: 'supdelete',
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
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'ts.supplierId', value: record.get('supplierId') },
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'ts.supplierName', value: record.get('supplierName') },
                        {fieldLabel: '供应商助记码', allowBlank: false, name: 'ts.supplierAb', value: record.get('supplierAb') },
                        {fieldLabel: '住址', allowBlank: false, name: 'ts.address', value: record.get('address') },
                        {fieldLabel: '联系人', allowBlank: false, name: 'ts.linkName', value: record.get('linkName') },
                        {fieldLabel: '联系电话', allowBlank: false, name: 'ts.linkTel', value: record.get('linkTel') },
                        {fieldLabel: 'QQ', name: 'ts.qq', value: record.get('qq') },
                        {fieldLabel: 'Email', name: 'ts.email', value: record.get('email') },
                        {fieldLabel: '排序编码', name: 'ts.sortId', value: record.get('sortId') },
                        {fieldLabel: '排序状态', name: 'ts.state', value: record.get('state') }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("supdelete").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/supdelete',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("supplier").store.reload();
                        Ext.getCmp("supdelete").close();
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
        var record = Ext.getCmp('supplier').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择一条数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.create('Ext.window.Window', {
            title: '修改信息',
            border: false,
            modal: true,
            frame: true,
            id: 'supupdate',
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
                        {fieldLabel: '供应商编码', allowBlank: false, name: 'ts.supplierId', readOnly: true, value: record.get('supplierId')},
                        {fieldLabel: '供应商名称', allowBlank: false, name: 'ts.supplierName', value: record.get('supplierName'), maxLength: 25},
                        {fieldLabel: '供应商助记码', allowBlank: false, name: 'ts.supplierAb', value: record.get('supplierAb'), hidden: true },
                        {fieldLabel: '住址', allowBlank: false, name: 'ts.address', value: record.get('address'), maxLength: 100},
                        {fieldLabel: '联系人', allowBlank: false, name: 'ts.linkName', value: record.get('linkName'), maxLength: 13 },
                        {fieldLabel: '联系电话', allowBlank: false, name: 'ts.linkTel', value: record.get('linkTel'), maxLength: 13},
                        {fieldLabel: 'QQ', name: 'ts.qq', value: record.get('qq'), maxLength: 13},
                        {fieldLabel: 'Email', name: 'ts.email', value: record.get('email'), vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 50},
                        {fieldLabel: '排序编码', name: 'ts.sortId', value: record.get('sortId')},
                        {fieldLabel: '排序状态', name: 'ts.state', value: record.get('state')}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("supupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/supupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("supplier").store.reload();
                        Ext.getCmp("supupdate").close();

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
        Ext.getCmp('supplier').store.load({params: {name: Ext.getCmp("supname").getValue()}});

    }
});