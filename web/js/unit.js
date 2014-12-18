Ext.define('js.unit', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/unit',
                reader: {
                    type: 'json',
                    root: 'tulist',
                    totalProperty: 'rowcount'
                }

            },
            fields: [
                { name: 'unitId', type: 'string'},
                {name: 'name', type: 'sting'},
                {name: 'status', type: 'string'},
                {name: 'remark', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('uniname');
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
            title: '商品单位字典信息',
            id: 'unit',
            width: 600,
            closable: true,
            store: store,
            columns: [
                {text: '单位编码', dataIndex: 'unitId', flex: 1},
                {text: '名称', dataIndex: 'name', flex: 1},
                {text: '状态', dataIndex: 'status', flex: 1},
                {text: '备注', dataIndex: 'remark', flex: 1}
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
                {fieldLabel: '名称', xtype: 'textfield', name: 'name', id: "uniname", labelAlign: 'right'},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();

    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "unitinsert",
            border: false,
            modal: true,
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
                        {fieldLabel: '名称', allowBlank: false, name: 'tu.name', maxLength: 20},
                        {fieldLabel: '状态', allowBlank: false, name: 'tu.status'},
                        {fieldLabel: '备注', allowBlank: false, name: 'tu.remark', maxLength: 50}
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
                    Ext.getCmp("unitinsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/unitinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("unit").store.reload();
                        Ext.getCmp("unitinsert").close();
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
        var record = Ext.getCmp('unit').getSelectionModel().getSelection()[0];
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
            id: 'unitdel',
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
                        //  {
//                            bodyBorder: false,
//                            border: false,
                        {fieldLabel: '单位编码', allowBlank: false, name: 'tu.unitId', value: record.get("unitId") },
                        {fieldLabel: '名称', allowBlank: false, name: 'tu.name', value: record.get("name")},
                        {fieldLabel: '状态', allowBlank: false, name: 'tu.status', value: record.get("status")},
                        {fieldLabel: '备注', allowBlank: false, name: 'tu.remark', value: record.get("remark")}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("unitdel").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/unitdel',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("unit").store.reload();
                        Ext.getCmp("unitdel").close();
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
        var record = Ext.getCmp('unit').getSelectionModel().getSelection()[0];
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
            id: 'unitupdate',
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
                        {fieldLabel: '单位编码', allowBlank: false, name: 'tu.unitId', value: record.get("unitId"), readOnly: true },
                        {fieldLabel: '名称', allowBlank: false, name: 'tu.name', value: record.get("name"), maxLength: 20},
                        {fieldLabel: '状态', allowBlank: false, name: 'tu.status', value: record.get("status")},
                        {fieldLabel: '备注', allowBlank: false, name: 'tu.remark', value: record.get("remark"), maxLength: 50}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("unitupdate").close();
                }}
            ]
        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/unitupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("unit").store.reload();
                        Ext.getCmp("unitupdate").close();

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
        Ext.getCmp('unit').store.load({params: {name: Ext.getCmp("uniname").getValue()}});

    }
});