Ext.define('js.merchanc', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/merchandisec',
                reader: {
                    type: 'json',
                    root: 'tmclist',
                    totalProperty: 'rowcount'
                }
            },
            fields: [
                { name: 'merchandiseCid', type: 'string'},
                {name: 'merchandiseCName', type: 'sting'},
                {name: 'sortId', type: 'string'},
                {name: 'state', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('mecname');
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
            title: '商品类别分类',
            id: 'merchanc',
            width: 600,
            closable: true,
            store: store,
            columns: [
                {text: '商品类别编码', dataIndex: 'merchandiseCid', flex: 1},
                {text: '商品类别名称', dataIndex: 'merchandiseCName', flex: 1},
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
                {fieldLabel: '商品单位名称', xtype: 'textfield', name: 'merchandiseCName', labelAlign: "right", id: "mecname"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();
    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "merchaninsert",
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
                        {fieldLabel: '商品类别编码', allowBlank: false, name: 'tmc.merchandiseCid', maxLength: 10},
                        {fieldLabel: '商品类别名称', allowBlank: false, name: 'tmc.merchandiseCName', maxLength: 50},
                        {fieldLabel: '排序编码', allowBlank: false, name: 'tmc.sortId'},
                        {fieldLabel: '状态', allowBlank: false, name: 'tmc.state'}
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
                    Ext.getCmp("merchaninsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merchaninsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("merchanc").store.reload();
                        Ext.getCmp("merchaninsert").close();
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
        var record = Ext.getCmp('merchanc').getSelectionModel().getSelection()[0];
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
            id: 'merchandel',
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
                        {fieldLabel: '商品类别编码', allowBlank: false, name: 'tmc.merchandiseCid', value: record.get("merchandiseCid") },
                        {fieldLabel: '商品类别名称', allowBlank: false, name: 'tmc.merchandiseCName', value: record.get("merchandiseCName") },
                        {fieldLabel: '排序编码', allowBlank: false, name: 'tmc.sortId', value: record.get("sortId") },
                        {fieldLabel: '状态', allowBlank: false, name: 'tmc.state', value: record.get("state") }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '确认', handler: a.sumdelete},
                { text: '取消', handler: function () {
                    Ext.getCmp("merchandel").close();
                }}
            ]
        }).show().center();
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merchandel',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("merchanc").store.reload();
                        Ext.getCmp("merchandel").close();
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
        var record = Ext.getCmp('merchanc').getSelectionModel().getSelection()[0];

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
            id: 'merchanupdate',
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
                        {fieldLabel: '商品类别编码', allowBlank: false, name: 'tmc.merchandiseCid', value: record.get("merchandiseCid"), readOnly: true },
                        {fieldLabel: '商品类别名称', allowBlank: false, name: 'tmc.merchandiseCName', value: record.get("merchandiseCName"), maxLength: 50},
                        {fieldLabel: '排序编码', allowBlank: false, name: 'tmc.sortId', value: record.get("sortId") },
                        {fieldLabel: '状态', allowBlank: false, name: 'tmc.state', value: record.get("state") }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("merchanupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merchanupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("merchanc").store.reload();
                        Ext.getCmp("merchanupdate").close();

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
        Ext.getCmp('merchanc').store.load({params: {name: Ext.getCmp("mecname").getValue()}});

    }
});