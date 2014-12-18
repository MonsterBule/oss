package com.shinowit.services;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuRoleInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-11.
 */
@Service
public class RoleAuthorization {
    @Resource
    private BaseDAO<TAuAuthorization> authorizationdao;
    @Resource
    private BaseDAO<TAuRoleInfo> roledao;

    @Transactional
    public boolean insert(TAuRoleInfo role, List<TAuAuthorization> authorizations) {
        boolean result = false;
        roledao.insert(role);
        for (TAuAuthorization a : authorizations) {
            if (a != null) {
                a.setIsEnabled(true);
                a.setRole(role);
                authorizationdao.insert(a);
            }
        }
        result = true;
        return result;
    }

    @Transactional
    public boolean delete(String ts) {
        boolean result = false;
        try {
            authorizationdao.executeHQL("delete from TMeInStockDetailsInfo where  billcode.billCode=?", ts);
            roledao.executeHQL("delete from TMeInStockInfo where billCode=? ", ts);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public boolean update(TAuRoleInfo role, List<TAuAuthorization> authorizations) {
        boolean result = false;
        try {
            roledao.update(role);
            authorizationdao.executeHQL("delete from TAuAuthorization where role.roleId=? ", role.getRoleId());
            for (TAuAuthorization a : authorizations) {
                if (a != null) {
                    a.setIsEnabled(true);
                    a.setRole(role);
                    authorizationdao.insert(a);
                }
            }
//            roledao.update(role);
//            for(TAuAuthorization a : authorizations){
//                if (a != null) {
//                        a.setIsEnabled(true);
//                    a.setRole(role);
//                    authorizationdao.update(a);
//                }
//            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
