Ext.define('js.status', {
    extend: 'Ext.grid.Panel',
    statu: Ext.create('Ext.data.Store', {
        fields: ['value', 'name'],
        data: [
            {'value': 1, 'name': 'true'},
            {'value': 0, 'name': 'false'}
        ]

    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/prostatus',
                reader: {
                    type: 'json',
                    root: 'tpslist',
                    totalProperty: 'rowcount'
                }

            },
            fields: [
                { name: 'proStatusId', type: 'string'},
                {name: 'proStatusName', type: 'sting'},
                {name: 'status', type: 'string'},
                {name: 'remark', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('staname');
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
            title: '促销状态信息',
            id: 'status',
            width: 600,
            closable: true,
            store: store,
            columns: [
                {text: '促销状态编码', dataIndex: 'proStatusId', flex: 1},
                {text: '促销状态名称', dataIndex: 'proStatusName', flex: 1},
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
                {fieldLabel: '促销名称', xtype: 'textfield', name: 'proStatusName', labelAlign: "right", id: "staname"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();

    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "prostinsert",
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
                        {fieldLabel: '促销状态名称', allowBlank: false, name: 'tps.proStatusName', maxLength: 20},
                        {xtype: 'combo', fieldLabel: '状态', store: a.statu, displayField: 'name', valueField: 'value', name: 'tps.status'},
                        {fieldLabel: '备注', allowBlank: false, name: 'tps.remark', maxLength: 50}
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
                    Ext.getCmp("prostinsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/prostinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("status").store.reload();
                        Ext.getCmp("prostinsert").close();
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
        var record = Ext.getCmp('status').getSelectionModel().getSelection()[0];
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
            id: 'prostdel',
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
                        {fieldLabel: '促销状态编码', name: 'tps.proStatusId', value: record.get("proStatusId") },
                        {fieldLabel: '促销状态名称', name: 'tps.proStatusName', value: record.get("proStatusName")},
                        {xtype: 'combo', fieldLabel: '状态', store: a.statu, displayField: 'name', valueField: 'value', name: 'tps.status', value: record.get("status")},
                        {fieldLabel: '备注', name: 'tps.remark', value: record.get("remark")}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("prostdel").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/prostdel',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("status").store.reload();
                        Ext.getCmp("prostdel").close();
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
        var record = Ext.getCmp('status').getSelectionModel().getSelection()[0];
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
            id: 'prostupdate',
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
                        {fieldLabel: '促销状态编码', allowBlank: false, name: 'tps.proStatusId', value: record.get("proStatusId"), readOnly: true},
                        {fieldLabel: '促销状态名称', allowBlank: false, name: 'tps.proStatusName', value: record.get("proStatusName"), maxLength: 20},
                        {fieldLabel: '状态', allowBlank: false, name: 'tps.status', value: record.get("status")},
                        {fieldLabel: '备注', allowBlank: false, name: 'tps.remark', value: record.get("remark"), maxLength: 50}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("prostupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/prostupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("status").store.reload();
                        Ext.getCmp("prostupdate").close();

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

    }
//    , find: function () {
//        Ext.getCmp('status').store.load({params: {name: Ext.getCmp("staname").getValue()}});
//
//    }
});