package com.shinowit.dao;

/**
 * Created by Administrator on 2014/12/6.
 */

import com.shinowit.entity.TAuMenuinfo;
import com.shinowit.tree.TreeNodeChecked;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TreeCheckedDAO {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNodeChecked parentNode) {
        Session session = sessionFactory.openSession();
        // String hql="from TAuMenuinfo s where s.parentid=?";
        String sql = "select  a.* from TAu_Menuinfo a  where a.parentid=? ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuinfo.class);
        query.setParameter(0, parentNode.getMenuinfo().getMenuId());

        List<TAuMenuinfo> moduleList = query.list();
        session.close();
        for (TAuMenuinfo module : moduleList) {
            TreeNodeChecked node = new TreeNodeChecked();
            node.setMenuinfo(module);
            parentNode.addChild(node);
            querySubModule(node);
        }
    }

    @Transactional
    public TreeNodeChecked queryModule() {
        TreeNodeChecked result = new TreeNodeChecked();
        Session session = sessionFactory.openSession();
        String sql2 = "select  a.* from TAu_Menuinfo a where a.parentid is null";
        // String sql="select a.js,a.parentid,a.src,a.title,a.MenuID,a.tag from TAu_Menuinfo a inner join TAu_Authorization b on a.MenuID=b.MenuID where b.RoleID=? and b.IsEnabled='true' ";
        Query query = session.createSQLQuery(sql2).addEntity(TAuMenuinfo.class);

        List<TAuMenuinfo> modeleList = query.list();
        session.close();
        for (TAuMenuinfo module : modeleList) {
            TreeNodeChecked node = new TreeNodeChecked();
            node.setMenuinfo(module);
            result.addChild(node);
            querySubModule(node);
        }
        return result;
    }
}
