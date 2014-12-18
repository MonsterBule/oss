<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-11-11
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<% if (session.getAttribute("user") == null) {
    response.sendRedirect(request.getContextPath() + "/login.html");
}%>
<html>
<head>
    <title></title>
    <style type="text/css">
        #myFrom-innerCt {
            background-color: #d0d0d0
        }

        #panel-1025-innerCt {
            background-color: #d0d0d0
        }

        #panel-1028-innerCt {
            background-color: #d0d0d0
        }

        #panel-1050-innerCt {
            background-color: #d0d0d0
        }

        #panel-1010-innerCt {
            background-color: #d0d0d0
        }

        #jdbc-body {
            background-color: #d0d0d0
        }

        body {
            background-color: #3892d3
        }

        .part01 {
            width: 90%;
            height: 48px;
            margin-left: 10px;
            margin-top: 10px;
            margin-right: 10px;
        }

        .part01:hover {
            background: #83cbff
        }

        .part01 img {
            width: 48px;
            height: 48px;
            float: left;
            margin-right: 10px;
        }

        .con {
            width: auto;
            height: 48px;
            float: left
        }

        .con span {
            font: normal 12px/18px "";
            display: block;
            height: 18px
        }

        .con .con1 {
            width: auto;
            height: 30px;
        }
    </style>
    <link href="../extjs/resources/ext-theme-gray/ext-theme-gray-all.css" rel="stylesheet" type="text/css"/>
    <link href="../extjs/resources/css/ext-all-gray.css" rel="stylesheet"/>
    <script type="text/javascript" src="../extjs/ext-all-debug.js"></script>
    <script src="../js/index.js" type="text/javascript"></script>
    <script src="../extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create('shinow', {
                renderTo: Ext.getBody()
            }).center()
        });
    </script>
</head>
<body>
<s:hidden value="%{#session.user.operName}" id="username"></s:hidden>
<s:hidden value="%{#session.user.operId}" id="userid"></s:hidden>
</body>
</html>
