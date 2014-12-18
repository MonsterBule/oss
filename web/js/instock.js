Ext.define('js.instock', {
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
                url: '/instock1',
                reader: {
                    type: 'json',
                    root: 'tslist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                'billCode',
                'supplier.supplierName',
                'oper.operName',
                'inType',
                'inTime',
                'handler',
                'totalMoney',
                'remark'
            ], autoLoad: false});
        //入库明细
        var instore = Ext.create('Ext.data.Store', {
            id: 'aa',
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/instockdetail',
                reader: {
                    type: 'json',
                    root: 'toslist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'billcode.id', type: 'int'},
                {name: 'billcode.billCode', type: 'string'},
                {name: 'merchandise.merchandiseName', type: 'string'},
                {name: 'num', type: 'int'},
                {name: 'billcode.supplier.supplierName', type: 'string'},
                {name: 'price', type: 'string'}
            ], autoLoad: true,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('insname');
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
            title: '入库信息表',
            layout: "border",
            id: 'instock',
            width: 600,
            height: 500,
            closable: true,
            items: [
                {
                    title: '入库信息表',
                    xtype: 'grid',
                    id: 'gridin',
                    split: true,
                    height: 400,
                    region: 'north', store: store,
                    columns: [
                        {text: '入库编号', dataIndex: 'billCode', flex: 1},
                        {text: '供应商', dataIndex: 'supplier.supplierName', flex: 1},
                        {text: '操作员', dataIndex: 'oper.operName', flex: 1},
                        {text: '入库类型', dataIndex: 'inType', flex: 1},
                        {text: '入库时间', dataIndex: 'inTime', flex: 1},
                        {text: '经手人', dataIndex: 'handler', flex: 1},
                        {text: '入库金额', dataIndex: 'totalMoney', flex: 1},
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
                                            Ext.getCmp('instockdeta').store.reload({
                                                params: {
                                                    billCode: record.get('billCode')
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "删除",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            var record = Ext.getCmp("gridin").getSelectionModel().getSelection();
                                            var list = "";
                                            for (var i = 0, len = record.length; i < len; i++) {
                                                list += record[i].get("billCode");
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
                                                            url: "/instoredelete?billCode=" + list,
                                                            success: function (response) {
                                                                var msg = Ext.JSON.decode(response.responseText);
                                                                if (msg.ishave) {
                                                                    Ext.Msg.show({
                                                                        title: "系统提示",
                                                                        msg: msg.mag,
                                                                        icon: Ext.Msg.WARNING,
                                                                        buttons: Ext.Msg.YES
                                                                    });
                                                                    Ext.getCmp("gridin").store.reload();
                                                                    Ext.getCmp("instockdeta").store.reload();
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
                    title: '入库明细表',
                    id: 'instockdeta',
                    xtype: 'grid',
                    region: 'center',
                    split: true,
                    store: instore,
                    columns: [
                        {text: '入库ID', dataIndex: 'billcode.id', hidden: true},
                        {text: '入库编号', dataIndex: 'billcode.billCode', flex: 1},
                        {text: '商品名称', dataIndex: 'merchandise.merchandiseName', flex: 1},
                        {text: '入库数量', dataIndex: 'num', flex: 1},
                        {text: '入库单价', dataIndex: 'price', flex: 1}
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
                                        text: '修改',
                                        iconCls: 'leaf',
                                        handler: function () {
                                            var recodestore = Ext.getCmp('gridin').getSelectionModel().getSelection()[0];
                                            var recodesdate = Ext.getCmp('instockdeta').getSelectionModel().getSelection()[0];
                                            Ext.create('Ext.window.Window', {
                                                title: '编辑入库信息及入库明细',
                                                border: false,
                                                id: 'storefrom',
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
                                                                title: '入库信息',
                                                                defaults: {
                                                                    xtype: 'textfield',
                                                                    margin: '10 10 10 10',
                                                                    labelAlign: 'right'
                                                                }, items: [
                                                                {fieldLabel: '入库编号', name: 'ts.billCode', value: recodestore.get('billCode'), readOnly: true},
                                                                {xtype: 'combo', store: me.mysup, displayField: 'supplierName', valueField: 'supplierId', fieldLabel: '供应商', name: 'ts.supplier.supplierId', editable: false, value: recodestore.raw.supplier.supplierId},
                                                                {xtype: 'combo', store: me.myoper, displayField: 'operName', valueField: 'operId', fieldLabel: '操作员', name: 'ts.oper.operId', editable: false, value: recodestore.raw.oper.operId},
                                                                {xtype: 'combo', store: me.type, displayField: 'name', valueField: 'abbr', fieldLabel: '入库类型', name: 'ts.inType', editable: false, value: recodestore.raw.inType},
                                                                {fieldLabel: '经手人', name: 'ts.handler', value: recodestore.get('handler')},
                                                                {fieldLabel: '入库时间', name: 'ts.inTime', value: recodestore.get('inTime')},
                                                                {fieldLabel: '入库金额', name: 'ts.totalMoney', id: 'totalmoney', value: recodestore.get('totalMoney'), readOnly: true},
                                                                {fieldLabel: '备注', name: 'ts.remark', value: recodestore.get('remark'), xtype: 'textarea'}
                                                            ]
                                                            },
                                                            {
                                                                region: 'east',
                                                                title: '入库明细',
                                                                defaults: {
                                                                    xtype: 'textfield',
                                                                    margin: '10 10 10 10',
                                                                    labelAlign: 'right'
                                                                }, items: [
                                                                {fieldLabel: '入库编号', name: 'tsd.id', value: recodesdate.get('id'), hidden: true},
                                                                {fieldLabel: '入库编号', name: 'tsd.billcode.billCode', value: recodesdate.raw.billcode.billCode, readOnly: true},
                                                                {xtype: 'combo', store: me.mymer, displayField: 'merchandiseName', valueField: 'merchandiseId', editable: false, fieldLabel: '商品名称', name: 'tsd.merchandise.merchandiseId', value: recodesdate.raw.merchandise.merchandiseId},
                                                                {fieldLabel: '入库数量', id: 'instocknum', name: 'tsd.num', value: recodesdate.get('num'),
                                                                    listeners: {
                                                                        blur: function () {
                                                                            var totalmoney = recodestore.get('totalMoney') - recodesdate.get('num') * recodesdate.get('price') + Ext.getCmp('instocknum').getValue() * Ext.getCmp('instockprice').getValue()
                                                                            Ext.getCmp('totalmoney').setValue(totalmoney)
                                                                        }


                                                                    }

                                                                },
                                                                {fieldLabel: '入库单价', id: 'instockprice', name: 'tsd.price', value: recodesdate.get('price'),
                                                                    listeners: {
                                                                        blur: function () {

                                                                            var totalmoney = recodestore.get('totalMoney') - recodesdate.get('num') * recodesdate.get('price') + Ext.getCmp('instocknum').getValue() * Ext.getCmp('instockprice').getValue();
                                                                            Ext.getCmp('totalmoney').setValue(totalmoney)
                                                                        }


                                                                    }}
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
                                                                            url: "/instoreupdate",
                                                                            success: function (form, action) {
                                                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                                                if (msg.ishave) {
                                                                                    Ext.Msg.show({
                                                                                        title: "系统提示",
                                                                                        msg: msg.mag,
                                                                                        icon: Ext.Msg.WARNING,
                                                                                        buttons: Ext.Msg.YES
                                                                                    });
                                                                                    Ext.getCmp("gridin").store.reload();
                                                                                    Ext.getCmp("instockdeta").store.reload();
                                                                                    Ext.getCmp("storefrom").close();
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