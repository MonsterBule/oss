Ext.define('js.outstockinsert', {
    extend: 'Ext.panel.Panel',
    outoper: Ext.create('Ext.data.Store', {
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
    outmer: Ext.create('Ext.data.Store', {
        id: 'price1',
        proxy: {
            type: 'ajax',
            url: '/merch',
            reader: {
                type: 'json',
                root: 'good_list'
            }
        }, fields: [
            {name: 'merchandiseName', type: 'string'},
            {name: 'price', type: 'string'},
            {name: 'chandise.avgPrice', type: 'string'},
            {name: 'merchandiseId', type: 'string'}
        ],
        autoLoad: true
    }),
    outtype: Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data: [
            {"abbr": 1, "name": "正常出库"},
            {"abbr": 2, "name": "盈亏"},
            {"abbr": 3, "name": "报损"}
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
                            var myStore = Ext.data.StoreManager.lookup('outStore');
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
                            if (context.field === 'name') {
                                if ((context.record.data.number) && (context.record.data.price)) {
                                    context.record.data.total = context.record.data.number * context.value;
                                }
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
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
                            Ext.getCmp('blank').setValue(me.totalmoney);
                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            title: '出货单',
            layout: 'vbox',
            id: 'outstockinsert',
            closable: true,
            bbar: [
                {
                    text: '提交', icon: 'images/tick.png',
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('outStore').data.items;
                        var tosdlist = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            tosdlist += 'tosdlist[' + index + '].chandise.merchandiseId=' + item.data.id + '&tosdlist[' + index + '].price=' + item.data.price + '&tosdlist[' + index + '].num=' + item.data.number + '&tosdlist[' + index + '].stockPrice=' + item.data.costprice;
                            if (index != mydata.length - 1) {
                                tosdlist += '&';
                            }
                        });
                        Ext.getCmp('outform').submit({
                            url: '/outinsert?' + tosdlist,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                if (msg.ishave) {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: msg.mag,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.MessageBox.YES
                                    });
                                    Ext.getCmp("outstockinsertGrid").store.reload();
                                    Ext.getCmp("outform").getForm().reset();
                                    return;
                                }
                                Ext.MessageBox.show({
                                    title: '系统提示',
                                    msg: msg.mag,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            }, failure: function (form, action) {
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
                    //height: 80,
                    width: "100%",
                    height: 120,
                    id: 'outform',
                    layout: 'column',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 80,
                        margin: "10 10 10 10",
                        labelAlign: 'right'
                    },
                    items: [
                        {xtype: 'combo', store: me.outoper, fieldLabel: '操作员', name: 'tos.oper.operId', allowBlank: false, displayField: 'operName', valueField: 'operId', editable: false},
                        {xtype: 'combo', store: me.outtype, fieldLabel: '出库方式', name: 'tos.outType', displayField: 'name', valueField: 'abbr', editable: false},
                        {fieldLabel: '经手人', allowBlank: false, name: 'tos.handler', maxLength: 20},
                        {fieldLabel: '出库时间', xtype: 'datefield', value: new Date(), name: 'tos.outTime', format: 'Y-m-d H:i:s', editable: false},
                        {fieldLabel: '出库金额', allowBlank: false, name: 'tos.totalMoney', id: 'blank', editable: false},
                        {fieldLabel: '备注', allowBlank: false, name: 'tos.remark', xtype: 'textarea', width: 1200, maxLength: 150}
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    id: 'outstockinsertGrid',
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'outStore',
                        data: [
                            {}
                        ],
                        fields: [
                            'id', 'name', 'number', 'price', 'total', 'costprice'
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
                                xtype: 'combo', store: me.outmer, name: 'tos.merchandise.merchandiseId', allowBlank: false, displayField: 'merchandiseName', valueField: 'merchandiseId',
                                listeners: {
                                    'select': function (combo, record, index) {
                                        me.myCode = this.value;
                                        me.myName = record[0].data.merchandiseName;
                                        for (var a = 0, b = combo.store.data.items.length; a < b; a++) {
                                            if (combo.store.data.items[a].data.merchandiseId === combo.value) {
                                                var goodprice = combo.store.data.items[a].data.price;
                                                Ext.Ajax.request({
                                                    url: '/avgprice?chandiseId=' + combo.value,
                                                    async: false,
                                                    success: function (response) {
                                                        avgprice = Ext.JSON.decode(response.responseText);
                                                    }
                                                });
                                                var avgprice = avgprice.tslist[0].avgPrice;
                                                var record = Ext.getCmp('outstockinsertGrid').getSelectionModel().getSelection()[0];
                                                record.data.price = goodprice;
                                                record.data.costprice = avgprice;
                                            }
                                        }
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
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        },
                        {
                            text: '进货成本',
                            dataIndex: 'costprice'
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});