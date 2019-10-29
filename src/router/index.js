import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    /**@nameapp登录 */
    {
      path: '/',
      name: 'logingindex',
      component: ()=> import('@/view/Loging/index')
    },
    /**@name设置退出 */
    {
      path: '/Setting',
      name: 'Setting',
      component: ()=> import('@/view/Loging/setting')
    },
    /**@name实验室管理员 */
    {
      path: '/LabManager/LabManagerIndex',
      name: 'LabManagerIndex',
      component: ()=> import('@/view/LabManager/index/index')
    },
    //任务分配
    {
      path: '/LabManager/taskAllocation',
      name: 'taskAllocation',
      component: ()=> import('@/view/LabManager/taskAllocation/taskAllocation')
    },
    //项目分配
    {
      path: '/LabManager/projectAllocation',
      name: 'projectAllocation',
      component: ()=> import('@/view/LabManager/taskAllocation/projectAllocation')
    },
    //项目分配详情
    {
      path: '/LabManager/projectSelectDetail',
      name: 'projectSelectDetail',
      component: ()=> import('@/view/LabManager/taskAllocation/projectSelectDetail')
    },
    //管理事项
    {
      path: '/LabManager/managementIssue',
      name: 'managementIssue',
      component: ()=> import('@/view/LabManager/managementIssue/managementIssue')
    },
    //管理事项--人员管理
    {
      path: '/LabManager/personnelManagement',
      name: 'personnelManagement',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/personnelManagement')
    },
    //管理事项--设备管理
    {
      path: '/LabManager/equipmentManagement',
      name: 'equipmentManagement',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentManagement')
    },
    //管理事项--设备管理--详情
    {
      path: '/LabManager/equipmentManagementDetail',
      name: 'equipmentManagementDetail',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentManagementDetail')
    },
    //管理事项--试验标准
    {
      path: '/LabManager/EquipmentStandard',
      name: 'EquipmentStandard',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentStandard')
    },
    //管理事项--试验方法
    {
      path: '/LabManager/EquipmentMethods',
      name: 'EquipmentMethods',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentMethods')
    },
    //管理事项--历史项目
    {
      path: '/LabManager/EquipmentHistory',
      name: 'EquipmentHistory',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentHistory')
    },
    //管理事项--历史项目--项目详情
    {
      path: '/LabManager/EquipmentHistoryDetail',
      name: 'EquipmentHistoryDetail',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/equipmentHistoryDetail')
    },
    {
      path: '/LabManager/historyDetail',
      name: 'EquipmenthistoryDetail',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/historyDetail')
    },
    //管理事项--工装管理
    {
      path: '/LabManager/EquipmentFrockManage',
      name: 'EquipmentFrockManage',
      component: ()=> import('@/view/LabManager/managementIssue/manageList/EquipmentFrockManage')
    },
    //任务审核
    {
      path: '/LabManager/TaskManageIndex',
      name: 'TaskManageIndex',
      component: ()=> import('@/view/LabManager/taskManage/taskManage')
    },
    //任务审核-报告审核
    {
      path: '/LabManager/EquipmentReport',
      name: 'EquipmentReport',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentReport')
    },
    //任务审核-报告审核-审核详情
    {
      path: '/LabManager/EquipmentReportDetail',
      name: 'EquipmentReportDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/EquipmentReportDetail')
    },
    //任务审核-计量审核
    {
      path: '/LabManager/EquipmentMeasure',
      name: 'EquipmentMeasure',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentMeasure')
    },
    //任务审核-计量审核详情
    {
      path: '/LabManager/EquipmentMeasureDetail',
      name: 'EquipmentMeasureDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/EquipmentMeasureDetail')
    },
    //任务审核-物料审核
    {
      path: '/LabManager/EquipmentMaterial',
      name: 'EquipmentMaterial',
      component: ()=> import('@/view/LabManager/taskManage/manageList/EquipmentMaterial')
    },
    //任务审核-物料审核-申请物料
    {
      path: '/LabManager/EquipmentMaterialDetail',
      name: 'EquipmentMaterialDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/EquipmentMaterialDetail')
    },
    //任务审核--设备审核
    {
      path: '/LabManager/EquipmentApply',
      name: 'EquipmentApply',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentApply')
    },
    //任务审核--设备审核--申请设备
    {
      path: '/LabManager/EquipmentApplyDetail',
      name: 'EquipmentApplyDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentApplyDetail')
    },
    //任务审核--值班审核
    {
      path: '/LabManager/EquipmentWatch',
      name: 'EquipmentWatch',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentWatch')
    },
    //任务审核--值班审核--申请值班
    {
      path: '/LabManager/EquipmentWatchDetail',
      name: 'EquipmentWatchDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentWatchDetail')
    },
    //任务审核--实验方法审核
    {
      path: '/LabManager/EquipmentTestMethods',
      name: 'EquipmentTestMethods',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentTestMethods')
    },
    //任务审核-实验方法审核--申请实验方法
    {
      path: '/LabManager/EquipmentTestMethodsDetail',
      name: 'EquipmentTestMethodsDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentTestMethodsDetail')
    },
    //任务审核--工装审核
    {
      path: '/LabManager/EquipmentFrockApply',
      name: 'EquipmentFrockApply',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentFrockApply')
    },
    //任务审核--工装审核--申请工装
    {
      path: '/LabManager/EquipmentFrockApplyDetail',
      name: 'EquipmentFrockApplyDetail',
      component: ()=> import('@/view/LabManager/taskManage/manageList/equipmentFrockApplyDetail')
    },
    //信息发布
    {
      path: '/LabManager/InfoIssueIndex',
      name: 'InfoIssueIndex',
      component: ()=> import('@/view/LabManager/InfoIssue/InfoIssue')
    },
    /**@name计量员 */
    {
      path: '/gauger/gaugerIndex',
      name: 'gaugerIndex',
      component: ()=> import('@/view/gauger/index/index')
    },
    //已过期计量设备数
    {
      path: '/gauger/overdueEquilpment',
      name: 'overdueEquilpment',
      component: ()=> import('@/view/gauger/overdueEquilpment/overdueEquilpment')
    },
    //负责计量设备数
    {
      path: '/gauger/principalEquipment',
      name: 'principalEquipment',
      component: ()=> import('@/view/gauger/principalEquipment/principalEquipment')
    },
    //负责计量设备数详情
    {
      path: '/gauger/principalEquipmentDetail',
      name: 'principalEquipmentDetail',
      component: ()=> import('@/view/gauger/principalEquipment/principalEquipmentDetail')
    },
    //计量流程
    {
      path: '/gauger/measureFlow',
      name: 'measureFlow',
      component: ()=> import('@/view/gauger/principalEquipment/measureFlow')
    },
    //计量流程--申请计量
    {
      path: '/gauger/ApplyMeasuring',
      name: 'ApplyMeasuring',
      component: ()=> import('@/view/gauger/principalEquipment/flow/ApplyMeasuring')
    },
    //计量流程--计量进度
    {
      path: '/gauger/scheduleMeasuring',
      name: 'scheduleMeasuring',
      component: ()=> import('@/view/gauger/principalEquipment/flow/scheduleMeasuring')
    },
    //计量流程--计量报告
    {
      path: '/gauger/reportMeasuring',
      name: 'reportMeasuring',
      component: ()=> import('@/view/gauger/principalEquipment/flow/reportMeasuring')
    },
    //三十天未计量设备数
    {
      path: '/gauger/noMeasurementEquipment',
      name: 'noMeasurementEquipment',
      component: ()=> import('@/view/gauger/noMeasurementEquipment/noMeasurementEquipment')
    },
    //计量中设备进度
    {
      path: '/gauger/centerMeasurement',
      name: 'centerMeasurement',
      component: ()=> import('@/view/gauger/centerMeasurement/centerMeasurement')
    },
    /**@name设备工程师 */
    {
      path: '/Equipmentengineer/EquipmentengineerIndex',
      name: 'EquipmentengineerIndex',
      component: ()=> import('@/view/Equipmentengineer/index/index')
    },
    //故障设备管理
    {
      path: '/Equipmentengineer/failureEquipmentManage',
      name: 'failureEquipmentManage',
      component: ()=> import('@/view/Equipmentengineer/failureEquipmentManage/failureEquipmentManage')
    },
    //异常申报
    {
      path: '/Equipmentengineer/ExceptionDclare',
      name: 'ExceptionDclare',
      component: ()=> import('@/view/Equipmentengineer/failureEquipmentManage/ExceptionDclare')
    },
    //保养设备数
    {
      path: '/Equipmentengineer/maintainEquipmentManage',
      name: 'maintainEquipmentManage',
      component: ()=> import('@/view/Equipmentengineer/maintainEquipmentManage/maintainEquipmentManage')
    },
    //负责设备数
    {
      path: '/Equipmentengineer/principalEquipmentManage',
      name: 'principalEquipmentManage',
      component: ()=> import('@/view/Equipmentengineer/principalEquipmentManage/principalEquipmentManage')
    },
    //基础设施管理
    {
      path: '/Equipmentengineer/infrastructure',
      name: 'infrastructure',
      component: ()=> import('@/view/Equipmentengineer/infrastructure/infrastructure')
    },
    //试验工装数
    {
      path: '/Equipmentengineer/frockManage',
      name: 'frockManage',
      component: ()=> import('@/view/Equipmentengineer/frockManage/frockManage')
    },
    //设备安全人员指导书
    {
      path: '/Equipmentengineer/guidanceManage',
      name: 'guidanceManage',
      component: ()=> import('@/view/Equipmentengineer/guidanceManage/guidanceManage')
    },
    //设备操作指导书
    {
      path: '/Equipmentengineer/equipmentRegulation',
      name: 'equipmentRegulation',
      component: ()=> import('@/view/Equipmentengineer/equipmentRegulation/equipmentRegulation')
    },
    /**@name 二维码 */
    {
      path: '/QRcodeIndex',
      name: 'QRcodeIndex',
      component: ()=> import('@/components/QRcode')
    },
    /**@name产品经理 */ 
    {
      path: '/Equipmentengineer/ProjectManagerIndex',
      name: 'ProjectManagerIndex',
      meta: { requiresAuth: true },
      component: ()=> import('@/view/ProductManager/index/index')
    },
    //负责产品
    {
      path: '/Equipmentengineer/ProjectManager',
      name: 'ProjectManager',
      component: ()=> import('@/view/ProductManager/taberBar/projectManage')
    },
    //项目配置
    {
      path: '/Equipmentengineer/ProjectSetting',
      name: 'ProjectSetting',
      component: ()=> import('@/view/ProductManager/taberBar/projectSetting')
    },
    //试验信息
    {
      path: '/Equipmentengineer/ProjectInfo',
      name: 'ProjectInfo',
      component: ()=> import('@/view/ProductManager/taberBar/projectInfo')
    },
    //试验详情
    {
      path: '/Equipmentengineer/ProjectInfoDetail',
      name: 'ProjectInfoDetail',
      component: ()=> import('@/view/ProductManager/taberBar/projectInfoDetail')
    },
    //项目进度
    {
      path: '/Equipmentengineer/ProjectSchedule',
      name: 'ProjectSchedule',
      component: ()=> import('@/view/ProductManager/taberBar/projectSchedule')
    },
    //支出费用
    {
      path: '/Equipmentengineer/ExpenditureCost',
      name: 'ExpenditureCost',
      component: ()=> import('@/view/ProductManager/taberBar/expenditureCost')
    },
    //项目费用
    {
      path: '/Equipmentengineer/ProjectCost',
      name: 'ProjectCost',
      component: ()=> import('@/view/ProductManager/taberBar/projectCost')
    },
    //试验费用
    {
      path: '/Equipmentengineer/TestCost',
      name: 'TestCost',
      component: ()=> import('@/view/ProductManager/taberBar/testCost')
    },
    //试验详情
    {
      path: '/Equipmentengineer/TestDetail',
      name: 'TestDetail',
      component: ()=> import('@/view/ProductManager/taberBar/testDetail')
    },
    //审批
    {
      path: '/Equipmentengineer/ProjectCareful',
      name: 'ProjectCareful',
      component: ()=> import('@/view/ProductManager/taberBar/projectCareful')
    },
    //审批详情
    {
      path: '/Equipmentengineer/ProjectCarefulDetail',
      name: 'ProjectCarefulDetail',
      component: ()=> import('@/view/ProductManager/taberBar/projectCarefulDetail')
    },
    /**@name 项目经理 */
    {
      path: '/Equipmentengineer/ProjectManageIndex',
      name: 'ProjectManageIndex',
      component: ()=> import('@/view/ProjectManage/index/index')
    },
    //试验标准
    {
      path: '/Equipmentengineer/TestStandard',
      name: 'TestStandard',
      component: ()=> import('@/view/ProjectManage/TestStandard/TestStandard')
    },
    //历史项目
    {
      path: '/Equipmentengineer/HistoryProject',
      name: 'HistoryProject',
      component: ()=> import('@/view/ProjectManage/HistoryProject/HistoryProject')
    },
    //历史项目详情
    {
      path: '/Equipmentengineer/HistoryProjectDetail',
      name: 'HistoryProjectDetail',
      component: ()=> import('@/view/ProjectManage/HistoryProject/HistoryProjectDetail')
    },
    //预约项目
    {
      path: '/Equipmentengineer/AppointmentProject',
      name: 'AppointmentProject',
      component: ()=> import('@/view/ProjectManage/appointmentProject/appointmentProject')
    },
    //项目流程
    {
      path: '/Equipmentengineer/ProjectFlow',
      name: 'ProjectFlow',
      component: ()=> import('@/view/ProjectManage/appointmentProject/ProjectFlow')
    },
    //项目流程--试验管理
    {
      path: '/Equipmentengineer/TestManage',
      name: 'TestManage',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/testManage')
    },
    //创建实验
    {
      path: '/Equipmentengineer/EstablishTest',
      name: 'EstablishTest',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/establishTest')
    },
    //项目简介/试验简介
    {
      path: '/Equipmentengineer/Synopsis',
      name: 'Synopsis',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/synopsis')
    },
    //项目流程--试验进度
    {
      path: '/Equipmentengineer/ProjectScheduleTest',
      name: 'ProjectScheduleTest',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/projectSchedule')
    },
    //项目报告--项目报告详情
    {
      path: '/Equipmentengineer/LookReportDetail',
      name: 'LookReportDetail',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/lookReportDetail')
    },
    //项目流程--预约内部试验
    {
      path: '/Equipmentengineer/ProdectInterior',
      name: 'ProdectInterior',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/ProdectInterior')
    },
    //项目流程--预约信息
    {
      path: '/Equipmentengineer/AppointmentTestTime',
      name: 'AppointmentTestTime',
      component: ()=> import('@/view/ProjectManage/appointmentProject/Flow/appointmentTestTime')
    },
    //创建项目
    {
      path: '/Equipmentengineer/EstablishProject',
      name: 'EstablishProject',
      component: ()=> import('@/view/ProjectManage/establishProject/establishProject')
    },
    /**@name物料工程师 */
    {
      path:'/materialEngineerIndex',
      name:'materialEngineerIndex',
      component:()=>import('@/view/materialEngineer/index/index')
    },
    //物料管理
    {
      path:'/materialEngineerIndex/MaterialManage',
      name:'MaterialManage',
      component:()=>import('@/view/materialEngineer/materialManage/materialManage')
    },
    //物料管理-申请物料
    {
      path:'/materialEngineerIndex/ProposerMaterial',
      name:'ProposerMaterial',
      component:()=>import('@/view/materialEngineer/materialManage/proposerMaterial')
    },
    //需采购物料数
    {
      path:'/materialEngineerIndex/PurchaseMaterial',
      name:'PurchaseMaterial',
      component:()=>import('@/view/materialEngineer/purchaseMaterial/purchaseMaterial')
    },
    //物料分配
    {
      path:'/materialEngineerIndex/AllocationMaterial',
      name:'AllocationMaterial',
      component:()=>import('@/view/materialEngineer/allocationMaterial/allocationMaterial')
    },
    //物料分配详情
    {
      path:'/materialEngineerIndex/AllocationMaterialDetail',
      name:'AllocationMaterialDetail',
      component:()=>import('@/view/materialEngineer/allocationMaterial/allocationMaterialDetail')
    },
    //新增物料
    {
      path:'/materialEngineerIndex/MaterialAdd',
      name:'MaterialAdd',
      component:()=>import('@/view/materialEngineer/materialAdd/materialAdd')
    },
    //物料归还
    {
      path:'/materialEngineerIndex/MaterialReturn',
      name:'MaterialReturn',
      component:()=>import('@/view/materialEngineer/materialReturn/materialReturn')
    },
    //物料归还form表单
    {
      path:'/materialEngineerIndex/MaterialReturnForm',
      name:'MaterialReturnForm',
      component:()=>import('@/view/materialEngineer/materialReturn/materialReturnForm')
    },
    //样件确认
    {
      path:'/materialEngineerIndex/MaterialAffirm',
      name:'MaterialAffirm',
      component:()=>import('@/view/materialEngineer/materialAffirm/materialAffirm')
    },
    //样件确认详情
    {
      path:'/materialEngineerIndex/MaterialAffirmDetail',
      name:'MaterialAffirmDetail',
      component:()=>import('@/view/materialEngineer/materialAffirm/materialAffirmDetail')
    },
    /**@name试验工程师 */
    {
      path: '/Testengineer/index',
      name: 'TestengineerIndex',
      component:() => import('@/view/Testengineer/index/index'),
    },
    //试验标准
    {
      path: '/Testengineer/TestStandardIndex',
      name: 'TestStandardIndex',
      component:() => import('@/view/Testengineer/testStandard/testStandard'),
    },
    //完成任务
    {
      path: '/Testengineer/TestComplete',
      name: 'TestComplete',
      component:() => import('@/view/Testengineer/testComplete/testComplete'),
    },
    //完成项目-项目详情
    {
      path: '/Testengineer/TestCompleteDetail',
      name: 'TestCompleteDetail',
      component:() => import('@/view/Testengineer/testComplete/testCompleteDetail'),
    },
    //未完成任务
    {
      path: '/Testengineer/TestUnComplete',
      name: 'TestUnComplete',
      component:() => import('@/view/Testengineer/testUnComplete/testUnComplete'),
    },
    //未完成任务-项目详情
    {
      path: '/Testengineer/TestUnCompleteDeatil',
      name: 'TestUnCompleteDeatil',
      component:() => import('@/view/Testengineer/testUnComplete/testUnCompleteDeatil'),
    },
    //项目流程
    {
      path: '/Testengineer/MaterialFlow',
      name: 'MaterialFlow',
      component:() => import('@/view/Testengineer/testUnComplete/Flow/index'),
    },
    //项目流程-实验室环境搭建管理
    {
      path: '/Testengineer/EnvironmentSetup',
      name: 'EnvironmentSetup',
      component:() => import('@/view/Testengineer/testUnComplete/Flow/EnvironmentSetup'),
    },
    //项目流程-实验室环境搭建管理-设备清单-申请报修
    {
      path: '/Testengineer/ApplyRepair',
      name: 'ApplyRepair',
      component:() => import('@/view/Testengineer/testUnComplete/Flow/applyRepair'),
    },
    //项目流程-试验员安排
    {
      path: '/Testengineer/Staffing',
      name: 'Staffing',
      component:() => import('@/view/Testengineer/testUnComplete/Flow/staffing'),
    },
    //报警日志
    {
      path: '/Testengineer/Malfunction',
      name: 'Malfunction',
      component:() => import('@/view/Testengineer/malfunction/malfunction'),
    },
    //报警日志-报警原因
    {
      path: '/Testengineer/MalfunctionCause',
      name: 'MalfunctionCause',
      component:() => import('@/view/Testengineer/malfunction/MalfunctionCause'),
    },
    //试验方法
    {
      path: '/Testengineer/TestMethods',
      name: 'TestMethods',
      component:() => import('@/view/Testengineer/testMethods/testMethods'),
    },
    //值班管理
    {
      path: '/Testengineer/WatchManage',
      name: 'WatchManage',
      component:() => import('@/view/Testengineer/watchManage/watchManage'),
    },
    //值班管理-值班申请
    {
      path: '/Testengineer/ApplyWatch',
      name: 'ApplyWatch',
      component:() => import('@/view/Testengineer/watchManage/applyWatch'),
    },
    //值班管理-是申请进度
    {
      path: '/Testengineer/ApplySchedule',
      name: 'ApplySchedule',
      component:() => import('@/view/Testengineer/watchManage/applySchedule'),
    },
    //试验方法导入贡献数
    {
      path: '/Testengineer/TeatTheImport',
      name: 'TeatTheImport',
      component:() => import('@/view/Testengineer/teatTheImport/teatTheImport'),
    },
    //培养人员管理
    {
      path: '/Testengineer/TestCultivate',
      name: 'TestCultivate',
      component:() => import('@/view/Testengineer/testCultivate/testCultivate'),
    },
    /**@name实验室经理 */
    {
      path: '/TestManager/TestManagerIndex',
      name: 'TestManagerIndex',
      component:() => import('@/view/TestManager/index/index'),
    },
    //活跃管理
    {
      path: '/TestManager/ActivelyNumber',
      name: 'ActivelyNumber',
      component:() => import('@/view/TestManager/activelyNumber/activelyNumber'),
    },
    //试验项目
    {
      path: '/TestManager/TestProject',
      name: 'TestProject',
      component:() => import('@/view/TestManager/TestProject/TestProject'),
    },
    //试验标准
    {
      path: '/TestManager/TeststandArd',
      name: 'TeststandArd',
      component:() => import('@/view/TestManager/TeststandArd/TeststandArd'),
    },
    //设备档案
    {
      path: '/TestManager/TestRecord',
      name: 'TestRecord',
      component:() => import('@/view/TestManager/testRecord/testRecord'),
    },
    //实验室设备运行率
    {
      path: '/TestManager/TestEquipment',
      name: 'TestEquipment',
      component:() => import('@/view/TestManager/testEquipment/testEquipment'),
    },
    //实验室设备运行率详情
    {
      path: '/TestManager/TestEquipmentDetail',
      name: 'TestEquipmentDetail',
      component:() => import('@/view/TestManager/testEquipment/testEquipmentDetail'),
    },
    //物料安全库存率
    {
      path: '/TestManager/TestInventory',
      name: 'TestInventory',
      component:() => import('@/view/TestManager/TestInventory/TestInventory'),
    },
    //测试报告
    {
      path: '/TestManager/TestReport',
      name: 'TestReport',
      component:() => import('@/view/TestManager/testReport/testReport'),
    },
    //测试报告--详情
    {
      path: '/TestManager/TestReportDetail',
      name: 'TestReportDetail',
      component:() => import('@/view/TestManager/testReport/testReportDetail'),
    },
    //报警日志
    {
      path: '/TestManager/Alarmlog',
      name: 'Alarmlog',
      component:() => import('@/view/TestManager/Alarmlog/index'),
    },
    /**@name系统通知 */
    {
      path: '/Systematic_notification/index',
      name: 'systematic_notification',
      component:() => import('@/view/systematic_notification/index'),
    },
    {
      path: '/Systematic_notification/notificationDetail',
      name: 'notificationDetail',
      component:() => import('@/view/systematic_notification/notificationDetail'),
    },
  ]
})
export default router;