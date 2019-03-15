// 需要控制权限的路由--会作为菜单渲染
export const appRoutes = [
  /* 景区系统后台管理菜单-中心（环球雅图版本）-路由 */
  {
    path: '/ticket-management',
    icon: 'pricetag',
    name: 'ticketmanagement',
    title: '票务管理',
    meta: {
      dutyId: 10251
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/ticket-message-setting',
        title: '票种设置',
        name: 'ticket-message-setting',
        meta: {
          dutyId: 649
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'base-ticket',
            title: '基础票种',
            name: 'base-ticket',
            meta: {
              dutyId: 650
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/base-ticket/base-ticket.vue'),
          },
          {
            path: 'group-ticket',
            title: '组合套票',
            name: 'group-ticket',
            meta: {
              dutyId: 651
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/group-ticket/group-ticket.vue'),
          },
          // {
          //     path: 'price-bygroup',
          //     title: '价格分组',
          //     name: 'price-bygroup',
          //     meta: {
          //         dutyId: 1033
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-message-setting/price-bygroup/price-bygroup.vue'),
          // },
          // {
          //     path: 'service-price-bygroup',
          //     title: '服务商价格分组',
          //     name: 'service-price-bygroup',
          //     meta: {
          //         dutyId: 1167
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-message-setting/service-price-bygroup/service-price-bygroup.vue'),
          // },
          // {
          //     path: 'sales-code-list',
          //     title: '票销售代码表',
          //     name: 'sales-code-list',
          //     meta: {
          //         dutyId: 652
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-message-setting/sales-code-list/sales-code-list.vue'),
          // },
          {
            path: 'refund-rules-management',
            title: '退票规则',
            name: 'refund-rules-management',
            meta: {
              dutyId: 653
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/refund-rules-management/refund-rules-management.vue'),
          }
        ]
      },
      {
        path: '/ticket-sales-setting',
        title: '销售设置',
        name: 'ticket-sales-setting',
        meta: {
          dutyId: 657
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'ticket-station-management',
            title: '站点管理',
            name: 'ticket-station-management',
            meta: {
              dutyId: 658
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/ticket-station-management.vue'),
          },
          {
            path: 'ticket-window-management',
            title: '窗口管理',
            name: 'ticket-window-management',
            meta: {
              dutyId: 659
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/ticket-window-management.vue'),
          },
          {
            path: 'employee-sales-access',
            title: '营销权限',
            name: 'employee-sales-access',
            meta: {
              dutyId: 697
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/employee-sales-access.vue'),
          },
          // {
          //     path: 'ticket-params-management',
          //     title: '订票信息参数管理',
          //     name: 'ticket-params-management',
          //     meta: {
          //         dutyId: 1028
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-sales-setting/ticket-params-management.vue'),
          // },
        ]
      },
      {
        path: '/ticket-check-setting',
        title: '检票设置',
        name: 'ticket-check-setting',
        meta: {
          dutyId: 661
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'gardendoor-management',
            title: '景区园门管理',
            name: 'gardendoor-management',
            meta: {
              dutyId: 662
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/gardendoor-management.vue'),
          },
          {
            path: 'entry-equipment-management',
            title: '准进设备管理',
            name: 'entry-equipment-management',
            meta: {
              dutyId: 663
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/entry-equipment-management.vue'),
          },
          {
            path: 'check-setting-management',
            title: '检票规则管理',
            name: 'check-setting-management',
            meta: {
              dutyId: 664
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/check-setting-management.vue'),
          },
          // {
          //     path: 'node-manage',
          //     title: '验票节点管理',
          //     name: 'node-manage',
          //     meta: {
          //         dutyId: 99991
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-check-setting/node-manage.vue'),
          // },
          // {
          //     path: 'admission-plan-manage',
          //     title: '入园预案管理',
          //     name: 'admission-plan-manage',
          //     meta: {
          //         dutyId: 10293
          //     },
          //     component: () =>
          //         import ('@/views/ticket-management/ticket-check-setting/admission-plan-manage.vue'),
          // },
          {
            path: 'admin-face-manage',
            title: '员工身份管理',
            name: 'admin-face-manage',
            meta: {
              dutyId: 10324
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/admin-face-manage.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/EB-management',
    icon: 'android-cart',
    name: 'EBmanagement',
    title: '电商管理',
    meta: {
      dutyId: 10255
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/phone-message',
        title: '短信通知',
        name: 'phone-message',
        meta: {
          dutyId: 837
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'message-management',
            title: '信息管理',
            name: 'message-management',
            meta: {
              dutyId: 838
            },
            component: () =>
              import ('@/views/EB-management/phone-message/message-management/message-management.vue'),
          },
          {
            path: 'message-send-control',
            title: '短信发送控制',
            name: 'message-send-control',
            meta: {
              dutyId: 839
            },
            component: () =>
              import ('@/views/EB-management/phone-message/message-send-control/message-send-control.vue'),
          }
        ]
      },
      // {
      //     path: '/regulatory-inspector',
      //     title: '监管督查',
      //     name: 'regulatory-inspector',
      //     meta: {
      //         dutyId: 994
      //     },
      //     component: () =>
      //         import ('@/views/EB-management/EB-management-main.vue'),
      //     children: [
      //
      //         {
      //             path: 'unsubscribe-notice',
      //             title: '退订通知查询',
      //             name: 'unsubscribe-notice',
      //             meta: {
      //                 dutyId: 10320
      //             },
      //             component: () =>
      //                 import ('@/views/EB-management/regulatory-inspector/unsubscribe-notice.vue')
      //         },
      //         // {
      //         //     path: 'station-message',
      //         //     title: '站内短信公告',
      //         //     name: 'station-message',
      //         //     meta: {
      //         //         dutyId: 996
      //         //     },
      //         //     component: () =>
      //         //         import ('@/views/EB-management/regulatory-inspector/station-message/station-message.vue'),
      //         // }
      //     ]
      // },
      {
        path: '/webmessage-management',
        title: 'PC商城管理',
        name: 'webmessage-management',
        meta: {
          dutyId: 840
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'url-manage',
            title: '域名管理',
            name: 'url-manage',
            meta: {
              dutyId: 10289
            },
            component: () =>
              import ('@/views/system-manage/url-manage/url-manage.vue')
          },
          {
            path: 'user-center-menu',
            icon: 'compose',
            name: 'user-center-menu',
            title: '用户中心菜单',
            meta: {
              dutyId: 716
            },
            component: () =>
              import ('@/views/online-user-manage/user-center-menu/user-center-menu.vue')
          },
          {
            path: 'column-management',
            title: '网站栏目管理',
            name: 'column-management',
            meta: {
              dutyId: 843
            },
            component: () =>
              import ('@/views/EB-management/webmessage-management/column-management/column-management.vue'),
          },
          {
            path: 'article-management/:id',
            title: '栏目文章管理',
            name: 'article-management',
            meta: {
              dutyId: 844
            },
            component: () =>
              import ('@/views/EB-management/webmessage-management/article-management/article-management.vue'),
          },
          {
            path: 'swiper-manage',
            title: '首页轮播图管理',
            name: 'swiper-manage',
            meta: {
              dutyId: 10292
            },
            component: () =>
              import ('@/views/system-manage/swiper-manage/swiper-manage.vue')
          }, {
            path: 'image-manage',
            title: '首页风景图管理',
            name: 'image-manage',
            meta: {
              dutyId: 10290
            },
            component: () =>
              import ('@/views/system-manage/image-manage/image-manage.vue')
          },
          {
            path: 'video-manage',
            title: '视频管理',
            name: 'video-manage',
            meta: {
              dutyId: 10291
            },
            component: () =>
              import ('@/views/system-manage/video-manage/video-manage.vue')
          },
          // {
          //     path: 'friendship-connection',
          //     title: '友情链接管理',
          //     name: 'friendship-connection',
          //     meta: {
          //         dutyId: 841
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/friendship-connection/friendship-connection.vue'),
          // },
          // {
          //     path: 'advertising-management',
          //     title: '广告管理',
          //     name: 'advertising-management',
          //     meta: {
          //         dutyId: 842
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/advertising-management/advertising-management.vue'),
          // },
          // {
          //     path: 'unreviewed-comments',
          //     title: '未审核评论',
          //     name: 'unreviewed-comments',
          //     meta: {
          //         dutyId: 845
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/unreviewed-comments/unreviewed-comments.vue'),
          // },
          // {
          //     path: 'reviewed-comments',
          //     title: '已审核评论',
          //     name: 'reviewed-comments',
          //     meta: {
          //         dutyId: 846
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/reviewed-comments/reviewed-comments.vue'),
          // },
          // {
          //     path: 'unreviewed-message',
          //     title: '未审核留言',
          //     name: 'unreviewed-message',
          //     meta: {
          //         dutyId: 847
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/unreviewed-message/unreviewed-message.vue'),
          // },
          // {
          //     path: 'reviewed-message',
          //     title: '已审核留言',
          //     name: 'reviewed-message',
          //     meta: {
          //         dutyId: 848
          //     },
          //     component: () =>
          //         import ('@/views/EB-management/webmessage-management/reviewed-message/reviewed-message.vue'),
          // }
        ]
      },
      {
        path: '/mobile-management',
        title: '移动商城管理',
        name: 'mobile-management',
        meta: {
          dutyId: 10325
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'micro-mall',
            title: '微商城配置',
            name: 'add-micro-mall',
            meta: {
              dutyId: 10321
            },
            component: () =>
              import ('@/views/system-manage/micro-mall/micro-mall.vue')
          },
          {
            path: 'shuffling-management',
            title: '首页轮播图管理',
            name: 'shuffling-management',
            meta: {
              dutyId: 10293 // ----
            },
            component: () =>
              import ('@/views/EB-management/shuffling-management/shuffling-management.vue')
          }
        ]
      },
      {
        path: '/online-user-manage',
        icon: 'earth',
        title: '用户管理',
        name: 'online-user-manage',
        meta: {
          dutyId: 715
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'user-center-role',
            icon: 'pound',
            name: 'user-center-role',
            title: '用户权限管理',
            meta: {
              dutyId: 717
            },
            component: () =>
              import ('@/views/online-user-manage/user-center-role/user-center-role.vue')
          },
          {
            path: 'FIT-user-manage',
            icon: 'pound',
            name: 'FIT-user-manage',
            title: '散客用户管理',
            meta: {
              dutyId: 718
            },
            component: () =>
              import ('@/views/online-user-manage/FIT-user-manage/FIT-user-manage.vue')
          },
          {
            path: 'system-all-user',
            icon: 'pound',
            name: 'system-all-user',
            title: '系统用户总数',
            meta: {
              dutyId: 726
            },
            component: () =>
              import ('@/views/online-user-manage/system-all-user/system-all-user.vue')
          },
          // {
          //     path: 'travelbureau-user-manage',
          //     icon: 'pound',
          //     name: 'travelbureau-user-manage',
          //     title: '旅行社用户管理',
          //     meta: {
          //         dutyId: 719
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/travelbureau-user-manage/travelbureau-user-manage.vue')
          // },
          // {
          //     path: 'guide-user-manage',
          //     icon: 'pound',
          //     name: 'guide-user-manage',
          //     title: '导游用户管理',
          //     meta: {
          //         dutyId: 1016
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/guide-user-manage/guide-user-manage.vue')
          // },
          // {
          //     path: 'guide-user-register',
          //     icon: 'pound',
          //     name: 'guide-user-register',
          //     meta: {
          //         dutyId: 720
          //     },
          //     title: '导游用户注册',
          //     component: () =>
          //         import ('@/views/online-user-manage/guide-user-register/guide-user-register.vue')
          // },
          // {
          //     path: 'reception-user-inquiry',
          //     icon: 'pound',
          //     name: 'reception-user-inquiry',
          //     title: '接待用户管理',
          //     meta: {
          //         dutyId: 721
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/reception-user-inquiry/reception-user-inquiry.vue')
          // },
          // {
          //     path: 'system-new-user',
          //     icon: 'pound',
          //     name: 'system-new-user',
          //     title: '系统新增用户数',
          //     meta: {
          //         dutyId: 727
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/system-new-user/system-new-user.vue')
          // },
          // {
          //     path: 'blacklist-manage',
          //     icon: 'pound',
          //     name: 'blacklist-manage',
          //     title: '黑名单管理',
          //     meta: {
          //         dutyId: 1058
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/blacklist-manage/blacklist-manage.vue')
          // }
        ]
      }
    ]
  },
  {
    path: '/distribution-management',
    icon: 'person-stalker',
    name: 'distribution-management',
    title: '分销管理',
    meta: {
      dutyId: 10298
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/distributor-management',
        title: '分销商管理',
        name: 'distributor-management',
        meta: {
          dutyId: 10302
        },
        component: () =>
          import ('@/views/distribution-management/distributor-management.vue')
      },
      {
        path: '/distribution-bygroup',
        title: '分销商分组管理',
        name: 'distribution-bygroup',
        meta: {
          dutyId: 10303
        },
        component: () =>
          import ('@/views/distribution-management/distribution-bygroup.vue')
      },
      // {
      //     path: '/group-type',
      //     title: '分组类别',
      //     name: 'group-type',
      //     meta: {
      //         dutyId: 99995
      //     },
      //     component: () =>
      //         import ('@/views/distribution-management/group-type.vue')
      // },
    ]
  },
  {
    path: '/tourcard',
    icon: 'android-image',
    name: 'tourcard',
    title: '旅游卡管理',
    meta: {
      dutyId: 10282
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/tourcard-main',
        title: '旅游卡',
        name: 'tourcard-main',
        meta: {
          dutyId: 10283
        },
        component: () =>
          import ('@/views/tourcard/tourcard-card/tourcard-main.vue'),
        children: [{
            path: 'tourcard-card',
            title: '旅游卡',
            name: 'tourcard-card',
            meta: {
              dutyId: 10284
            },
            component: () =>
              import ('@/views/tourcard/tourcard-card/tourcard-card/tourcard-card.vue'),
          },
          {
            path: 'tourcard-detail',
            title: '旅游卡明细',
            name: 'tourcard-detail',
            meta: {
              dutyId: 10285
            },
            component: () =>
              import ('@/views/tourcard/tourcard-card/tourcard-detail/tourcard-detail.vue')
          }
        ]
      },
      {
        path: 'tourcard-saleOrder',
        title: '旅游卡销售订单',
        name: 'tourcard-saleOrder',
        meta: {
          dutyId: 10286
        },
        component: () =>
          import ('@/views/tourcard/tourcard-saleOrder/tourcard-saleOrder.vue')
      },
      {
        path: 'tourcard-bindUser',
        title: '旅游卡绑定用户',
        name: 'tourcard-bindUser',
        meta: {
          dutyId: 10288
        },
        component: () =>
          import ('@/views/tourcard/tourcard-bindUser/tourcard-bindUser.vue')
      },
      {
        path: 'tourcard-gardenOrder',
        title: '旅游卡入园订单',
        name: 'tourcard-gardenOrder',
        meta: {
          dutyId: 10287
        },
        component: () =>
          import ('@/views/tourcard/tourcard-gardenOrder/tourcard-gardenOrder.vue')
      }
    ]
  },
  {
    path: 'order-manage',
    icon: 'android-document',
    title: '订单管理',
    name: 'order-manage',
    meta: {
      dutyId: 10326
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/online-order',
        title: '线上订单',
        name: 'onlineorder',
        meta: {
          dutyId: 728
        },
        component: () =>
          import ('@/views/online-order/order-manage.vue'),
        children: [{
            path: '/reservation-order-search',
            title: '订单查询',
            name: 'reservation-order-search',
            meta: {
              dutyId: 729
            },
            component: () =>
              import ('@/views/online-order/reservation-order-search.vue')
          },
          // {
          //   path: '/order-detail-search',
          //   title: '订单查询',
          //   name: 'order-detail-search',
          //   meta: {
          //     dutyId: 729
          //   },
          //   component: () =>
          //     import ('@/views/online-order/orderDetail/index.vue')
          // },
          {
            path: '/modify-order-search',
            title: '修改订单游览日期/密码',
            name: 'modify-order-search',
            meta: {
              dutyId: 737
            },
            component: () =>
              import ('@/views/online-order/modify-order-search.vue')
          },
          // {
          //     path: '/hotel-order-management',
          //     title: '酒店订单管理',
          //     name: 'hotel-order-management',
          //     meta: {
          //         dutyId: 730
          //     },
          //     component: () =>
          //         import ('@/views/online-order/hotel-order-management.vue')
          // },
          // {
          //     path: '/product-order-management',
          //     title: '商品订单管理',
          //     name: 'product-order-management',
          //     meta: {
          //         dutyId: 731
          //     },
          //     component: () =>
          //         import ('@/views/online-order/product-order-management.vue')
          // },
          // {
          //     path: '/detail-statistics',
          //     title: '出票订单明细统计',
          //     name: 'detail-statistics',
          //     meta: {
          //         dutyId: 736
          //     },
          //     component: () =>
          //         import ('@/views/online-order/detail-statistics.vue')
          // },
          // {
          //     path: '/order-member-search',
          //     title: '订单成员信息查询',
          //     name: 'order-member-search',
          //     meta: {
          //         dutyId: 1074
          //     },
          //     component: () =>
          //         import ('@/views/online-order/order-member-search.vue')
          // }
        ]
      },
      {
        path: '/offline-order',
        title: '线下订单',
        name: 'offlineorder',
        meta: {
          dutyId: 10327
        },
        component: () =>
          import ('@/views/online-order/offline-order/offline-order.vue')
      }
    ]
  },
  // {
  //     path: '/stock-manage',
  //     icon: 'earth',
  //     title: '库存管理',
  //     name: 'stockmanage',
  //     meta: {
  //         dutyId: 10253
  //     },
  //     component: () =>
  //         import ('@/views/Main.vue'),
  //     children: [{
  //             path: '/stock-manage-main',
  //             title: '库存管理',
  //             name: 'stock-manage-main',
  //             meta: {
  //                 dutyId: 1084
  //             },
  //             component: () =>
  //                 import ('@/views/stock-manage/stock-manage-main.vue'),
  //             children: [{
  //                     path: 'stock-manage',
  //                     name: 'stock-manage',
  //                     title: '库存管理',
  //                     meta: {
  //                         dutyId: 1085
  //                     },
  //                     component: () =>
  //                         import ('@/views/stock-manage/stock-manage/stock-manage.vue')
  //                 },
  //                 {
  //                     path: 'user-stock-manage',
  //                     name: 'user-stock-manage',
  //                     title: '用户库存管理',
  //                     meta: {
  //                         dutyId: 10001
  //                     },
  //                     component: () =>
  //                         import ('@/views/stock-manage/user-stock-manage/user-stock-manage.vue')
  //                 }
  //             ]
  //         },
  //         {
  //             path: '/yzp-stock-manage-main',
  //             title: '预制票库存管理',
  //             name: 'yzp-stock-manage-main',
  //             meta: {
  //                 dutyId: 670
  //             },
  //             component: () =>
  //                 import ('@/views/stock-manage/stock-manage-main.vue'),
  //             children: [{
  //                 path: 'storehouse-manage',
  //                 name: 'storehouse-manage',
  //                 title: '仓库管理',
  //                 meta: {
  //                     dutyId: 671
  //                 },
  //                 component: () =>
  //                     import ('@/views/stock-manage/storehouse-manage/storehouse-manage.vue')
  //             }]
  //         }
  //     ]
  // },
  {
    path: '/statistics-report', // ????
    icon: 'pie-graph',
    title: '报表统计',
    name: 'statistics-report',
    meta: {
      dutyId: 10254 // ----
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
      path: 'statistics-report-main',
      title: '报表统计',
      name: 'statistics-report-main',
      meta: {
        dutyId: 10254
      },
      component: () =>
        import ('@/views/statistics-report/statistics-report-main.vue')
    }]
  },
  {
    path: '/system-manage',
    icon: 'android-settings',
    name: 'system-manage',
    title: '系统管理',
    meta: {
      dutyId: 10257
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/base-info',
        name: 'base-info',
        title: '基础信息',
        meta: {
          dutyId: 10328
        },
        component: () =>
          import ('@/views/system-manage/system-manage-main.vue'),
        children: [{
            path: 'company-manage',
            title: '企业信息',
            name: 'company-manage',
            meta: {
              dutyId: 638
            },
            component: () =>
              import ('@/views/system-manage/company-manage/company-manage.vue')
          },
          {
            path: 'scenic-service-set',
            icon: 'compose',
            name: 'scenic-service-set',
            title: '景区信息',
            meta: {
              dutyId: 630
            },
            component: () =>
              import ('@/views/scenic-service/scenic-service-set/scenic-service-set.vue')
          }
        ]
      },
      {
        path: '/system-set',
        icon: 'android-settings',
        name: 'system-set',
        title: '系统配置',
        meta: {
          dutyId: 3
        },
        component: () =>
          import ('@/views/system-manage/system-manage-main.vue'),
        children: [
          // {
          //     path: 'distributor-manage',
          //     title: '分销商管理',
          //     name: 'distributor-manage',
          //     meta: {
          //         dutyId: 1153
          //     },
          //     component: () =>
          //         import ('@/views/system-manage/distributor-manage/distributor-manage.vue')
          // },

          {
            path: 'duty-manage',
            title: '菜单管理',
            name: 'duty-manage',
            meta: {
              dutyId: 623
            },
            component: () =>
              import ('@/views/system-manage/duty-manage/duty-manage.vue')
          },
          // {
          //     path: 'company-and-scenicSpot',
          //     title: '企业与景区关联',
          //     name: 'company-and-scenicSpot',
          //     meta: {
          //         dutyId: 10233
          //     },
          //     component: () =>
          //         import ('@/views/system-manage/company-and-scenicSpot/company-and-scenicSpot.vue')
          // },
          {
            path: 'post-manage',
            title: '岗位管理',
            name: 'post-manage',
            meta: {
              dutyId: 624
            },
            component: () =>
              import ('@/views/system-manage/post-manage/post-manage.vue')
          },
          {
            path: 'sys-param-manage',
            title: '系统参数管理',
            name: 'sys-param-manage',
            meta: {
              dutyId: 625
            },
            component: () =>
              import ('@/views/system-manage/sys-param-manage/sys-param-manage.vue')
          },
          {
            path: 'device-type',
            icon: 'pound',
            name: 'device-type',
            title: '设备类型管理',
            meta: {
              dutyId: 631
            },
            component: () =>
              import ('@/views/scenic-service/device-type/device-type.vue')
          },
          {
            path: 'equipment-state',
            title: '设备状态查询',
            name: 'equipment-state',
            meta: {
              dutyId: 995
            },
            component: () =>
              import ('@/views/EB-management/regulatory-inspector/equipment-state/equipment-state.vue')
          },
          {
            path: 'business-type',
            icon: 'pound',
            name: 'business-type',
            title: '业务类型管理',
            meta: {
              dutyId: 632
            },
            component: () =>
              import ('@/views/scenic-service/business-type/business-type.vue')
          },
          {
            path: 'crowd-types',
            icon: 'pound',
            name: 'crowd-types',
            title: '人群种类设置',
            meta: {
              dutyId: 633
            },
            component: () =>
              import ('@/views/scenic-service/crowd-types/crowd-types.vue')
          },
          // {
          //     path: 'Ectripxml-manage',
          //     title: 'Ectripxml管理',
          //     name: 'Ectripxml-manage',
          //     meta: {
          //         dutyId: 626
          //     },
          //     component: () =>
          //         import ('@/views/system-manage/Ectripxml-manage/Ectripxml-manage.vue')
          // },
          {
            path: 'ticket-print-set',
            title: '门票打印信息配置',
            name: 'ticket-print-set',
            meta: {
              dutyId: 10236
            },
            component: () =>
              import ('@/views/system-manage/ticket-print-set/ticket-print-set.vue')
          },
          {
            path: 'J-ticket-print-set',
            icon: 'pound',
            name: 'J-ticket-print-set',
            title: '票务打印管理',
            meta: {
              dutyId: 635
            },
            component: () =>
              import ('@/views/scenic-service/J-ticket-print-set/J-ticket-print-set.vue')
          },
          {
            path: 'service-refund-rules',
            icon: 'pound',
            name: 'service-refund-rules',
            title: '服务商退票规则管理',
            meta: {
              dutyId: 10177
            },
            component: () =>
              import ('@/views/scenic-service/service-refund-rules/service-refund-rules.vue')
          },
          {
            path: 'origin-manage',
            icon: 'pound',
            name: 'origin-manage',
            title: '客源地管理',
            meta: {
              dutyId: 1000
            },
            component: () =>
              import ('@/views/scenic-service/origin-manage/origin-manage.vue')
          },
          {
            path: 'consumer-notice',
            title: '消费通知查询',
            name: 'consumer-notice',
            meta: {
              dutyId: 10249
            },
            component: () =>
              import ('@/views/EB-management/regulatory-inspector/consumer-notice/consumer-notice.vue')
          },
          {
            path: 'unsubscribe-notice',
            title: '退订通知查询',
            name: 'unsubscribe-notice',
            meta: {
              dutyId: 10320
            },
            component: () =>
              import ('@/views/EB-management/regulatory-inspector/unsubscribe-notice.vue')
          },
          {
            path: 'data-synchronizate',
            title: '中心数据手动同步',
            name: 'data-synchronizate',
            meta: {
              dutyId: 10338
            },
            component: () =>
              import ('@/views/EB-management/regulatory-inspector/data-synchronizate.vue')
          },
          {
            path: 'data-synchronization',
            title: '本地数据手动同步',
            name: 'data-synchronization',
            meta: {
              dutyId: 10345
            },
            component: () =>
              import ('@/views/EB-management/regulatory-inspector/data-synchronization.vue')
          },
          {
            path: 'terminal-manage',
            title: '终端管理',
            name: 'terminal-manage',
            meta: {
              dutyId: 10344
            },
            component: () =>
              import('@/views/system-manage/terminal-manage/terminal-manage.vue')
          }
        ]
      },
      // {
      //     path: '/scenic-service',
      //     icon: 'earth',
      //     title: '景区服务商管理',
      //     name: 'scenicservice',
      //     meta: {
      //         dutyId: 629
      //     },
      //     component: () =>
      //         import ('@/views/system-manage/system-manage-main.vue'),
      //     children: [
      //         {
      //             path: 'exchange-rules',
      //             icon: 'pound',
      //             name: 'exchange-rules',
      //             title: '票号规则管理',
      //             meta: {
      //                 dutyId: 634
      //             },
      //             component: () =>
      //                 import ('@/views/scenic-service/exchange-rules/exchange-rules.vue')
      //         },
      //         // {
      //         //     path: 'coupon-print-set',
      //         //     icon: 'pound',
      //         //     name: 'coupon-print-set',
      //         //     title: '副券打印设置',
      //         //     meta: {
      //         //         dutyId: 99995
      //         //     },
      //         //     component: () =>
      //         //         import ('@/views/scenic-service/coupon-print-set/coupon-print-set.vue')
      //         // },
      //         // {
      //         //     path: 'invoice-print-set',
      //         //     icon: 'pound',
      //         //     name: 'invoice-print-set',
      //         //     title: '发票打印设置',
      //         //     meta: {
      //         //         dutyId: 1045
      //         //     },
      //         //     component: () =>
      //         //         import ('@/views/scenic-service/invoice-print-set/invoice-print-set.vue')
      //         // }
      //     ]
      // },
      // {
      //     path: '/syslog-manage',
      //     icon: 'earth',
      //     title: '日志管理',
      //     name: 'syslogmanage',
      //     meta: {
      //         dutyId: 639
      //     },
      //     component: () =>
      //         import ('@/views/system-manage/system-manage-main.vue'),
      //     children: [{
      //             path: 'orderlog',
      //             icon: 'compose',
      //             name: 'orderlog',
      //             title: '订单日志管理',
      //             meta: {
      //                 dutyId: 642
      //             },
      //             component: () =>
      //                 import ('@/views/syslog-manage/orderlog/orderlog.vue')
      //         },
      //         {
      //             path: 'backstagelog',
      //             icon: 'pound',
      //             name: 'backstagelog',
      //             title: '后台日志管理',
      //             meta: {
      //                 dutyId: 640
      //             },
      //             component: () =>
      //                 import ('@/views/syslog-manage/backstagelog/backstagelog.vue')
      //         },
      //         {
      //             path: 'stagelog',
      //             icon: 'pound',
      //             name: 'stagelog',
      //             title: '前台日志管理',
      //             meta: {
      //                 dutyId: 641
      //             },
      //             component: () =>
      //                 import ('@/views/syslog-manage/stagelog/stagelog.vue')
      //         }
      //     ]
      // }
    ]
  },





  /* 景区系统后台管理菜单-本地（景区版本）-路由 */
  {
    path: '/enterprise-server-management',
    icon: 'ios-home',
    title: '基础信息',
    name: 'enterprise-server-management',
    meta: {
      dutyId: 10211
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: 'enterprise-management',
        title: '企业信息',
        name: 'enterprise-management',
        meta: {
          dutyId: 10212
        },
        component: () =>
          import ('@/views/system-manage/company-manage/company-manage.vue'),
      },
      {
        path: 'scenicspot-management',
        title: '景区信息',
        name: 'scenicspot-management',
        meta: {
          dutyId: 10213
        },
        component: () =>
          import ('@/views/scenic-service/scenic-service-set/scenic-service-set.vue'),
      },
      // {
      //     path: 'travelagency-management',
      //     title: '旅行社管理',
      //     name: 'travelagency-management',
      //     meta: {
      //         dutyId: 10215
      //     },
      //     component: () =>
      //         import ('@/views/online-user-manage/travelbureau-user-manage/travelbureau-user-manage.vue')
      // },
    ]
  },
  {
    path: '/scenic-ticket-management',
    icon: 'pricetag',
    title: '票务管理',
    name: 'scenic-ticket-management',
    meta: {
      dutyId: 10329
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/ticket-information-settings',
        icon: 'ios-pricetag',
        title: '票种设置',
        name: 'ticket-information-settings',
        meta: {
          dutyId: 10217
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'base-product',
            title: '基础票种',
            name: 'base-product',
            meta: {
              dutyId: 10218
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/base-ticket/base-ticket.vue'),
          },
          {
            path: 'group-product',
            title: '组合套票',
            name: 'group-product',
            meta: {
              dutyId: 10219
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/group-ticket/group-ticket.vue'),
          },
          {
            path: 'scenic-refund-rules',
            title: '退票规则',
            name: 'scenic-refund-rules',
            meta: {
              dutyId: 10330
            },
            component: () =>
              import ('@/views/ticket-management/ticket-message-setting/refund-rules-management/refund-rules-management.vue'),
          }
        ]
      },
      {
        path: '/ticket-sales-settings',
        icon: 'earth',
        title: '销售管理',
        name: 'ticket-sales-settings',
        meta: {
          dutyId: 10220
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'ticket-station-manage',
            title: '站点管理',
            name: 'ticket-station-manage',
            meta: {
              dutyId: 10221
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/ticket-station-management.vue'),
          },
          {
            path: 'ticket-window-manage',
            title: '窗口管理',
            name: 'ticket-window-manage',
            meta: {
              dutyId: 10222
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/ticket-window-management.vue'),
          },
          {
            path: 'employee-sellticket-access',
            title: '营销权限',
            name: 'employee-sellticket-access',
            meta: {
              dutyId: 10223
            },
            component: () =>
              import ('@/views/ticket-management/ticket-sales-setting/employee-sales-access.vue'),
          }
        ]
      },
      {
        path: '/ticket-check-settings',
        icon: 'ios-camera',
        title: '检票配置',
        name: 'ticket-check-settings',
        meta: {
          dutyId: 10224
        },
        component: () =>
          import ('@/views/ticket-management/ticket-management-main.vue'),
        children: [{
            path: 'gardendoor-manage',
            title: '景区园门管理',
            name: 'gardendoor-manage',
            meta: {
              dutyId: 10225
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/gardendoor-management.vue'),
          },
          {
            path: 'entry-equipment-manage',
            title: '检票设备管理',
            name: 'entry-equipment-manage',
            meta: {
              dutyId: 10226
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/entry-equipment-management.vue'),
          },
          {
            path: 'check-setting-manage',
            title: '检票规则管理',
            name: 'check-setting-manage',
            meta: {
              dutyId: 10227
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/check-setting-management.vue'),
          },
          {
            path: 'scenic-admin-face',
            title: '员工身份管理',
            name: 'scenic-admin-face',
            meta: {
              dutyId: 10331
            },
            component: () =>
              import ('@/views/ticket-management/ticket-check-setting/admin-face-manage.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/EB-manage',
    icon: 'android-cart',
    name: 'EBmanage',
    title: '电商管理',
    meta: {
      dutyId: 10307
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/phone-message-manage',
        title: '短信通知',
        name: 'phone-message-manage',
        meta: {
          dutyId: 10308
        },
        component: () =>
          import ('@/views/EB-management/phone-message/message-management/message-management.vue')
      },
      {
        path: '/webmessage-manage',
        title: 'PC商城管理',
        name: 'webmessage-manage',
        meta: {
          dutyId: 10309
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'column-manage',
            title: '网站栏目管理',
            name: 'column-manage',
            meta: {
              dutyId: 10318
            },
            component: () =>
              import ('@/views/EB-management/webmessage-management/column-management/column-management.vue'),
          },
          {
            path: 'article-manage/:id',
            title: '栏目文章管理',
            name: 'article-manage',
            meta: {
              dutyId: 10319
            },
            component: () =>
              import ('@/views/EB-management/webmessage-management/article-management/article-management.vue'),
          },
          {
            path: 'swiper-management',
            title: '首页轮播图管理',
            name: 'swiper-management',
            meta: {
              dutyId: 10311
            },
            component: () =>
              import ('@/views/system-manage/swiper-manage/swiper-manage.vue')
          },
          {
            path: 'image-management',
            title: '首页风景图管理',
            name: 'image-management',
            meta: {
              dutyId: 10312
            },
            component: () =>
              import ('@/views/system-manage/image-manage/image-manage.vue')
          },
          {
            path: 'video-management',
            title: '视频管理',
            name: 'video-management',
            meta: {
              dutyId: 10310
            },
            component: () =>
              import ('@/views/system-manage/video-manage/video-manage.vue')
          }
        ]
      },
      {
        path: '/scenic-mobile',
        title: '移动商城管理',
        name: 'scenic-mobile',
        meta: {
          dutyId: 10332
        },
        component: () =>
          import ('@/views/EB-management/EB-management-main.vue'),
        children: [{
            path: 'scenic-micro-mall', // ????
            title: '微商城配置',
            name: 'scenic-micro-mall',
            meta: {
              dutyId: 10322
            },
            component: () =>
              import ('@/views/system-manage/micro-mall/micro-mall.vue')
          },
          {
            path: 'scenic-app-swiper',
            title: '首页轮播图管理',
            name: 'scenic-app-swiper',
            meta: {
              dutyId: 10333
            },
            component: () =>
              import ('@/views/EB-management/shuffling-management/shuffling-management.vue')
          }
        ]
      },
      {
        path: '/online-user-management',
        title: '用户管理',
        name: 'online-user-management',
        meta: {
          dutyId: 10313
        },
        component: () =>
          import ('@/views/system-manage/system-manage-main.vue'),
        children: [{
            path: 'scenic-user-role',
            name: 'scenic-user-role',
            title: '用户权限管理',
            meta: {
              dutyId: 10334
            },
            component: () =>
              import ('@/views/online-user-manage/user-center-role/user-center-role.vue')
          },
          {
            path: 'FIT-user-management',
            name: 'FIT-user-management',
            title: '散客用户管理',
            meta: {
              dutyId: 10314
            },
            component: () =>
              import ('@/views/online-user-manage/FIT-user-manage/FIT-user-manage.vue')
          },
          {
            path: 'system-all-users',
            name: 'system-all-users',
            title: '系统用户总数',
            meta: {
              dutyId: 10315
            },
            component: () =>
              import ('@/views/online-user-manage/system-all-user/system-all-user.vue')
          },
          // {
          //     path: 'system-new-users',
          //     name: 'system-new-users',
          //     title: '系统新增用户数',
          //     meta: {
          //         dutyId: 10316
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/system-new-user/system-new-user.vue')
          // },
          // {
          //     path: 'blacklist-management',
          //     name: 'blacklist-management',
          //     title: '黑名单管理',
          //     meta: {
          //         dutyId: 10317
          //     },
          //     component: () =>
          //         import ('@/views/online-user-manage/blacklist-manage/blacklist-manage.vue')
          // }
        ]
      }
    ]
  },
  {
    path: '/distribution-manage',
    icon: 'person-stalker',
    name: 'distribution-manage',
    title: '分销管理',
    meta: {
      dutyId: 10304
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/distributor-manage',
        title: '分销商管理',
        name: 'distributor-manage',
        meta: {
          dutyId: 10305
        },
        component: () =>
          import ('@/views/distribution-management/distributor-management.vue')
      },
      {
        path: '/distribute-bygroup',
        title: '分销商分组管理',
        name: 'distributie-bygroup',
        meta: {
          dutyId: 10306
        },
        component: () =>
          import ('@/views/distribution-management/distribution-bygroup.vue')
      }
    ]
  },
  {
    path: '/online-order-management',
    icon: 'android-document',
    title: '订单管理',
    name: 'online-order-management',
    meta: {
      dutyId: 10228
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/scenic-online-order',
        title: '线上订单',
        name: 'scenic-online-order',
        meta: {
          dutyId: 10335
        },
        component: () =>
          import ('@/views/online-order/order-manage.vue'),
        children: [{
            path: 'order-search',
            title: '订单查询',
            name: 'order-search',
            meta: {
              dutyId: 10229
            },
            component: () =>
              import ('@/views/online-order/reservation-order-search.vue')
          },
          {
            path: '/scenic-modify-order',
            title: '修改订单游览日期/密码',
            name: 'scenic-modify-order',
            meta: {
              dutyId: 10336
            },
            component: () =>
              import ('@/views/online-order/modify-order-search.vue')
          }
        ]
      },
      {
        path: '/scenic-offline-order',
        title: '线下订单',
        name: 'scenic-offline-order',
        meta: {
          dutyId: 10337
        },
        component: () =>
          import ('@/views/online-order/offline-order/offline-order.vue')
      }
    ]
  },
  {
    path: '/report-statistics',
    icon: 'pie-graph',
    title: '统计分析',
    name: 'report-statistics',
    meta: {
      dutyId: 10323
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [{
        path: '/sellcheck-report-main',
        title: '售检数据统计',
        name: 'sellcheck-report-main',
        meta: {
          dutyId: 920
        },
        component: () =>
          import ('@/views/sellcheck-report/sellcheck-report-main.vue')
      },
      {
        path: '/report-search-main',
        title: '综合报表查询',
        name: 'report-search-main',
        meta: {
          dutyId: 962
        },
        component: () =>
          import ('@/views/report-search/report-search-main.vue')
      }
    ]
  },
  // {
  //   path: '/passage',
  //   icon: 'ios-settings-strong',
  //   title: '通道',
  //   name: 'passage',
  //   meta: {
  //     dutyId: 99950
  //   },
  //   component: () =>
  //     import ('@/views/Main.vue'),
  //   children: [{
  //       path: 'transaction-management',
  //       title: '交易管理',
  //       name: 'transactionManagement',
  //       meta: {
  //         dutyId: 999501
  //       },
  //       component: () =>
  //         import ('@/views/PASSAGE/transaction-management.vue')
  //     },
  //     {
  //       path: 'refund-management',
  //       title: '退款管理',
  //       name: 'refundManagement',
  //       meta: {
  //         dutyId: 999502
  //       },
  //       component: () =>
  //         import ('@/views/PASSAGE/refund-management.vue')
  //     },
  //     {
  //       path: 'refund-audit',
  //       title: '退款审核',
  //       name: 'refundAudit',
  //       meta: {
  //         dutyId: 999503
  //       },
  //       component: () =>
  //         import ('@/views/PASSAGE/refund-audit.vue')
  //     }
  //   ]
  // },
  {
    path: '/credit-management',
    icon: 'social-yen',
    title: '财务管理',
    name: 'creditManagement',
    meta: {
      dutyId: 10342
    },
    component: () =>
      import ('@/views/Main.vue'),
    children: [
      // {
      //   path: 'credit-customer',
      //   title: '我的账户',
      //   name: 'creditCustomer',
      //   meta: {
      //     dutyId: 999511
      //   },
      //   component: () =>
      //     import ('@/views/CREDIT/credit-customer.vue'),
      //   children: [{
      //       path: 'income',
      //       title: '收入',
      //       name: 'income',
      //       meta: {
      //         dutyId: 999512
      //       },
      //       component: () =>
      //         import ('@/views/finance-anage/MyAccount/income.vue'),
      //     },
      //     {
      //       path: 'outcome',
      //       title: '支出',
      //       name: 'outcome',
      //       meta: {
      //         dutyId: 999513
      //       },
      //       component: () =>
      //         import ('../views/finance-anage/MyAccount/outcome.vue'),
      //     },
      //     {
      //       path: 'refund',
      //       title: '退款',
      //       name: 'refund',
      //       meta: {
      //         dutyId: 999514
      //       },
      //       component: () =>
      //         import ('../views/finance-anage/MyAccount/refund.vue'),
      //     },
      //   ]
      // },
      {
        path: 'credit-operate-log',
        title: '流水查询',
        name: 'creditOperateLog',
        meta: {
          dutyId: 999512
        },
        component: () =>
          import ('@/views/CREDIT/credit-customer.vue'),
        children: [{
            path: 'Salescollect',
            title: '销售收款',
            name: 'Salescollect',
            meta: {
              dutyId: 9995121
            },
            component: () =>
              import ('@/views/finance-anage/tunnel/Salescollect.vue'),
          },
          {
            path: 'Salesrefunds',
            title: '销售退款',
            name: 'Salesrefunds',
            meta: {
              dutyId: 9995122
            },
            component: () =>
              import ('../views/finance-anage/tunnel/Salesrefunds.vue'),
          },
          {
            path: 'account-statement',
            title: '对账单',
            name: 'accountStatement',
            meta: {
              dutyId: 9995124
            },
            component: () =>
              import ('@/views/finance-management/channel-service/refund-audit/refundAudit.vue'), //直接用，不需要每个都创建一个
            children: [{
                path: 'summary-of-bill-funds',
                title: '账单资金汇总',
                name: 'summaryOfBillFunds',
                meta: {
                  dutyId: 99951241
                },
                component: () =>
                  import ('@/views/finance-management/channel-service/account-statement/summary-of-bill-funds/summaryOfBillFunds.vue'),
              },
              {
                path: 'details-of-bill-funds',
                title: '账单资金明细',
                name: 'detailsOfBillFunds',
                meta: {
                  dutyId: 99951242
                },
                component: () =>
                  import ('@/views/finance-management/channel-service/account-statement/details-of-bill-funds/detailsOfBillFunds.vue'),
              },
              {
                path: 'mechanism-flow',
                title: '机构流水',
                name: 'mechanismFlow',
                meta: {
                  dutyId: 99951243
                },
                component: () =>
                  import ('@/views/finance-management/channel-service/account-statement/mechanism-flow/mechanismFlow.vue'),
              },
              {
                path: 'downloading-of-bills',
                title: '对账单下载',
                name: 'downloadingOfBills',
                meta: {
                  dutyId: 99951244
                },
                component: () =>
                  import ('@/views/finance-management/channel-service/account-statement/downloading-of-bills/downloadingOfBills.vue'),
              },
            ]
          },
          // 暂时隐藏
          // {
          //   path: 'dueSetting',
          //   title: '收款设置',
          //   name: 'dueSetting',
          //   meta: {
          //     dutyId: 9995123
          //   },
          //   component: () =>
          //     import ('../views/finance-anage/tunnel/dueSetting.vue'),
          // }

        ]
      },
      {
        path: '/creditIndex',
        title: '授信管理',
        name: 'creditIndex',
        meta: {
          dutyId: 10343
        },
        component: () =>
          import ('@/views/finance-anage/paymentCredit/index_credit.vue')
      },
      {
        path: '/advanceIndex',
        title: '预付款管理',
        name: 'advanceIndex',
        meta: {
          dutyId: 999515
        },
        component: () =>
          import ('../views/finance-anage/paymentCredit/index_advance.vue')
      },
      {
        path: '/ReportForm',
        title: '应付款账单',
        name: 'ReportForm',
        meta: {
          dutyId: 999516
        },
        component: () =>
          import ('../views/finance-anage/ReportForm/ReportForm.vue')
      },
      {
        path: 'accountsDue',
        title: '应收款账单',
        name: 'accountsDue',
        meta: {
          dutyId: 999516
        },
        component: () =>
          import ('@/views/finance-anage/paymentCredit/accountsDue.vue')
      },
      {
        path: 'refund-audit',
        title: '退款审核',
        name: 'refundAudit',
        meta: {
          dutyId: 9995123
        },
        component: () =>
          import ('@/views/finance-management/channel-service/refund-audit/refundAudit.vue'),
        children: [{
            path: 'tobe-examination-approval',
            title: '待审批',
            name: 'tobeExaminationApproval',
            meta: {
              dutyId: 99951231
            },
            component: () =>
              import ('@/views/finance-management/channel-service/refund-audit/tobe-examination-approval/tobeExaminationApproval.vue'),
          },
          {
            path: 'approval-and-approval',
            title: '审批通过',
            name: 'approvalAndApproval',
            meta: {
              dutyId: 99951232
            },
            component: () =>
              import ('@/views/finance-management/channel-service/refund-audit/approval-and-approval/approvalAndApproval.vue'),
          },
          {
            path: 'approval-rejection',
            title: '审批拒绝',
            name: 'approvalRejection',
            meta: {
              dutyId: 99951233
            },
            component: () =>
              import ('@/views/finance-management/channel-service/refund-audit/approval-rejection/approvalRejection.vue'),
          },
          {
            path: 'refund-audit-all',
            title: '全部',
            name: 'refundAuditAll',
            meta: {
              dutyId: 99951234
            },
            component: () =>
              import ('@/views/finance-management/channel-service/refund-audit/refund-audit-all/refundAuditAll.vue'),
          },
        ]
      },
    ]
  }
  // {
  //   path: '/offline-prepayment-management',
  //   icon: 'social-usd',
  //   title: '线下预付款管理',
  //   name: 'offlinePrepaymentManagement',
  //   meta: {
  //     dutyId: 99952
  //   },
  //   component: () =>
  //     import ('@/views/Main.vue'),
  //   children: [{
  //       path: 'offline-prepayment-customer',
  //       title: '线下预付款客户',
  //       name: 'offlinePrepaymentCustomer',
  //       meta: {
  //         dutyId: 999521
  //       },
  //       component: () =>
  //         import ('@/views/OFFLINE/offline-prepayment-customer.vue')
  //     },
  //     {
  //       path: 'offline-prepayment-login-log',
  //       title: '线下预付款登记记录',
  //       name: 'offlinePrepaymentLoginLog',
  //       meta: {
  //         dutyId: 999522
  //       },
  //       component: () =>
  //         import ('@/views/OFFLINE/offline-prepayment-login-log.vue')
  //     },
  //     {
  //       path: 'offline-prepayment-transaction',
  //       title: '线下预付款支付交易',
  //       name: 'offlinePrepaymentTransaction',
  //       meta: {
  //         dutyId: 999523
  //       },
  //       component: () =>
  //         import ('@/views/OFFLINE/offline-prepayment-transaction.vue')
  //     },
  //     {
  //       path: 'offline-prepayment-refund',
  //       title: '线下预付款支付退款',
  //       name: 'offlinePrepaymentRefund',
  //       meta: {
  //         dutyId: 999524
  //       },
  //       component: () =>
  //         import ('@/views/OFFLINE/offline-prepayment-refund.vue')
  //     }
  //   ]
  // }
];

// 登陆路由
const loginRoute = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () =>
    import ('@/views/login.vue')
};

// 不需要控制权限的其他路由
export const otherRoutes = {
  path: '/',
  name: 'otherRouter',
  meta: {
    title: '首页'
  },
  // redirect: '/home',
  component: () =>
    import ('@/views/Main.vue'),
  children: [{
      path: 'home_index',
      title: '首页',
      name: 'home_index',
      component: () =>
        import ('@/views/home/home.vue')
    },
    {
      path: 'home_index_scenic',
      title: '首页',
      name: 'home_index_scenic',
      component: () =>
        import ('@/views/home/home_scenic.vue')
    },
    {
      path: 'home_other',
      title: '首页',
      name: 'home_other',
      component: () =>
        import ('@/views/home/home_other.vue')
    },
    {
      path: 'ownspace',
      title: '账号资料',
      name: 'ownspace_index',
      component: () =>
        import ('@/views/own-space/own-space.vue')
    },
    {
      path: 'editpwd',
      title: '修改密码',
      name: 'editpwd_index',
      component: () =>
        import ('@/views/own-space/edit-pwd.vue')
    },
    {
      path: 'order/:order_id',
      title: '订单详情',
      name: 'order-info',
      component: () =>
        import ('@/views/advanced-router/component/order-info.vue')
    },
    // 用于展示动态路由
    // {
    //     path: 'shopping',
    //     title: '购物详情',
    //     name: 'shopping',
    //     component: () =>
    //         import ('@/views/advanced-router/component/shopping-info.vue')
    // },
    // 用于展示带参路由
    {
      path: 'message',
      title: '消息中心',
      name: 'message_index',
      component: () =>
        import ('@/views/message/message.vue')
    },
    {
      //域名
      path: 'url_new',
      title: '新增域名信息',
      name: 'url_new',
      component: () =>
        import ('@/views/system-manage/url-manage/add-edit/url-add-edit.vue')
    },
    {
      path: 'url_edit/:url_Id',
      title: '修改域名信息',
      name: 'url_edit',
      component: () =>
        import ('@/views/system-manage/url-manage/add-edit/url-add-edit.vue')
      //component: resolve => require(['@/views/system-manage/url-manage/add-edit/url-add-edit.vue'], resolve)
    },
    {
      path: 'url_del/:url_Id',
      title: '删除域名信息',
      name: 'url_del',
      component: () =>
        import ('@/views/system-manage/url-manage/del-view/url-del-view.vue')
    },
    {
      path: 'url_view/:url_Id',
      title: '查看域名信息',
      name: 'url_view',
      component: () =>
        import ('@/views/system-manage/url-manage/del-view/url-del-view.vue')
    },
    {
      //视频
      path: 'video_new',
      title: '新增视频信息',
      name: 'video_new',
      component: () =>
        import ('@/views/system-manage/video-manage/add-edit/video-manage-add-edit.vue')
    },
    {
      path: 'video_edit/:video_Id',
      title: '修改视频信息',
      name: 'video_edit',
      component: () =>
        import ('@/views/system-manage/video-manage/add-edit/video-manage-add-edit.vue')
    },
    {
      path: 'video_del/:video_Id',
      title: '删除视频信息',
      name: 'video_del',
      component: () =>
        import ('@/views/system-manage/video-manage/del-view/video-manage-del-view.vue')
    },
    {
      path: 'video_view/:video_Id',
      title: '查看视频信息',
      name: 'video_view',
      component: () =>
        import ('@/views/system-manage/video-manage/del-view/video-manage-del-view.vue')
    },
    {
      //轮播
      path: 'swiper_new',
      title: '新增轮播信息',
      name: 'swiper_new',
      component: () =>
        import ('@/views/system-manage/swiper-manage/add-edit/swiper-manage-add-edit.vue')
    },
    {
      path: 'swiper_edit/:swiper_Id',
      title: '修改轮播信息',
      name: 'swiper_edit',
      component: () =>
        import ('@/views/system-manage/swiper-manage/add-edit/swiper-manage-add-edit.vue')
    },
    {
      path: 'swiper_del/:swiper_Id',
      title: '删除轮播信息',
      name: 'swiper_del',
      component: () =>
        import ('@/views/system-manage/swiper-manage/del-view/swiper-manage-del-view.vue')
    },
    {
      path: 'swiper_view/:swiper_Id',
      title: '查看轮播信息',
      name: 'swiper_view',
      component: () =>
        import ('@/views/system-manage/swiper-manage/del-view/swiper-manage-del-view.vue')
    },
    {
      //图片
      path: 'image_new',
      title: '新增图片信息',
      name: 'image_new',
      component: () =>
        import ('@/views/system-manage/image-manage/add-edit/image-manage-add-edit.vue')
    },
    {
      path: 'image_edit/:imageData',
      title: '修改图片信息',
      name: 'image_edit',
      component: () =>
        import ('@/views/system-manage/image-manage/add-edit/image-manage-add-edit.vue')
    },
    {
      path: 'image_del/:imageData',
      title: '删除图片信息',
      name: 'image_del',
      component: () =>
        import ('@/views/system-manage/image-manage/del-view/image-manage-del-view.vue')
    },
    {
      path: 'image_view/:imageData',
      title: '查看图片信息',
      name: 'image_view',
      component: () =>
        import ('@/views/system-manage/image-manage/del-view/image-manage-del-view.vue')
    },
    {
      //企业与景区关联
      path: 'yilvbao_sign',
      title: '易旅宝标识',
      name: 'yilvbao_sign',
      component: () =>
        import ('@/views/system-manage/company-and-scenicSpot/yilvbao-sign.vue')
    },
    {
      //岗位
      path: 'post_new',
      title: '新增岗位信息',
      name: 'post_new',
      component: () =>
        import ('@/views/system-manage/post-manage/add-edit/post-manage-add-edit.vue')
    },
    {
      path: 'post_edit',
      title: '修改岗位信息',
      name: 'post_edit',
      component: () =>
        import ('@/views/system-manage/post-manage/add-edit/post-manage-add-edit.vue')
    },
    {
      path: 'post_del',
      title: '删除岗位信息',
      name: 'post_del',
      component: () =>
        import ('@/views/system-manage/post-manage/del-view/post-manage-del-view.vue')
    },
    {
      path: 'post_view',
      title: '查看岗位信息',
      name: 'post_view',
      component: () =>
        import ('@/views/system-manage/post-manage/del-view/post-manage-del-view.vue')
    },
    {
      path: 'post_duty',
      title: '所属职责',
      name: 'post_duty',
      component: () =>
        import ('@/views/system-manage/post-manage/post-duty.vue')
    },
    {
      path: 'post_btn_duty',
      title: '所属按钮职责',
      name: 'post_btn_duty',
      component: () =>
        import ('@/views/system-manage/post-manage/post-btn-duty.vue')
    },
    {
      //系统参数管理
      path: 'sys_param_new',
      title: '新增顶级',
      name: 'sys_param_new',
      component: () =>
        import ('@/views/system-manage/sys-param-manage/add-edit/sys-param-add-edit.vue')
    },
    {
      path: 'sys_param_newChild',
      title: '新增子级',
      name: 'sys_param_newChild',
      component: () =>
        import ('@/views/system-manage/sys-param-manage/add-edit/sys-param-add-edit.vue')
    },
    {
      path: 'sys_param_edit',
      title: '修改系统参数',
      name: 'sys_param_edit',
      component: () =>
        import ('@/views/system-manage/sys-param-manage/add-edit/sys-param-add-edit.vue')
    },
    {
      path: 'sys_param_view',
      title: '查看系统参数',
      name: 'sys_param_view',
      component: () =>
        import ('@/views/system-manage/sys-param-manage/del-view/sys-param-del-view.vue')
    },
    {
      //Ectripxml
      path: 'Ectripxml_edit',
      title: '修改Ectripxml管理',
      name: 'Ectripxml_edit',
      component: () =>
        import ('@/views/system-manage/Ectripxml-manage/add-edit/Ectripxml-manage-add-edit.vue')
    },
    {
      path: 'Ectripxml_del',
      title: '删除Ectripxml管理',
      name: 'Ectripxml_del',
      component: () =>
        import ('@/views/system-manage/Ectripxml-manage/del-view/Ectripxml-manage-del-view.vue')
    },
    {
      //门票打印
      path: 'print_set_new',
      title: '新增门票打印设置',
      name: 'print_set_new',
      component: () =>
        import ('@/views/system-manage/ticket-print-set/add-edit/print-set-add-edit.vue')
    },
    {
      path: 'print_set_edit',
      title: '修改门票打印设置',
      name: 'print_set_edit',
      component: () =>
        import ('@/views/system-manage/ticket-print-set/add-edit/print-set-add-edit.vue')
    },
    {
      //景区服务商设置
      path: 'add_scenic_manage',
      title: '新增本级景区管理',
      name: 'add_scenic_manage',
      component: () =>
        import ('@/views/scenic-service/scenic-service-set/add.vue')
    },
    {
      path: 'edit_scenic_manage/:id',
      title: '修改景区管理',
      name: 'edit_scenic_manage',
      component: () =>
        import ('@/views/scenic-service/scenic-service-set/add.vue')
    },
    {
      path: 'view_scenic_manage/:id',
      title: '查看景区管理',
      name: 'view_scenic_manage',
      component: () =>
        import ('@/views/scenic-service/scenic-service-set/view.vue')
    },
    {
      path: 'scenic_property_manage/:id/:name',
      title: '景区属性管理',
      name: 'scenic_property_manage',
      component: () =>
        import ('@/views/scenic-service/scenic-service-set/scenic-property.vue')
    },
    {
      path: 'open_account_manage/:id',
      title: '开户管理',
      name: 'open_account_manage',
      component: () =>
        import ('@/views/scenic-service/scenic-service-set/open-account.vue')
    },
    {
      //人群种类设置
      path: 'add_crowd_type',
      title: '新增本级人群种类管理',
      name: 'add_crowd_type',
      component: () =>
        import ('@/views/scenic-service/crowd-types/add.vue')
    },
    {
      path: 'edit_crowd_type/:id',
      title: '修改人群种类管理',
      name: 'edit_crowd_type',
      component: () =>
        import ('@/views/scenic-service/crowd-types/add.vue')
    },
    {
      path: 'view_crowd_type/:id',
      title: '查看人群种类管理',
      name: 'view_crowd_type',
      component: () =>
        import ('@/views/scenic-service/crowd-types/view.vue')
    },
    {
      //设备类型管理
      path: 'add_device_type',
      title: '新增设备类型',
      name: 'add_device_type',
      component: () =>
        import ('@/views/scenic-service/device-type/add.vue')
    },
    {
      path: 'edit_device_type/:id',
      title: '修改设备类型',
      name: 'edit_device_type',
      component: () =>
        import ('@/views/scenic-service/device-type/add.vue')
    },
    {
      path: 'view_device_type/:id',
      title: '查看设备类型',
      name: 'view_device_type',
      component: () =>
        import ('@/views/scenic-service/device-type/view.vue')
    },
    {
      //业务类型管理
      path: 'add_business_type',
      title: '新增业务类型管理',
      name: 'add_business_type',
      component: () =>
        import ('@/views/scenic-service/business-type/add.vue')
    },
    {
      path: 'edit_business_type/:id',
      title: '修改业务类型',
      name: 'edit_business_type',
      component: () =>
        import ('@/views/scenic-service/business-type/add.vue')
    },
    {
      path: 'view_business_type/:id',
      title: '查看业务类型',
      name: 'view_business_type',
      component: () =>
        import ('@/views/scenic-service/business-type/view.vue')
    },
    {
      //票号规则管理
      path: 'add_exchange_rules',
      title: '新增票号规则',
      name: 'add_exchange_rules',
      component: () =>
        import ('@/views/scenic-service/exchange-rules/add.vue')
    },
    {
      path: 'edit_exchange_rules/:id',
      title: '修改票号规则',
      name: 'edit_exchange_rules',
      component: () =>
        import ('@/views/scenic-service/exchange-rules/add.vue')
    },
    {
      path: 'view_exchange_rules/:id',
      title: '查看票号规则',
      name: 'view_exchange_rules',
      component: () =>
        import ('@/views/scenic-service/exchange-rules/view.vue')
    },
    {
      //门票打印设置
      path: 'J_print_set_new',
      title: '新增门票打印设置',
      name: 'J_print_set_new',
      component: () =>
        import ('@/views/scenic-service/J-ticket-print-set/add.vue')
    },
    {
      path: 'J_print_set_edit/:id',
      title: '修改门票打印设置',
      name: 'J_print_set_edit',
      component: () =>
        import ('@/views/scenic-service/J-ticket-print-set/add.vue')
    },
    {
      //副券打印设置
      path: 'conpon_print_set_new',
      title: '新增副券打印设置',
      name: 'conpon_print_set_new',
      component: () =>
        import ('@/views/scenic-service/coupon-print-set/add.vue')
    },
    {
      path: 'conpon_print_set_edit/:id',
      title: '修改副券打印设置',
      name: 'conpon_print_set_edit',
      component: () =>
        import ('@/views/scenic-service/coupon-print-set/add.vue')
    },
    {
      //发票打印设置
      path: 'invoice_print_set_new',
      title: '新增发票打印设置',
      name: 'invoice_print_set_new',
      component: () =>
        import ('@/views/scenic-service/invoice-print-set/add.vue')
    },
    {
      path: 'invoice_print_set_edit/:id',
      title: '修改发票打印设置',
      name: 'invoice_print_set_edit',
      component: () =>
        import ('@/views/scenic-service/invoice-print-set/add.vue')
    },
    {
      //客源管理
      path: 'origin_manage_new',
      title: '新增客源地',
      name: 'origin_manage_new',
      component: () =>
        import ('@/views/scenic-service/origin-manage/add.vue')
    },
    {
      path: 'origin_manage_edit/:id',
      title: '修改客源地',
      name: 'origin_manage_edit',
      component: () =>
        import ('@/views/scenic-service/origin-manage/add.vue')
    },
    {
      path: 'origin_manage_view/:id',
      title: '查看客源地',
      name: 'origin_manage_view',
      component: () =>
        import ('@/views/scenic-service/origin-manage/del.vue')
    },
    {
      //服务商退票规则
      path: 'refund_rule_new',
      title: '新增服务商退票规则',
      name: 'refund_rule_new',
      component: () =>
        import ('@/views/scenic-service/service-refund-rules/add.vue')
    },
    {
      path: 'refund_rule_edit/:id',
      title: '修改服务商退票规则',
      name: 'refund_rule_edit',
      component: () =>
        import ('@/views/scenic-service/service-refund-rules/add.vue')
    },
    {
      path: 'refund_rule_view/:id',
      title: '查看服务商退票规则',
      name: 'refund_rule_view',
      component: () =>
        import ('@/views/scenic-service/service-refund-rules/del.vue')
    },
    {
      //后台日志管理
      path: 'backstagelog/view/:currentData',
      title: '查看后台日志',
      name: 'view_backstagelog',
      component: () =>
        import ('@/views/syslog-manage/backstagelog/view.vue')
    },
    {
      //前台日志管理
      path: 'stagelog/view/:currentData',
      title: '查看前台日志',
      name: 'view_stagelog',
      component: () =>
        import ('@/views/syslog-manage/stagelog/view.vue')
    },
    {
      //订单日志管理
      path: 'orderlog/view/:currentData',
      title: '查看订单日志',
      name: 'view_orderlog',
      component: () =>
        import ('@/views/syslog-manage/orderlog/view.vue')
    },
    {
      //用户中心菜单
      path: 'user_center_menu_new/:parentId',
      title: '新增用户中心菜单管理',
      name: 'user_center_menu_new',
      component: () =>
        import ('@/views/online-user-manage/user-center-menu/add.vue')
    },
    {
      path: 'user_center_menu_edit',
      title: '修改用户中心菜单管理',
      name: 'user_center_menu_edit',
      component: () =>
        import ('@/views/online-user-manage/user-center-menu/add.vue')
    },
    {
      path: 'user_center_menu_view',
      title: '查看用户中心菜单管理',
      name: 'user_center_menu_view',
      component: () =>
        import ('@/views/online-user-manage/user-center-menu/view.vue')
    },
    {
      path: 'user_center_menu_del',
      title: '删除用户中心菜单管理',
      name: 'user_center_menu_del',
      component: () =>
        import ('@/views/online-user-manage/user-center-menu/view.vue')
    },
    {
      //用户中心角色
      path: 'user_center_role_new',
      title: '新增用户中心角色管理',
      name: 'user_center_role_new',
      component: () =>
        import ('@/views/online-user-manage/user-center-role/add.vue')
    },
    {
      path: 'user_center_role_edit',
      title: '修改用户中心角色管理',
      name: 'user_center_role_edit',
      component: () =>
        import ('@/views/online-user-manage/user-center-role/add.vue')
    },
    {
      path: 'user_center_role_view',
      title: '查看用户中心角色管理',
      name: 'user_center_role_view',
      component: () =>
        import ('@/views/online-user-manage/user-center-role/view.vue')
    },
    {
      path: 'user_center_role_del',
      title: '删除用户中心角色管理',
      name: 'user_center_role_del',
      component: () =>
        import ('@/views/online-user-manage/user-center-role/view.vue')
    },
    {
      //散客用户管理
      path: 'FIT_user_new',
      title: '新增游客用户',
      name: 'FIT_user_new',
      component: () =>
        import ('@/views/online-user-manage/FIT-user-manage/add.vue')
    },
    {
      path: 'FIT_user_edit/:id',
      title: '修改游客用户',
      name: 'FIT_user_edit',
      component: () =>
        import ('@/views/online-user-manage/FIT-user-manage/edit.vue')
    },
    {
      path: 'FIT_user_view/:id',
      title: '查看游客用户',
      name: 'FIT_user_view',
      component: () =>
        import ('@/views/online-user-manage/FIT-user-manage/view.vue')
    },
    {
      path: 'FIT_user_check/:id',
      title: '审核游客用户',
      name: 'FIT_user_check',
      component: () =>
        import ('@/views/online-user-manage/FIT-user-manage/check.vue')
    },
    {
      //旅行社用户管理
      path: 'travel_user_new',
      title: '新增旅行社用户',
      name: 'travel_user_new',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/add.vue')
    },
    {
      path: 'travel_user_edit/:id',
      title: '修改旅行社用户',
      name: 'travel_user_edit',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/add.vue')
    },
    {
      path: 'travel_user_view/:id',
      title: '查看旅行社用户',
      name: 'travel_user_view',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/view.vue')
    },
    {
      path: 'travel_user_check/:id',
      title: '审核旅行社用户',
      name: 'travel_user_check',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/check.vue')
    },
    {
      path: 'travel_branch_manage/:id',
      title: '二级分销商管理',
      name: 'travel_branch_manage',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/travel-branch-manage.vue')
    },
    {
      path: 'travel_operator_manage/:id',
      title: '三级分销商管理',
      name: 'travel_operator_manage',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/travel-operator-manage.vue')
    },
    {
      path: 'travel_open_account_manage/:id',
      title: '开户',
      name: 'travel_open_account_manage',
      component: () =>
        import ('@/views/online-user-manage/travelbureau-user-manage/open-account-manage.vue')
    },
    {
      //导游用户管理
      path: 'guide_user_new',
      title: '新增导游用户',
      name: 'guide_user_new',
      component: () =>
        import ('@/views/online-user-manage/guide-user-manage/add.vue')
    },
    {
      path: 'guide_user_edit/:id',
      title: '修改导游用户',
      name: 'guide_user_edit',
      component: () =>
        import ('@/views/online-user-manage/guide-user-manage/add.vue')
    },
    {
      path: 'guide_user_view/:id',
      title: '查看导游用户',
      name: 'guide_user_view',
      component: () =>
        import ('@/views/online-user-manage/guide-user-manage/view.vue')
    },
    {
      path: 'guide_user_check/:id',
      title: '审核导游用户',
      name: 'guide_user_check',
      component: () =>
        import ('@/views/online-user-manage/guide-user-manage/check.vue')
    },
    {
      //导游用户注册
      path: 'guide_user_reg_new',
      title: '新增导游用户',
      name: 'guide_user_reg_new',
      component: () =>
        import ('@/views/online-user-manage/guide-user-register/add.vue')
    },
    {
      //黑名单管理
      path: 'blacklist_new',
      title: '新增黑名单管理',
      name: 'blacklist_new',
      component: () =>
        import ('@/views/online-user-manage/blacklist-manage/add.vue')
    },
    {
      path: 'blacklist_edit/:id',
      title: '修改黑名单管理',
      name: 'blacklist_edit',
      component: () =>
        import ('@/views/online-user-manage/blacklist-manage/add.vue')
    },
    {
      path: 'blacklist_view/:id',
      title: '查看黑名单管理',
      name: 'blacklist_view',
      component: () =>
        import ('@/views/online-user-manage/blacklist-manage/view.vue')
    },
    {
      //旅游卡
      path: 'tour_card_new',
      title: '新增旅游卡',
      name: 'tour_card_new',
      component: () =>
        import ('@/views/tourcard/tourcard-card/tourcard-card/add.vue')
    },
    {
      path: 'tour_card_edit/:id',
      title: '修改旅游卡',
      name: 'tour_card_edit',
      component: () =>
        import ('@/views/tourcard/tourcard-card/tourcard-card/add.vue')
    },
    {
      path: 'tour_card_view/:id',
      title: '查看旅游卡',
      name: 'tour_card_view',
      component: () =>
        import ('@/views/tourcard/tourcard-card/tourcard-card/view.vue')
    },
    {
      path: 'tourcard_detail_view/:id',
      title: '查看旅游卡明细',
      name: 'tourcard_detail_view',
      component: () =>
        import ('@/views/tourcard/tourcard-card/tourcard-detail/view.vue')
    },
    {
      path: 'usermessage_add/:id',
      title: '身份信息附加',
      name: 'usermessage_add',
      component: () =>
        import ('@/views/tourcard/usermessage-add/usermessage-add.vue')
    },
    {
      path: 'usermessage_add_new/:id',
      title: '新增身份信息附加',
      name: 'usermessage_add_new',
      component: () =>
        import ('@/views/tourcard/usermessage-add/add.vue')
    },
    {
      path: 'usermessage_add_edit/:parentId/:id',
      title: '修改身份信息附加',
      name: 'usermessage_add_edit',
      component: () =>
        import ('@/views/tourcard/usermessage-add/add.vue')
    },
    {
      path: 'tourcard_binduser_view/:id',
      title: '查看旅游卡绑定用户',
      name: 'tourcard_binduser_view',
      component: () =>
        import ('@/views/tourcard/tourcard-bindUser/view.vue')
    },
    {
      path: 'tourcard_saleorder_view/:id',
      title: '查看旅游卡销售订单',
      name: 'tourcard_saleorder_view',
      component: () =>
        import ('@/views/tourcard/tourcard-saleOrder/view.vue')
    },
    {
      path: 'message_send_control_new',
      title: '新增短信发送设置',
      name: 'message_send_control_new',
      component: () =>
        import ('@/views/EB-management/phone-message/message-send-control/add.vue')
    },
    {
      path: 'message_send_control_edit/:id',
      title: '修改短信发送设置',
      name: 'message_send_control_edit',
      component: () =>
        import ('@/views/EB-management/phone-message/message-send-control/add.vue')
    },
    {
      path: 'message_send_control_view/:id',
      title: '查看短信发送设置',
      name: 'message_send_control_view',
      component: () =>
        import ('@/views/EB-management/phone-message/message-send-control/view.vue')
    },
    {
      path: 'consumer_notice_edit/:id',
      title: '修改消费通知',
      name: 'consumer_notice_edit',
      component: () =>
        import ('@/views/EB-management/regulatory-inspector/consumer-notice/add.vue')
    },
    {
      path: 'refund_rules_new',
      title: '新增退票规则信息',
      name: 'refund_rules_new',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/refund-rules-management/add.vue')
    },
    {
      path: 'refund_rules_edit/:id',
      title: '修改退票规则信息',
      name: 'refund_rules_edit',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/refund-rules-management/add.vue')
    },
    {
      path: 'refund_rules_view/:id',
      title: '查看退票规则信息',
      name: 'refund_rules_view',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/refund-rules-management/view.vue')
    },
    {
      path: 'service_price_bygroup_new',
      title: '新增分销商分组',
      name: 'service_price_bygroup_new',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/service-price-bygroup/add.vue')
    },
    {
      path: 'service_price_bygroup_edit/:id',
      title: '修改分销商分组',
      name: 'service_price_bygroup_edit',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/service-price-bygroup/add.vue')
    },
    {
      path: 'service_price_bygroup_view/:id',
      title: '查看服务商价格分组',
      name: 'service_price_bygroup_view',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/service-price-bygroup/view.vue')
    },
    {
      path: 'price_bygroup_new',
      title: '新增价格分组',
      name: 'price_bygroup_new',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-bygroup/add.vue')
    },
    {
      path: 'config_product/:id',
      title: '配置产品',
      name: 'config_product',
      component: () =>
        import ('@/views/distribution-management/config-product.vue')
    },
    {
      path: 'base_ticket_new/:parentId',
      title: '新增基础票',
      name: 'base_ticket_new',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/base-ticket/add.vue')
    },
    {
      path: 'base_ticket_edit/:id',
      title: '修改基础票',
      name: 'base_ticket_edit',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/base-ticket/add.vue')
    },
    {
      path: 'base_ticket_view/:parentId/:id',
      title: '查看基础票',
      name: 'base_ticket_view',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/base-ticket/view.vue')
    },
    {
      path: 'manage_ticket_attributes/:parentId/:id/:ticket',
      title: '管理票务产品属性',
      name: 'manage_ticket_attributes',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/base-ticket/manage-ticket-attributes.vue')
    },
    {
      path: 'qr_code_generate/:parentId/:id',
      title: '二维码生成',
      name: 'qr_code_generate',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/base-ticket/qr-code-generate.vue')
    },
    //价格管理
    {
      path: 'baseprice_management/:id/:ticket',
      title: '基础票价格管理',
      name: 'baseprice_management',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/price-management.vue')
    },
    {
      path: 'groupprice_management/:id/:ticket',
      title: '组合票价格管理',
      name: 'groupprice_management',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/price-management.vue')
    },
    {
      path: 'price_management_new/:id/:ticket',
      title: '新增价格',
      name: 'price_management_new',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/add.vue')
    },
    {
      path: 'price_management_edit/:id',
      title: '修改价格',
      name: 'price_management_edit',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/add.vue')
    },
    {
      path: 'price_management_view/:id',
      title: '查看价格',
      name: 'price_management_view',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/view.vue')
    },
    {
      path: 'employee_sales_access/:id',
      title: '分配员工销售权限',
      name: 'employee_sales_access',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/access.vue')
    },
    {
      path: 'window_sales_access/:id',
      title: '分配窗口销售权限',
      name: 'window_sales_access',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/access.vue')
    },
    {
      path: 'ticket_print_setting/:id',
      title: '门票打印设置',
      name: 'ticket_print_setting',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/ticket-print-setting.vue')
    },
    {
      path: 'manage_ticket_print/:id',
      title: '管理票务打印管理',
      name: 'manage_ticket_print',
      component: () =>
        import ('@/views/ticket-management/ticket-message-setting/price-management/manage-ticket-print.vue')
    },
    //fjy---授信、预付款
    //是否开户
    {
      path: 'isopen',
      title: '授信/预付款管理',
      name: 'isopen',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/isopen.vue')
    },
    //授信
    {
      path: 'credit',
      title: '授信管理',
      name: 'credit',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/credit.vue')
    },
    //开通授信
    {
      path: 'openCredit',
      title: '授信管理',
      name: 'openCredit',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/openCredit.vue')
    },
    //预付款
    {
      path: 'Advance',
      title: '预付款管理',
      name: 'Advance',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/Advance.vue')
    },
    //开通预付款
    {
      path: 'openAdvance',
      title: '预付款管理',
      name: 'openAdvance',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/openAdvance.vue')
    },
    // 应付款账单详情
    {
      path: 'accountsDueDetail',
      title: '应收款账单详情',
      name: 'accountsDueDetail',
      component: () =>
        import ('@/views/finance-anage/paymentCredit/accountsDueDetail.vue')
    },
    //收入 支出详情
    {
      path: 'inComeDetail',
      title: '收入详情',
      name: 'inComeDetail',
      component: () =>
        import ('@/views/finance-anage/MyAccount/inComeDetail.vue')
    },
    //退款详情
    {
      path: 'refundDetail',
      title: '退款详情',
      name: 'refundDetail',
      component: () =>
        import ('@/views/finance-anage/MyAccount/refundDetail.vue')
    },
    //销售收款
    {
      path: 'SalescollectDetail',
      title: '销售收款详情',
      name: 'SalescollectDetail',
      component: () =>
        import ('@/views/finance-anage/tunnel/SalescollectDetail.vue')
    },
    //退款详情
    {
      path: 'SalesrefundsDetail',
      title: '销售退款详情',
      name: 'SalesrefundsDetail',
      component: () =>
        import ('@/views/finance-anage/tunnel/SalesrefundsDetail.vue')
    },
    //收款设置详情
    {
      path: 'dueSettingDetail',
      title: '支付渠道配置详情',
      name: 'dueSettingDetail',
      component: () =>
        import ('@/views/finance-anage/tunnel/dueSettingDetail.vue')
    },
    //收款设置修改
    {
      path: 'dueSettingModify',
      title: '支付渠道配置详情',
      name: 'dueSettingModify',
      component: () =>
        import ('@/views/finance-anage/tunnel/dueSettingModify.vue')
    },
    //收款设置新增
    {
      path: 'dueSettingAdd',
      title: '支付渠道配置详情',
      name: 'dueSettingAdd',
      component: () =>
        import ('@/views/finance-anage/tunnel/dueSettingAdd.vue')
    }
  ]
};

// 404和错误路由
export const errorRoutes = [{
    path: '*',
    name: 'error-404',
    meta: {
      title: '404-页面不存在'
    },
    component: () =>
      import ('@/views/error-page/404.vue')
  },
  // {
  //     path: '*',
  //     redirect: '/404'
  // }
];

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () =>
    import('@/views/main-components/lockscreen/components/locking-page.vue')
};

export const routes = [
  loginRoute,
  otherRoutes,
  ...appRoutes,
  ...errorRoutes,
  locking
];