//Ext.define('js.instock', {
//    extend: 'Ext.grid.Panel',
//   mysup: Ext.create('Ext.data.Store', {
//        proxy: {
//            type: 'ajax',
//            url: '/supplier',
//            reader: {
//                type: 'json',
//                root: 'tslist'
//            }
//        }, fields: [
//            {name: 'supplierName', type: 'string'},
//            {name: 'supplierId', type: 'string'}
//        ],
//        autoLoad: true
//    }),
//    myoper: Ext.create('Ext.data.Store', {
//        proxy: {
//            type: 'ajax',
//            url: '/oper',
//            reader: {
//                type: 'json',
//                root: 'tolist'
//            }
//        }, fields: [
//            {name: 'operId', type: 'string'},
//            {name: 'operName', type: 'string'}
//        ],
//        autoLoad: true
//    }),
//    mymer: Ext.create('Ext.data.Store', {
//        proxy: {
//            type: 'ajax',
//            url: '/merch',
//            reader: {
//                type: 'json',
//                root: 'good_list'
//            }
//        }, fields: [
//            {name: 'merchandiseName', type: 'string'},
//            {name: 'merchandiseId', type: 'string'}
//        ],
//        autoLoad: true
//    }),
//    type: Ext.create('Ext.data.Store', {
//        fields: ['abbr', 'name'],
//        data: [
//            {"abbr": 1, "name": "正常入库"},
//            {"abbr": 2, "name": "报溢"},
//            {"abbr": 3, "name": "盘盈"}
//
//        ]
//    }),
//    initComponent: function () {
//        var me = this;
//
//        var store = Ext.create('Ext.data.Store', {
//            pageSize: 4,
//            proxy: {
//                type: 'ajax',
//                url: '/instock',
//                reader: {
//                    type: 'json',
//                    root: 'tslist',
//                    totalProperty: 'rowcount'}
//            },
//            fields: [
//                {name: 'billcode.billCode', type: 'string'},
//                {name: 'merchandise.merchandiseName', type: 'string'},
//                {name: 'num', type: 'int'},
//                {name: 'price', type: 'string'},
//                {name: 'billcode.supplier.supplierName', type: 'string'},
//                {name: 'billcode.oper.operName', type: 'sting'},
//                {name: 'billcode.inType', type: 'string'},
//                {name: 'billcode.inTime', type: 'timestamp'},
//                {name: 'billcode.handler', type: 'string'},
//                {name: 'billcode.totalMoney', type: 'string'},
//                {name: 'billcode.remark', type: 'string'}
//            ], autoLoad: false,
//            listeners: {
//                beforeload: function (store, operation) {
//                    var name = Ext.getCmp('insname');
//                    if (name) {
//                        if (name.getValue()) {
//                            if (operation.params) {
//                                operation.params.name = name.getValue();
//
//                            } else {
//                                operation.params = {name: name.getValue()};
//                            }
//                        }
//                    }
//                }
//            }
//        });
//
//
//        store.load({
//            params: {
//                start: 0,
//                limit: 4
//            }
//        });
//        Ext.apply(this, {
//            title: '入库信息表',
//            id: 'instock',
//            width: 600,
//            closable: true,
//            store: store,
//
//            columns: [
//                {text: '入库编号', dataIndex: 'billcode.billCode'},
//                {text: '商品名称', dataIndex: 'merchandise.merchandiseName'},
//                {text: '入库数量', dataIndex: 'num'},
//                {text: '入库单价', dataIndex: 'price'},
//                {text: '供应商', dataIndex: 'billcode.supplier.supplierName'},
//                {text: '操作员', dataIndex: 'billcode.oper.operName'},
//                {text: '入库类型', dataIndex: 'billcode.inType'},
//                {text: '入库时间', dataIndex: 'billcode.inTime'},
//                {text: '经手人', dataIndex: 'billcode.handler'},
//                {text: '入库金额', dataIndex: 'billcode.totalMoney'},
//                {text: '备注', dataIndex: 'billcode.remark'}
//            ],
//            dockedItems: [
//                {
//                    xtype: 'pagingtoolbar',
//                    store: store,
//                    dock: 'bottom',
//                    displayInfo: true
//                }
//            ],
//            tbar: [
//                { xtype: 'button', text: '添加', handler: function () {
//                    me.insert(me);
//                }},
//                {xtype: 'button', text: '删除', handler: function () {
//                    me.delete(me)
//                }},
//                {xtype: 'button', text: '修改', handler: function () {
//                    me.update(me);
//                }},
//                {fieldLabel: '经手人', xtype: 'textfield', name: 'supplierName', id: "insname"},
//                {xtype: 'button', text: '查询', handler: me.find}
//            ]
//        });
//        this.callParent();
//    },
//    insert: function (a) {
//
//
//        Ext.create('Ext.window.Window', {
//
//            title: '添加',
//            id: "insinsert",
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
//                        {fieldLabel: '入库编号', name: 'ts.billCode'},
//                        {xtype: 'combo', store: a.mysup, fieldLabel: '供应商名称', id: 't1', allowBlank: false, name: 'tm.supplier.supplierId', displayField: 'supplierName', valueField: 'supplierId'},
//                        {xtype: 'combo', store: a.myoper, fieldLabel: '操作员', id: 't2', name: 'ts.oper.operId', allowBlank: false, displayField: 'operName', valueField: 'operId'},
//                        {xtype: 'combo', store: a.mymer, fieldLabel: '商品名称', id: 't3', name: 'tsd.merchandise.merchandiseId', allowBlank: false, displayField: 'merchandiseName', valueField: 'merchandiseId'},
//                        {xtype: 'combo', store: a.type, fieldLabel: '入库方式', name: 'ts.inType', allowBlank: false, displayField: 'name', valueField: 'abbr'},
//                        {fieldLabel: '进价', name: 'tsd.price'},
//                        {fieldLabel: '入库数量', name: 'tsd.num'},
//                        {fieldLabel: '入库时间', allowBlank: false, name: 'ts.inTime'},
//                        {fieldLabel: '经手人', allowBlank: false, name: 'ts.handler'},
//                        {fieldLabel: '入库金额', allowBlank: false, name: 'ts.totalMoney'},
//                        {fieldLabel: '备注', allowBlank: false, name: 'ts.remark'}
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
//                    Ext.getCmp("insinsert").close();
//                }}
//            ]
//        }).show().center();
//    },
//    sumb1: function () {
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
////                params:[{
////                    tBaSupplierInfoBySupplierId:Ext.getCmp("t1").value,
////                    tAuOperInfoByOperId:Ext.getCmp("t2").value,
////                    tMeMerchandiseInfoByMerchandiseId:Ext.getCmp("t3").value
////                }],
//                url: '/insinsert',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    if (msg.ishave) {
//                        Ext.MessageBox.show({
//                            title: '系统提示',
//                            msg: msg.mag,
//                            icon: Ext.MessageBox.WARNING,
//                            buttons: Ext.MessageBox.YES
//                        });
//                        Ext.getCmp("instock").store.reload();
//                        Ext.getCmp("insinsert").close();
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
//
//    }, delete: function (a) {
//        var record = Ext.getCmp('instock').getSelectionModel().getSelection()[0];
//
//        Ext.create('Ext.window.Window', {
//            title: '确认信息',
//            border: false,
//            id: 'insdelete',
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
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'td.deliveryId', value: record.get('deliveryId')},
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'td.deliveryName', value: record.get('deliveryName')},
//                        {fieldLabel: '住址', allowBlank: false, name: 'td.address', value: record.get('address')},
//                        {fieldLabel: '联系人', allowBlank: false, name: 'td.linkName', value: record.get('linkName')},
//                        {fieldLabel: '联系电话', allowBlank: false, name: 'td.linkTel', value: record.get('linkTel')},
//                        {fieldLabel: 'QQ', name: 'td.QQ', value: record.get('QQ')},
//                        {fieldLabel: 'Email', name: 'td.email', value: record.get('email')},
//                        {fieldLabel: '排序编码', name: 'td.sortId', value: record.get('sortId')},
//                        {fieldLabel: '排序状态', allowBlank: false, name: 'td.state', value: record.get('state')}
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '确认', handler: a.sumdelete},
//                { text: '取消', handler: function () {
//                    Ext.getCmp("insdelete").close();
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
//                url: '/insdelete',
//                success: function (form, action) {
//                    var msg = Ext.JSON.decode(action.response.responseText);
//                    if (msg.ishave) {
//                        Ext.MessageBox.show({
//                            title: '系统提示',
//                            msg: msg.mag,
//                            icon: Ext.MessageBox.WARNING,
//                            buttons: Ext.MessageBox.YES
//                        });
//                        Ext.getCmp("instock").store.reload();
//                        Ext.getCmp("insdelete").close();
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
//    }, update: function (a) {
//        var record = Ext.getCmp('instock').getSelectionModel().getSelection()[0];
//        Ext.create('Ext.window.Window', {
//            title: '修改信息',
//            border: false,
//            frame: true,
//            id: 'insupdate',
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
//                        {fieldLabel: '配送商编码', allowBlank: false, name: 'td.deliveryId', value: record.get('deliveryId')},
//                        {fieldLabel: '配送商名称', allowBlank: false, name: 'td.deliveryName', value: record.get('deliveryName')},
//                        {fieldLabel: '住址', allowBlank: false, name: 'td.address', value: record.get('address')},
//                        {fieldLabel: '联系人', allowBlank: false, name: 'td.linkName', value: record.get('linkName')},
//                        {fieldLabel: '联系电话', allowBlank: false, name: 'td.linkTel', value: record.get('linkTel')},
//                        {fieldLabel: 'QQ', name: 'td.QQ', value: record.get('QQ')},
//                        {fieldLabel: 'Email', name: 'td.email', value: record.get('email')},
//                        {fieldLabel: '排序编码', name: 'td.sortId', value: record.get('sortId')},
//                        {fieldLabel: '排序状态', allowBlank: false, name: 'td.state', value: record.get('state')}
//                    ]
//                }
//            ],
//            buttonAlign: 'center',
//            buttons: [
//                { text: '提交', handler: a.sumupdate},
//                { text: '取消', handler: function () {
//                    Ext.getCmp("insupdate").close();
//                }}
//
//            ]
//
//        }).show().center();
//    },
//    sumupdate: function () {
//        var form = this.up('window').down('form').getForm();
//        if (form.isValid()) {
//            form.submit({
//                url: '/delupdate',
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
//                        Ext.getCmp("instock").store.reload();
//                        Ext.getCmp("insupdate").close();
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
//        Ext.getCmp('instock').store.load({params: {name: Ext.getCmp("insname").getValue()}});
//
//    }
//});