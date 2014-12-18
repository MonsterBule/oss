Ext.define('js.outstock', {
    extend: 'Ext.panel.Panel',
    mysup: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/supplier',
            reader: {
                type: 'json',
                root: 'tslist'
            }
        }, fields: [
            {name: 'supplierName', type: 'string'},
            {name: 'supplierId', type: 'string'}
        ],
        autoLoad: true
    }),
    myoper: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/oper',
            reader: {
                type: 'json',
                root: 'tolist'
            }
        }, fields: [
            {name: 'operId', type: 'string'},
            {name: 'operName', type: 'string'}
        ],
        autoLoad: true
    }),
    mymer: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/merch',
            reader: {
                type: 'json',
                root: 'good_list'
            }
        }, fields: [
            {name: 'merchandiseName', type: 'string'},
            {name: 'merchandiseId', type: 'string'}
        ],
        autoLoad: true
    }),
    type: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": 1, "name": "正常入库"},
            {"abbr": 2, "name": "报溢"},
            {"abbr": 3, "name": "盘盈"}

        ]
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/outstock',
                reader: {
                    type: 'json',
                    root: 'toslist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'outBillCode', type: 'string'},
                {name: 'oper.operName', type: 'sting'},
                {name: 'outType', type: 'string'},
                {name: 'outTime', type: 'timestamp'},
                {name: 'handler', type: 'string'},
                {name: 'totalMoney', type: 'string'},
                {name: 'remark', type: 'string'}
            ], autoLoad: false});
        //出库明细
        var instore = Ext.create('Ext.data.Store', {
            id: 'outstoredeta',
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/outstockdetail',
                reader: {
                    type: 'json',
                    root: 'toslist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'id', type: 'int'},
                {name: 'billcode.outBillCode', type: 'string'},
                {name: 'chandise.merchandiseName', type: 'string'},
                {name: 'num', type: 'int'},
                {name: 'billcode.supplier.supplierName', type: 'string'},
                {name: 'price', type: 'string'},
                {name: 'stockPrice', type: 'string'}
            ], autoLoad: true
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
        });
        store.load({
            params: {
                start: 0,
                limit: 4
            }
        });
        Ext.apply(this, {
            title: '出库信息表',
            layout: "border",
            id: 'outstock',
            width: 600,
            height: 500,
            closable: true,
            items: [
                {
                    title: '出库信息表',
                    xtype: 'grid',
                    id: 'gridout',
                    split: true,
                    height: 400,
                    region: 'north', store: store,
                    columns: [
                        {text: '出库编号', dataIndex: 'outBillCode', flex: 1},
                        {text: '操作员', dataIndex: 'oper.operName', flex: 1},
                        {text: '出库类型', dataIndex: 'outType', flex: 1},
                        {text: '出库时间', dataIndex: 'outTime', flex: 1},
                        {text: '经手人', dataIndex: 'handler', flex: 1},
                        {text: '出库金额', dataIndex: 'totalMoney', flex: 1},
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
                    listeners: {//入库单数据的绑定事件
                        itemcontextmenu: function (view, record, item, index, e) {
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float: true,
                                items: [
                                    {
                                        text: "查看",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            //当点击时隐藏右键菜单
                                            this.up("menu").hide();
                                            //alert(record.get('billCode'));
                                            Ext.getCmp('outstockdeta').store.reload({
                                                params: {
                                                    billCode: record.get('outBillCode')
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "删除",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            var record = Ext.getCmp("gridout").getSelectionModel().getSelection();
                                            var list = "";
                                            for (var i = 0, len = record.length; i < len; i++) {
                                                list += record[i].get("outBillCode");
                                                if (i != len - 1) {
                                                    list += ","
                                                }
                                            }
                                            Ext.Msg.show({
                                                title: "系统信息",
                                                msg: "确定要删除入库单",
                                                icon: Ext.Msg.WARNING,
                                                buttons: Ext.Msg.YESNO,
                                                fn: function (btn) {
                                                    if (btn === "yes") {
                                                        Ext.Ajax.request({
                                                            url: "/outstoredelete?outbillcode=" + list,
                                                            success: function (response) {
                                                                var msg = Ext.JSON.decode(response.responseText);
                                                                if (msg.ishave) {
                                                                    Ext.Msg.show({
                                                                        title: "系统提示",
                                                                        msg: msg.mag,
                                                                        icon: Ext.Msg.WARNING,
                                                                        buttons: Ext.Msg.YES
                                                                    });
                                                                    Ext.getCmp("gridout").store.reload();
                                                                    Ext.getCmp("outstockdeta").store.reload();
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
                                        }

                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }}
                },
                {
                    title: '出库明细表',
                    id: 'outstockdeta',
                    xtype: 'grid',
                    region: 'center',
                    split: true,
                    store: instore,
                    columns: [
                        {text: '出库ID', dataIndex: 'billcode.id', hidden: true},
                        {text: '出库编号', dataIndex: 'billcode.outBillCode', flex: 1},
                        {text: '商品名称', dataIndex: 'chandise.merchandiseName', flex: 1},
                        {text: '出库数量', dataIndex: 'num', flex: 1},
                        {text: '出库单价', dataIndex: 'price', flex: 1},
                        {text: '进货成本', dataIndex: 'price', flex: 1}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: instore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    listeners: {//入库单数据的绑定事件
                        itemcontextmenu: function (view, record, item, index, e) {
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float: true,
                                items: [
                                    {
                                        text: "查看",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            //当点击时隐藏右键菜单
                                            this.up("menu").hide();
                                            Ext.getCmp('outstockdeta').store.reload({
                                                params: {
                                                    billCode: record.get('outBillCode')
                                                }
                                            });
                                        }
                                    }
                                    ,
                                    {
                                        text: '修改',
                                        iconCls: 'leaf',
                                        handler: function () {
                                            var recodestore = Ext.getCmp('gridout').getSelectionModel().getSelection()[0];
                                            var recodesdate = Ext.getCmp('outstockdeta').getSelectionModel().getSelection()[0];
                                            Ext.create('Ext.window.Window', {
                                                title: '编辑出库信息及出库明细',
                                                border: false,
                                                id: 'outstorefrom',
                                                width: 600,
                                                height: 550,
                                                modal: true,
                                                maximizable: true,//窗口变大
                                                frame: true,
                                                layout: "fit",
                                                items: [
                                                    {
                                                        xtype: 'form',
                                                        layout: 'border',
                                                        items: [
                                                            {
                                                                region: 'center',
                                                                title: '出库信息',
                                                                defaults: {
                                                                    xtype: 'textfield',
                                                                    margin: '10 10 10 10',
                                                                    labelAlign: 'right'
                                                                }, items: [
                                                                {fieldLabel: '出库编号', name: 'tos.outBillCode', value: recodestore.get('outBillCode'), readOnly: true},
                                                                {xtype: 'combo', store: me.myoper, displayField: 'operName', valueField: 'operId', fieldLabel: '操作员', name: 'tos.oper.operId', value: recodestore.raw.oper.operId},
                                                                {xtype: 'combo', store: me.type, displayField: 'name', valueField: 'abbr', fieldLabel: '出库类型', name: 'tos.outType', value: recodestore.raw.outType},
                                                                {fieldLabel: '经手人', name: 'tos.handler', value: recodestore.get('handler')},
                                                                {fieldLabel: '出库时间', name: 'tos.outTime', value: recodestore.get('outTime'), readOnly: true},
                                                                {fieldLabel: '出库金额', name: 'tos.totalMoney', value: recodestore.get('totalMoney'), readOnly: true},
                                                                {fieldLabel: '备注', name: 'tos.remark', value: recodestore.get('remark'), xtype: 'textarea'}
                                                            ]
                                                            },
                                                            {
                                                                region: 'east',
                                                                title: '出库明细',
                                                                defaults: {
                                                                    xtype: 'textfield',
                                                                    margin: '10 10 10 10',
                                                                    labelAlign: 'right'
                                                                }, items: [
                                                                {fieldLabel: '明细ID', name: 'tosd.id', value: recodesdate.get('id'), hidden: true},
                                                                {fieldLabel: '出库编号', name: 'tosd.billcode.outBillCode', value: recodesdate.get('billcode.outBillCode'), readOnly: true},
                                                                {xtype: 'combo', store: me.mymer, displayField: 'merchandiseName', valueField: 'merchandiseId', fieldLabel: '商品名称', name: 'tosd.chandise.merchandiseId', value: recodesdate.raw.chandise.merchandiseId, readOnly: true},
                                                                {fieldLabel: '出库数量', name: 'tosd.num', value: recodesdate.get('num')},
                                                                {fieldLabel: '出库单价', name: 'tosd.price', value: recodesdate.get('price')},
                                                                {fieldLabel: '出库成本', name: 'tosd.stockPrice', value: recodesdate.get('stockPrice'), readOnly: true}
                                                            ]
                                                            }
                                                        ],
                                                        buttonAlign: "center",
                                                        buttons: [
                                                            {
                                                                text: "提交",
                                                                handler: function () {
                                                                    var form = this.up('window').down('form').getForm();
                                                                    if (form.isValid()) {
                                                                        form.submit({
                                                                            url: "/outstoreupdate",
                                                                            success: function (form, action) {
                                                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                                                if (msg.ishave) {
                                                                                    Ext.Msg.show({
                                                                                        title: "系统提示",
                                                                                        msg: msg.mag,
                                                                                        icon: Ext.Msg.WARNING,
                                                                                        buttons: Ext.Msg.YES
                                                                                    });
                                                                                    Ext.getCmp("gridout").store.reload();
                                                                                    Ext.getCmp("outstockdeta").store.reload();
                                                                                    Ext.getCmp("outstorefrom").close();
                                                                                    return;
                                                                                }
                                                                                ;
                                                                                Ext.Msg.show({
                                                                                    title: "系统提示",
                                                                                    msg: msg.mag,
                                                                                    icon: Ext.Msg.WARNING,
                                                                                    buttons: Ext.Msg.YES
                                                                                });
                                                                                return;
                                                                            },
                                                                            failure: function (from, action) {
                                                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                                                Ext.Msg.show({
                                                                                    title: "系统提示",
                                                                                    msg: msg.mag,
                                                                                    icon: Ext.Msg.WARNING,
                                                                                    buttons: Ext.Msg.YES
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                text: "重置",
                                                                handler: function () {
                                                                    this.up('window').down('form').getForm().reset();
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }).show().center();
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }}
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
//                    me.update(me);
//                }},
//                {fieldLabel: '经手人', xtype: 'textfield', name: 'supplierName', id: "insname"},
//                {xtype: 'button', text: '查询', handler: me.find}
//            ]
        });
        this.callParent();
    }
});