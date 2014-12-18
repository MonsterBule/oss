Ext.define('js.page', {
    extend: 'Ext.grid.Panel',
    merc: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/merchandisec',
            reader: {
                type: 'json',
                root: 'tmclist'
            }
        }, fields: [
            {name: 'merchandiseCid', type: 'string'},
            {name: 'merchandiseCName', type: 'string'}
        ],
        autoLoad: true
    }),
    statu: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/prostatus',
            reader: {
                type: 'json',
                root: 'tpslist'
            }
        }, fields: [
            {name: 'proStatusId', type: 'Integer'},
            {name: 'proStatusName', type: 'string'}
        ],
        autoLoad: true
    }),
    unti: Ext.create('Ext.data.Store', {
        proxy: {
            type: "ajax",
            url: '/unit',
            reader: {
                type: 'json',
                root: 'tulist'
            }

        }, fields: [
            {name: 'unitId', type: 'Integer'},
            {name: 'name', type: 'string'}
        ],
        autoLoad: true

    }),
    sale: Ext.create('Ext.data.Store', {
        fields: [
            {name: 'abbr', type: 'string'},
            {name: 'name', type: 'boolean'}
        ],
        data: [
            {"abbr": 1, "name": "false"},
            {"abbr": 2, "name": "true"}
        ]
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/merch',
                reader: {
                    type: 'json',
                    root: 'good_list',
                    totalProperty: 'rowcount'
                }
            },
            fields: [
                { name: 'merchandiseId', type: 'string'},
                {name: 'merchandiseName', type: 'sting'},
                {name: 'merchandisc.merchandiseCName', type: 'string'},
                {name: 'price', type: 'string'},
                {name: 'unit.name', type: 'string'},
                {name: 'saleStatus', type: 'string'},
                {name: 'status.proStatusName', type: 'string'},
                {name: 'merchandiseAb', type: 'sting'},
                {name: 'spec', type: 'string'},
                {name: 'describe', type: 'string'},
                {name: 'picPath', type: 'string'},
                {name: 'clickCount', type: 'string'},
                {name: 'remark', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('mwename');
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
            title: '商品展示',
            id: 'page',
            width: 600,
            selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
            closable: true,
            store: store,
            columns: [
                {text: '商品编码', dataIndex: 'merchandiseId', flex: 1},
                {text: '商品名称', dataIndex: 'merchandiseName', flex: 1},
                {text: '商品助记码', dataIndex: 'merchandiseAb', flex: 1},
                {text: '商品类别', dataIndex: 'merchandisc.merchandiseCName', flex: 1},
                {text: '商品价格', dataIndex: 'price', flex: 1},
                {text: '商品单位', dataIndex: 'unit.name', flex: 1},
                {text: '销售状态', dataIndex: 'saleStatus', flex: 1},
                {text: '促销状态', dataIndex: 'status.proStatusName', flex: 1},
                {text: '规格', dataIndex: 'spec', hidden: true, flex: 1},
                {text: '描述', dataIndex: 'describe', hidden: true, flex: 1},
                {text: '图片', dataIndex: 'picPath', flex: 1},
                {text: '点击数', dataIndex: 'clickCount', flex: 1},
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
                {fieldLabel: '商品名称', xtype: 'textfield', name: 'supplierName', labelAlign: "right", id: "mername"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();
    },
    insert: function (a) {
        Ext.create('Ext.window.Window', {
            title: '添加',
            id: "merinsert",
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
                        {fieldLabel: '商品编码', allowBlank: false, name: 'tm.merchandiseId', maxLength: 20 },
                        {fieldLabel: '商品名称', allowBlank: false, name: 'tm.merchandiseName', maxLength: 25},
                        {fieldLabel: '商品助记码', name: 'tm.merchandiseAb', hidden: true},
                        {xtype: 'combo', store: a.merc, fieldLabel: '商品类别', allowBlank: false, name: 'tm.merchandisc.merchandiseCid', displayField: 'merchandiseCName', valueField: 'merchandiseCid'},
                        {xtype: 'combo', store: a.unti, fieldLabel: '商品单位', allowBlank: false, name: 'tm.unit.unitId', displayField: 'name', valueField: 'unitId'},
                        {fieldLabel: '价格', allowBlank: false, name: 'tm.price', xtype: 'numberfield'},
                        {xtype: 'combo', store: a.statu, fieldLabel: '商品促销状态', allowBlank: false, name: 'tm.status.proStatusId', displayField: 'proStatusName', valueField: 'proStatusId'},
                        {xtype: 'combo', store: a.sale, fieldLabel: '销售状态', name: 'tm.saleStatus', allowBlank: false, displayField: 'name', valueField: 'abbr'},
                        {fieldLabel: '规格', name: 'tm.spec', maxLength: 200},
                        {fieldLabel: '描述', name: 'tm.describe', maxLength: 200},
                        {fieldLabel: '图片', name: 'tm.picPath', maxLength: 100},
                        {fieldLabel: '点击数', name: 'tm.clickCount'},
                        {fieldLabel: '备注', name: 'tm.remark', maxLength: 100}
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
                    Ext.getCmp("merinsert").close();
                }}
            ]
        }).show().center();
    },
    sumb1: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merinsert',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("page").store.reload();
                        Ext.getCmp("merinsert").close();
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
    },
    delete: function (a) {
        var record = Ext.getCmp('page').getSelectionModel().getSelection();
        if (record == null) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: "请选择一条数据",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES


            });
            return;
        }
        var list = "";
        for (var i = 0, len = record.length; i < len; i++) {
            list += record[i].get("merchandiseId");
            if (i != len - 1) {
                list += ','
            }
        }

        Ext.Msg.show({
            title: "系统信息",
            msg: "确定要删除数据",
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn === "yes") {
                    Ext.Ajax.request({
                        url: "/merdelete?list=" + list,
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            if (msg.ishave) {
                                Ext.Msg.show({
                                    title: "系统提示",
                                    msg: msg.mag,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.YES
                                });
                                Ext.getCmp("page").store.reload();
                                return;
                            }
                            Ext.Msg.show({
                                title: "系统提示",
                                msg: msg.mag,
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                        },
                        failure: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: "系统提示",
                                msg: msg.mag,
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                        }
                    })
                }
            }
        });
    },
    sumdelete: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merdelete',
                success: function (response) {
                    var msg = Ext.JSON.decode(response.responseText);
                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("page").store.reload();
                        Ext.getCmp("merdelete").close();
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
        var record = Ext.getCmp('page').getSelectionModel().getSelection()[0];
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
            id: 'merupdate',
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
                        {fieldLabel: '商品编码', allowBlank: false, name: 'tm.merchandiseId', value: record.get('merchandiseId'), readOnly: true},
                        {fieldLabel: '商品名称', allowBlank: false, name: 'tm.merchandiseName', value: record.get('merchandiseName'), maxLength: 25},
                        {xtype: 'combo', store: a.merc, fieldLabel: '商品类别', allowBlank: false, name: 'tm.merchandisc.merchandiseCid', displayField: 'merchandiseCName', valueField: 'merchandiseCid', value: record.raw.merchandisc.merchandiseCid},
                        {xtype: 'combo', store: a.unti, fieldLabel: '商品单位', allowBlank: false, name: 'tm.unit.unitId', displayField: 'name', valueField: 'unitId', value: record.raw.unit.unitId},
                        {fieldLabel: '价格', allowBlank: false, name: 'tm.price', value: record.get('price'), xtype: 'numberfield'},
                        {xtype: 'combo', store: a.statu, fieldLabel: '商品促销状态', allowBlank: false, name: 'tm.status.proStatusId', displayField: 'proStatusName', valueField: 'proStatusId', value: record.raw.status.proStatusId},
                        {xtype: 'combo', store: a.sale, fieldLabel: '销售状态', name: 'tm.saleStatus', allowBlank: false, displayField: 'name', valueField: 'abbr', value: record.raw.saleStatus},
                        {fieldLabel: '规格', name: 'tm.spec', value: record.get('spec'), maxLength: 200},
                        {fieldLabel: '描述', name: 'tm.describe', value: record.get('describe'), maxLength: 200},
                        {fieldLabel: '图片', name: 'tm.picPath', value: record.get('picPath'), maxLength: 100},
                        {fieldLabel: '点击数', name: 'tm.clickCount', value: record.get('clickCount')},
                        {fieldLabel: '备注', name: 'tm.remark', value: record.get('remark'), maxLength: 100}
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '提交', handler: a.sumupdate},
                { text: '取消', handler: function () {
                    Ext.getCmp("merupdate").close();
                }}
            ]

        }).show().center();
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/merupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if (msg.ishave) {
                        Ext.MessageBox.show({
                            title: '系统提示',
                            msg: msg.mag,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp("page").store.reload();
                        Ext.getCmp("merupdate").close();

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
        Ext.getCmp('page').store.load({params: {name: Ext.getCmp("mername").getValue()}});

    }
});