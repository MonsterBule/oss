package com.shinowit.services;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-11.
 */
@Service
public class Instock {
    @Resource
    private BaseDAO<TMeInStockInfo> tsdao;
    @Resource
    private BaseDAO<TMeInStockDetailsInfo> tsddao;

    @Transactional
    public boolean insert(TMeInStockInfo t, List<TMeInStockDetailsInfo> tSDlist) {
        boolean result = false;
        try {
            String id = (String) tsdao.insert(t);
            for (TMeInStockDetailsInfo detail : tSDlist) {
                if (null != detail) {
                    detail.setBillcode(t);
                    tsddao.insert(detail);
                }
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public boolean delete(String ts) {
        boolean result = false;
        try {
            tsddao.executeHQL("delete from TMeInStockDetailsInfo where  billcode.billCode=?", ts);
            tsdao.executeHQL("delete from TMeInStockInfo where billCode=? ", ts);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public boolean update(TMeInStockInfo t, TMeInStockDetailsInfo tsd) {
        boolean result = false;
        try {
            tsdao.update(t);
            tsddao.update(tsd);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
