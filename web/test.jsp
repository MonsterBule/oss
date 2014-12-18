<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-11-11
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
    <style type="text/css">

    </style>
    <link href="extjs/resources/ext-theme-gray/ext-theme-gray-all.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
    <script src="extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.apply(Ext.form.VTypes, {
                password: function (val, field) {//val指这里的文本框值，field指这个文本框组件，大家要明白这个意思
                    if (field.confirmTo) {//confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
                        var pwd = Ext.getCmp("pass1")
                        return (val == pwd.getValue());
                    }
                    return true;
                }
            });
            Ext.create('Ext.window.Window', {

                title: 'nihao',
                border: false,
                items: [
                    {
                        layout: 'form',
                        xtype: 'form',
                        width: 280,
                        frame: true,
                        defaults: {
                            xtype: 'textfield'

                        },
                        items: [
                            {fieldLabel: "sdf",
                                id: "sf"
                            },
                            {fieldLabel: "密码",
                                id: "pass1"
                            },
                            {
                                fieldLabel: "确认密码",
                                id: "pass2",
                                vtype: "password",//自定义的验证类型
                                vtypeText: "两次密码不一致！",
                                confirmTo: "pass1"//要比较的另外一个的组件的id
                            }
                        ]
                    }
                ]

            }).show();
        });
    </script>
</head>
<body>
<%--<s:hidden value="%{#session.user.operName}" id="username"></s:hidden>--%>
<%--<s:hidden value="%{#session.user.operId}" id="userid"></s:hidden>--%>
</body>
</html>
