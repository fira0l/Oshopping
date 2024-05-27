import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import admin1 from '../components/3Y5A6577.JPG'

import { AiOutlineMenuFold,AiOutlineMenuUnfold } from "react-icons/ai";
import { MdDashboard,  MdCategory} from "react-icons/md";
import { FaShoppingCart, FaUserFriends, FaClipboardCheck, } from "react-icons/fa";
import {Link} from 'react-router-dom';


import { useNavigate } from 'react-router-dom';


const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" style={{ backgroundColor: 'rgba(61, 169, 209, 0.85)' }}>
        <h2 className='text-white fs-5 text-center py-3 mb-0'>
          <span className='sm-logo'>OS</span>
          <span className='lg-logo'>The Bro Code</span>
        </h2>
      </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key}) => {
            if(key === 'signout') {

            }
            else
            {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <MdDashboard />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FaUserFriends  />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <FaShoppingCart  />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <FaShoppingCart />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <FaShoppingCart />,
                  label: 'Product List',
                },
                {
                  key: 'category',
                  icon: <MdCategory />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <MdCategory />,
                  label: 'Category List',
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardCheck />,
              label: 'Orders',
            }
            ,
            
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-2 pe-5'
          style={{
            padding: 0,
            backgroundColor: '#3DA9D1'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-3 align-items-center'>
            <div className='d-flex gap-3 align-items-center dropdown' >
              <div>
               <img
                width={32}
                height={32}
                src={admin1} 
                alt='' 
                />
              </div>
              <div   role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

                <h5 className='mb-0'>sena</h5> 
                <p className='mb-0'>senazeleke258@gmail.com</p>
              </div>

              <div 
                 className="dropdown-menu"
                 ariaLebelledBY="dropdownMenulink"
               >

                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/"
                    >
                      Signout
                    </Link>
                </li>

               </div>

            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
