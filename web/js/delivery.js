Ext.define('js.delivery', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/delivery',
                reader: {
                    type: 'json',
                    root: 'tdlist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'deliveryId', type: 'string'},
                {name: 'deliveryName', type: 'sting'},
                {name: 'address', type: 'string'},
                {name: 'linkName', type: 'string'},
                {name: 'linkTel', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'qq', type: 'string'},
                {name: 'sortId', type: 'int'},
                {name: 'state', type: 'bit'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('delname');
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
            title: '配送商信息',
            id: 'delivery',
            width: 600,
            selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
            closable: true,
            store: store,
            columns: [
                {text: '配送商编码', dataIndex: 'deliveryId', flex: 1},
                {text: '配送商名称', dataIndex: 'deliveryName', flex: 1},
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
                {fieldLabel: '配送商名称', xtype: 'textfield', name: 'supplierName', labelAlign: "right", id: "delname"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();
    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "delinsert",
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
                        {fieldLabel: '配送商编码', allowBlank: false, name: 'td.deliveryId', maxLength: 3},
                        {fieldLabel: '配送商名称', allowBlank: false, name: 'td.deliveryName', maxLength: 13},
                        {fieldLabel: '住址', allowBlank: false, name: 'td.address', maxLength: 150},
                        {fieldLabel: '联系人', allowBlank: false, name: 'td.linkName', maxLength: 20},
                        {fieldLabel: '联系电话', allowBlank: false, name: 'td.linkTel', maxLength: 20},
                        {fieldLabel: 'QQ', name: 'td.qq', maxLength: 20},
                        {fieldLabel: 'Email', name: 'td.email', vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 40},
                        {fieldLabel: '排序编码', name: 'td.sortId', xtype: 'numberfield', maxLength: 13},
                        {fieldLabel: '排序状态', allowBlank: false, name: 'td.state'}
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
                    Ext.getCmp("delinsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/delinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("delivery").store.reload();
                        Ext.getCmp("delinsert").close();
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
        var record = Ext.getCmp('delivery').getSelectionModel().getSelection()[0];
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择一条数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            });
        }
        Ext.create('Ext.window.Window', {
            model: true,
            title: '确认信息',
            border: false,
            id: 'deldelete',
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
                        border: false,
                        readOnly: true,
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '配送商编码', allowBlank: false, name: 'td.deliveryId', value: record.get('deliveryId')},
                        {fieldLabel: '配送商名称', allowBlank: false, name: 'td.deliveryName', value: record.get('deliveryName')},
                        {fieldLabel: '住址', allowBlank: false, name: 'td.address', value: record.get('address')},
                        {fieldLabel: '联系人', allowBlank: false, name: 'td.linkName', value: record.get('linkName')},
                        {fieldLabel: '联系电话', allowBlank: false, name: 'td.linkTel', value: record.get('linkTel')},
                        {fieldLabel: 'QQ', name: 'td.QQ', value: record.get('qq')},
                        {fieldLabel: 'Email', name: 'td.email', value: record.get('email')},
                        {fieldLabel: '排序编码', name: 'td.sortId', value: record.get('sortId')},
                        {fieldLabel: '排序状态', allowBlank: false, name: 'td.state', value: record.get('state')}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("deldelete").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/deldelete',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("delivery").store.reload();
                        Ext.getCmp("deldelete").close();
                        return;
                    }
                    ;
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
    }, update: function (a) {
        var record = Ext.getCmp('delivery').getSelectionModel().getSelection()[0];
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
            id: 'delupdate',
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
                        {fieldLabel: '配送商编码', allowBlank: false, name: 'td.deliveryId', value: record.get('deliveryId'), maxLength: 3, readOnly: true},
                        {fieldLabel: '配送商名称', allowBlank: false, name: 'td.deliveryName', value: record.get('deliveryName'), maxLength: 13},
                        {fieldLabel: '住址', allowBlank: false, name: 'td.address', value: record.get('address'), maxLength: 150},
                        {fieldLabel: '联系人', allowBlank: false, name: 'td.linkName', value: record.get('linkName'), maxLength: 20},
                        {fieldLabel: '联系电话', allowBlank: false, name: 'td.linkTel', value: record.get('linkTel'), maxLength: 20},
                        {fieldLabel: 'QQ', name: 'td.qq', value: record.get('qq'), maxLength: 20},
                        {fieldLabel: 'Email', name: 'td.email', value: record.get('email'), vtypeText: "不是有效的邮箱地址", vtype: 'email', maxLength: 40},
                        {fieldLabel: '排序编码', name: 'td.sortId', value: record.get('sortId'), xtype: 'numberfield', maxLength: 13},
                        {fieldLabel: '排序状态', allowBlank: false, name: 'td.state', value: record.get('state')}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("delupdate").close();
                }}
            ]
        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/delupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("delivery").store.reload();
                        Ext.getCmp("delupdate").close();
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
        Ext.getCmp('delivery').store.load({params: {name: Ext.getCmp("delname").getValue()}});
    }
});