// 活动数据类型
export interface IActivity {
  content: string;
  coverPhoto: string;
  id: number;
  source: number;
  title: string;
  type: number;
}

// 产品分类数据类型
export interface IEquipment {
  children: IEquipment[];
  content: string;
  equipmentTypeName: string;
  id: number;
  img: string;
  parentId: number;
  video: string;
}

// 产品列表数据类型
export interface IProduct {
  applicationScene: string; // 设备应用场景，采矿场|采石场，可多个
  brand: string; // 品牌
  bucketCapacity: number; // 铲斗容量；单位m³
  bucketCapacityDemand: string; // 斗容需求范围：1.5-2.5,2.5-4.0,4.0-6.5,单位：m³
  dataUrl: string; // 资料地址
  engineModel: string; // 发动机型号
  engineNetPower: number; // 发动机净功率；单位为KW
  enginePower: number; // 发动机总功率；单位KW
  equipmentTypeId: number; // 设备类型id
  id: number; // 产品id
  imgUrl: string; // 图片地址
  maxReach: number; // 最大挖掘半径，单位：mm
  maxReachRange: string; // 最大挖掘深度范围：9480-11719,9480-11719，单位：mm
  model: string; // 型号;型号对应机械设备/山工机械型号
  overallViewUrl: string; // 720看机地址
  recycleArea: string; // 二手设备-所在地，如：四川(成都)
  recycleEquipmentNo: string; // 二手设备-设备编号
  recycleEquipmentTon: number; // 二手设备-设备吨级；单位T
  recycleEquipmentType: string; // 设备类型；如：“国内组装”
  recycleExFactoryYear: number; // 二手设备-出厂年份
  recyclePaymentType: string; // 二手设备-付款方式，如：全款或融资租赁
  recycleSellState: number; // 二手设备-销售状态；0：待销售，1：已销售
  recycleWorkHours: number; // 二手设备-工作小时数；单位H
  recyclePrice: string; // 二手设备 报价
  retailPrice: number; // 设备类型为机械设备/山工机械，表示厂商零售价，设备类型为二手设备时，表示设备报价，单位为人民币
  series: string; // 系列；轮式装载机，大型挖掘机(>33吨)，中型挖掘机(20-33吨)，小型挖掘机(<20吨)，轮式挖掘机
  videoUrl: string; // 视频地址
  weightWork: number; // 重量-工作重量；单位kg
  workItems: string; // 作业项目；矿石开采|一次破碎，可多个
}

