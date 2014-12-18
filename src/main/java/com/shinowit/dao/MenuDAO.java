package com.shinowit.dao;

/**
 * Created by Administrator on 2014/12/6.
 */

import com.shinowit.entity.TAuMenuinfo;
import com.shinowit.tree.TreeNode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MenuDAO {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(String operid, TreeNode parentNode) {
        Session session = sessionFactory.openSession();
        // String hql="from TAuMenuinfo s where s.parentid=?";
        String sql = "select distinct a.* from TAu_Menuinfo a inner join TAu_Authorization b on a.MenuID=b.MenuID inner join TAu_RoleInfo c on b.RoleID=c.RoleID inner join TAu_OperInfo d on c.RoleID=d.RoleID where a.parentid=? and d.OperID=?";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuinfo.class);
        query.setParameter(0, parentNode.getMenuinfo().getMenuId());
        query.setParameter(1, operid);
        List<TAuMenuinfo> moduleList = query.list();
        session.close();
        for (TAuMenuinfo module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfo(module);
            parentNode.addChild(node);
            querySubModule(operid, node);
        }
    }

    @Transactional
    public TreeNode queryModule(String operid) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql2 = "select distinct a.* from TAu_Menuinfo a inner join TAu_Authorization b on a.MenuID=b.MenuID inner join TAu_RoleInfo c on b.RoleID=c.RoleID inner join TAu_OperInfo d on c.RoleID=d.RoleID where a.parentid is null  and d.OperID=? and b.IsEnabled='true'";
        // String sql="select a.js,a.parentid,a.src,a.title,a.MenuID,a.tag from TAu_Menuinfo a inner join TAu_Authorization b on a.MenuID=b.MenuID where b.RoleID=? and b.IsEnabled='true' ";
        Query query = session.createSQLQuery(sql2).addEntity(TAuMenuinfo.class);
        query.setParameter(0, operid);
        List<TAuMenuinfo> modeleList = query.list();
        session.close();
        for (TAuMenuinfo module : modeleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfo(module);
            result.addChild(node);
            querySubModule(operid, node);
        }
        return result;
    }
}
