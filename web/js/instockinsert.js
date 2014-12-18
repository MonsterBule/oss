Ext.define('js.instockinsert', {
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
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === 'name') {
                                context.record.data.id = me.myCode;
                                context.record.data.name = me.myName;
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
                            }
                            if (context.field === "number") {
                                if (context.record.data.price) {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.number) {
                                    context.record.data.total = context.record.data.number * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.name && context.record.data.number && context.record.data.price) {
                                myStore.add({});
                            }
                            me.totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('money').setValue(me.totalmoney);
                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            title: '进货单',
            layout: 'vbox',
            id: 'instockinsert',
            closable: true,
            bbar: ['->',
                {
                    text: '提交', icon: 'images/tick.png',
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                        var tsdlist = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            tsdlist += 'tsdlist[' + index + '].merchandise.merchandiseId=' + item.data.id + '&tsdlist[' + index + '].price=' + item.data.price + '&tsdlist[' + index + '].num=' + item.data.number;
                            if (index != mydata.length - 1) {
                                tsdlist += '&';
                            }
                        });
                        Ext.getCmp('inform').submit({
                            url: '/insinsert?' + tsdlist,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                if (msg.ishave) {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: msg.mag,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.MessageBox.YES
                                    });
                                    Ext.getCmp("ingrid").store.reload();
                                    Ext.getCmp("inform").getForm().reset();
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
            ],
            items: [
                {
                    xtype: 'form',
                    width: "100%",
                    height: 120,

                    id: 'inform',
                    layout: 'column',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 70,
                        margin: "10 10 10 10",
                        labelAlign: 'right'
                    },
                    items: [
                        {xtype: 'combo', store: me.mysup, fieldLabel: '供应商名称', id: 't1', allowBlank: false, name: 'ts.supplier.supplierId', displayField: 'supplierName', valueField: 'supplierId', editable: false},
                        {xtype: 'combo', store: me.myoper, fieldLabel: '操作员', id: 't2', name: 'ts.oper.operId', allowBlank: false, displayField: 'operName', valueField: 'operId', editable: false},
                        {xtype: 'combo', store: me.type, fieldLabel: '入库方式', name: 'ts.inType', allowBlank: false, displayField: 'name', valueField: 'abbr', editable: false},
                        {fieldLabel: '入库时间', xtype: 'datefield', value: new Date(), format: 'Y-m-d H:i:s', name: 'ts.inTime', editable: false},
                        {fieldLabel: '经手人', allowBlank: false, name: 'ts.handler', maxLength: 20},
                        {fieldLabel: '入库金额', name: 'ts.totalMoney', id: 'money', readOnly: true},
                        {fieldLabel: '备注', name: 'ts.remark', xtype: 'textarea', width: 1200, maxLength: 150}
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    plugins: cellEditing,
                    id: "ingrid",
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore',
                        data: [
                            {}
                        ],
                        fields: [
                            'id', 'name', 'number', 'price', 'total'
                        ]
                    }),
                    columns: [
                        {
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            editor: {
                                xtype: 'combo', store: me.mymer, name: 'tsd.merchandise.merchandiseId', allowBlank: false, displayField: 'merchandiseName', valueField: 'merchandiseId', editable: false,
                                listeners: {
                                    select: function (combo, records) {
                                        me.myCode = this.value;
                                        me.myName = records[0].data.merchandiseName;
                                    }
                                }
                            },
                            dataIndex: 'name'
                        },
                        {
                            text: '数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 99,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'number'
                        },
                        {
                            text: '价格',
                            editor: new Ext.form.field.Number({
                                maxValue: 9999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});