// 关联二手设备
export interface ISecond {
  id: number;
  imgUrl: string;
  model: string;
  recycleEquipmentNo: string;
}
// 关联工装机具
export interface ITool {
  id: number;
  imgUrl: string;
  toolName: string;
}
// 产品详情 数据类型
export interface IProductDetail {
  applicationScene: string; // 设备应用场景，采矿场|采石场，可多个
  brand: string; //品牌
  bucketCapacity: number; //铲斗容量；单位m³
  bucketCapacityDemand: string; //斗容需求范围：1.5-2.5,2.5-4.0,4.0-6.5,单位：m³
  capacityCooling: number; //维修加注容量-冷却系统;单位L
  capacityEngineOil: number; //维修加注容量-发动机机油；单位L
  capacityFinalDrive: number; //维修加注容量-终传动;单位L
  capacityFuelTank: number; //维修加注容量-燃油箱容量；单位L
  capacityHydraulicSystem: number; //维修加注容量-液压系统油容量（含油箱）
  capacityHydraulicTank: number; //维修加注容量-液压油箱（含吸入管）
  capacityRotationDrive: number; //维修加注容量-回转驱动(每个),单位L
  dataUrl: string; //资料地址
  driveGradient: string; //驱动-爬坡度
  driveMaxSpeed: number; //驱动-最大行驶速度；单位km/h
  driveMaxTraction: number; //驱动-最大牵引力；单位kN
  engineCylinderBore: number; //发动机缸径；单位mm
  engineDieselUsed: string; //发动机可使用生物柴油
  engineDisplacement: number; //发动机排量；单位L
  engineModel: string; //发动机型号
  engineNetPower: number; //发动机净功率；单位为KW
  enginePower: number; //发动机总功率；单位KW
  engineStroke: number; //发动机冲程；单位mm
  equipmentTypeId: number; //设备类型id
  hydraulicArmCylinderBore: number; //液压系统-斗杆油缸-缸径；单位mm
  hydraulicArmCylinderStroke: number; //液压系统-斗杆油缸-冲程；单位mm
  hydraulicBoomCylinderBore: number; //液压系统-动臂油缸-缸径；单位mm
  hydraulicBoomCylinderStroke: number; //液压系统-动臂油缸-冲程；单位mm
  hydraulicBucketCylinderBore: number; //液压系统-铲斗油缸-缸径
  hydraulicBucketCylinderStroke: number; //液压系统-铲斗油缸-冲程；单位mm
  hydraulicEquipmentMaxPressure: number; //液压系统-最大压力-设备-执行；单位kPa
  hydraulicMaxSystemFlow: string; //液压系统-最大流量-执行；
  hydraulicRotationMaxPressure: number; //液压系统-最大压力-回转；单位kPa
  hydraulicSteerMaxPressure: number; //液压系统-最大压力-行驶；单位kPa
  id: number; //产品id
  imgUrl: string; //图片地址
  maxReach: number; //最大挖掘半径，单位：mm
  maxReachRange: string; //最大挖掘深度范围：9480-11719,9480-11719，单位：mm
  model: string; //型号;型号对应机械设备/山工机械型号
  overallViewUrl: string; //720看机地址
  h5Url: string; // 商城地址
  recycleArea: string; //二手设备-所在地，如：四川(成都)
  recycleEquipmentNo: string; //二手设备-设备编号
  recycleEquipmentTon: number; //二手设备-设备吨级；单位T
  recycleEquipmentType: string; //设备类型；如：“国内组装”
  recycleExFactoryYear: number; //二手设备-出厂年份
  recyclePaymentType: string; //二手设备-付款方式，如：全款或融资租赁
  recycleSellState: number; //二手设备-销售状态；0：待销售，1：已销售
  recycleWorkHours: number; //二手设备-工作小时数；单位H
  recyclePrice: string; // 二手设备  报价
  retailPrice: number; //设备类型为机械设备/山工机械，表示厂商零售价，设备类型为二手设备时，表示设备报价，单位为人民币
  rotaryMachineryMaxTorque: number; //回转机械装置-最大回转扭矩；单位 KN.m
  rotaryMachinerySpeed: number; //回转机械装置-回转速度，单位rpm
  series: string; //系列；轮式装载机，大型挖掘机(>33吨)，中型挖掘机(20-33吨)，小型挖掘机(<20吨)，轮式挖掘机
  trackCarrierSprocketNum: number; //履带-托链轮数量(每侧)
  trackNum: number; //履带-履带板数量(每侧)；
  trackThrustWheelNum: number; //履带-履带支重轮数量(每侧)
  trackWidth: number; //履带-履带板宽度；单位mm
  videoUrl: string; //视频地址
  weightWork: number; //重量-工作重量；单位kg
  workItems: string; // 作业项目；矿石开采|一次破碎，可多个
  content: string; // 产品概述；图文模式
  recycleList: ISecond[]; // 关联二手设备列表
  toolList: ITool[]; // 工装机具
  extendBoom: string; // 伸展动臂
  largeVolumeBoom: string; // 大斗量动臂
  extendStick: string; // 伸展斗杆
  largeVolumeStick: string; // 大容量型斗杆
  videoUrl: string;
}

// 工装机具详情  数据类型
export interface ITools {
  content: string; // 概述
  dataUrl: string; // 资料
  id: number;
  imgUrl: string;
  industryList?: any; // 关联山工机械列表
  productList?: any; // 关联机械设备列表
  recycleList?: any; // 关联二手设备列表列表
  toolName: string; // 机具名称
  videoUrl: string; // 视频
}

// 矿山设备 列表  数据结构
export interface IMine {
  id: number;
  name: string;
  img: string;
}

// 职位列表  数据结构
export interface IJob {
  content: string; // 详情描述
  createTime: string; // 发布时间
  id: number;
  jobCategory: string; // 职位类别；例如：维修类
  major: string; // 要求学历
  name: string; // 职位名称
  state: number; // 0:招聘中 1：招聘完成 -1：撤销招聘
  workLocation: string; // 工作地点
}

// 支持分类数据类型
export interface ISupport {
  children: ISupport[];
  content: string;
  title: string;
  id: number;
  imgPc: string;
  parentId: number;
  video: string;
}

// 招聘职位数据类型
export interface IJob {
  address: string;
  companyName: string;
  lat: number;
  lng: number;
  phoneNumber: string;
}
