Ext.define("js.updatepwd", {
    extend: "Ext.panel.Panel",
    initComponent: function () {
        var opername = document.getElementById("username").value;
        var me = this;
        Ext.apply(Ext.form.VTypes, {
            password: function (val, field) {//val指这里的文本框值，field指这个文本框组件，大家要明白这个意思
                if (field.confirmTo) {//confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
                    var pwd = Ext.getCmp("pass")
                    return (val == pwd.getValue());
                }
                return true;
            }
        }),
            Ext.apply(this, {
                closable: true,
                id: 'updatepwd',
                title: '修改密码',
                layout: {
                    type: 'hbox',
                    border: false,
                    pack: 'center'
                },
                items: [
                    {width: 300,
                        margin: '200 0 0 0',
                        xtype: "form",
                        defaults: {
                            xtype: "textfield",
                            labelWidth: 60,
                            border: false,
                            labelAlign: "right",
                            width: 280
                        },
                        items: [
                            {fieldLabel: '操作员', disabled: true, value: opername},
                            {name: 'to.operName', value: opername, hidden: true},
                            {fieldLabel: '请输入旧密码', name: 'to.pwd', inputType: 'password'},
                            {fieldLabel: '请输入新密码', name: 'oper.opername', id: 'pass', inputType: 'password'},
                            {fieldLabel: '确认新密码', vtype: "password", vtypeText: "两次密码不一致！", confirmTo: "pass", name: 'pass', inputType: 'password'},
                            {
                                xtype: "panel",
                                layout: "column",
                                border: false,
                                items: [
                                    {
                                        fieldLabel: "验证码",
                                        xtype: "textfield",
                                        name: 'Stringtext',
                                        labelWidth: 70,
                                        labelAlign: "right", columnWidth: .5
                                    },
                                    {
                                        xtype: "panel",
                                        border: false,
                                        html: "&nbsp;<img src='validCode.jsp' style='width: 75px;height: 24px' onclick='this.src=\"validCode.jsp?r=?\"+Math.random()'>",
                                        columnWidth: .5
                                    }
                                ]
                            }
                        ], buttonAlign: 'center',
                        buttons: [
                            { text: '登陆', handler: me.sumb },
                            { text: '重置',
                                handler: function () {
                                    this.up('form').getForm().reset();
                                } }
                        ]
                    }
                ]
            });
        this.callParent();
    }, sumb: function () {
        var form = this.up('form').getForm();
        if (form.isValid()) {
            form.submit({

                url: '/operpwd',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    if (msg.ishave) {

                        return;
                    }
                    ;
                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: "系统提示错误",
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }
});