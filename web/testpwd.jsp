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
    <link href="extjs/resources/css/xtheme-olive.css" rel="stylesheet"/>
    <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
    <script src="extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script src="js/updatepwd.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create('js.updatwpwd', {
                renderTo: Ext.getBody()

            }).center();
        });
    </script>
</head>
<body>
<%--<s:hidden value="%{#session.user.operName}" id="username"></s:hidden>--%>
<%--<s:hidden value="%{#session.user.operId}" id="userid"></s:hidden>--%>
</body>
</html>
