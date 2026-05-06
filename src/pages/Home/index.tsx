import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TrendingDown,
  Target,
  Truck,
  BarChart2,
  Settings,
  Menu,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Building2,
  Clock,
  PackageCheck,
  PhoneCall,
  Mail,
  Calendar,
  DollarSign,
  PieChart,
  Award,
  Globe,
  Bell,
  Sparkles,
  Factory,
  CheckCircle2,
  FileText,
  ClipboardList,
  ShieldCheck,
  LogOut,
  Container,
  Database,
  FileSearch,
  Scale,
  CreditCard,
  Zap,
  Handshake,
  Filter,
  Megaphone,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Percent,
  BrainCircuit,
  Package,
  Wrench,
  UserCircle,
  Calculator,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import UserPermission from "../UserPermissions";
import SystemConfig from "../SystemConfig";
import DevPermit from "../DevPermit";
import SystemLogs from "../SystemLogs";
import CalendarHub from "../Calendar";
import SaleOrder from "../SaleOrder/index";
import ProductsCatalogue from "../ProductsCatalogue";
import { useVisibility } from "../../context/ModuleVisibilityContext";

// --- Theme Configuration (Vibrant Palette) ---
const THEME = {
  bgMain: "#f7f3ee",
  bgGradient: "linear-gradient(135deg, #d4cad2 50%, #f5f8ea 100%)",
  sidebarBg: "#212638",
  glassWhite: "rgba(255, 255, 255, 0.88)",
  primary: "#5372ba",
  primaryDark: "#1f2a44",
  accent: "#ce870a",
  gold: "#d1b028",
  success: "#596c33",
  danger: "#ff929a",
  warning: "#ce870a",
  skyBlue: "#6293b9",
  dustyBlue: "#7691ad",
  indigo: "#616496",
  softPurple: "#999dc7",
  deepPurple: "#5a4e70",
  pinkAccent: "#aa7095",
  mutedSlate: "#9094ac",
  darkSlate: "#435665",
  silver: "#d7d7d7",
  deepNavy: "#254268",
  brownGold: "#c6a75e",
  c1: "#fe424d",
  c2: "#1aa6b7",
  c3: "#e88b9f",
  c4: "#daecf3",
  c5: "#a3c2d2",
  c6: "#af7a2b",
  c7: "#398797",
  c8: "#022d41",
  c9: "#5f7ab7",
  c10: "#bceadf",
  c11: "#f91a47",
  c12: "#fdda04",
  c13: "#e7dedd",
  c14: "#a74353",
  c15: "#c3924c",
  c16: "#ffa64a",
  c17: "#e8cec2",
  c18: "#f46e61",
  c19: "#972956",
  c20: "#9293c3",
  c21: "#ca649f",
  c22: "#dba1c2",
  c23: "#214573",
  c24: "#091d38",
  c25: "#8e9141",
  c26: "#414757",
  c27: "#851c24",
  c28: "#84896d",
  c29: "#820816",
  c30: "#b7a159",
  c31: "#a54f6b",
  c32: "#bab98b",
  c33: "#7a8b95",
  c34: "#8fa4b0",
  c35: "#445662",
  c36: "#a76d5e",
  c37: "#c4a071",
  c38: "#b5b777",
  c39: "#626809",
  c40: "#98a086",
  c41: "#846044",
  c42: "#dfccb1",
  c43: "#4c6663",
  c44: "#5a4155",
  c45: "#efead9",
  c46: "#8b8098",
  c47: "#735f82",
  c48: "#aba493",
  c49: "#b1202e",
  c50: "#1d2636",
  c51: "#c32349",
};

// --- System Modules Data ---
const SYSTEM_MODULES = [
  { id: "dashboard", label: "HOME DASHBOARD", icon: LayoutDashboard },
  { id: "ai_copilot", label: "AI COPILOT", icon: BrainCircuit },
  { id: "calendar", label: "CALENDAR", icon: Calendar },

  { id: "heading_front_office", isHeading: true, label: "FRONT OFFICE" },
  {
    id: "crm_sales",
    label: "CRM & SALES",
    icon: Users,
    subItems: [
      { id: "lead_intel", label: "Lead Intelligence" },
      { id: "account_mgmt", label: "Account Management" },
      { id: "smart_pipeline", label: "Smart Pipeline" },
    ],
  },
  {
    id: "marketing_automation",
    label: "MARKETING AUTOMATION",
    icon: Megaphone,
    subItems: [
      { id: "omnichannel", label: "Omnichannel Campaigns" },
      { id: "roi_analytics", label: "ROI Analytics" },
    ],
  },
  {
    id: "customer_success",
    label: "CUSTOMER SUCCESS",
    icon: MessageSquare,
    subItems: [
      { id: "omni_ticket", label: "Omni-Ticket System" },
      { id: "sentiment_analysis", label: "Sentiment Analysis" },
    ],
  },

  {
    id: "heading_supply_chain",
    isHeading: true,
    label: "SUPPLY CHAIN & PRODUCTION",
  },
  {
    id: "inventory_wms",
    label: "INVENTORY & WMS",
    icon: Package,
    subItems: [
      { id: "stock_dashboard", label: "Stock Dashboard" },
      { id: "gr", label: "Goods Receipt (GR)" },
      { id: "gi", label: "Goods Issue (GI)" },
      { id: "stock_transfer", label: "Stock Transfer & Adjust" },
      { id: "physical_count", label: "Physical Count" },
    ],
  },
  {
    id: "procurement",
    label: "PROCUREMENT",
    icon: ShoppingCart,
    subItems: [
      { id: "vendor_registry", label: "Vendor Registry" },
      { id: "pr", label: "Purchase Requisition (PR)" },
      { id: "po", label: "Purchase Order (PO)" },
      { id: "supplier_eval", label: "Supplier Evaluation" },
    ],
  },
  {
    id: "production_mes",
    label: "PRODUCTION (MES)",
    icon: Factory,
    subItems: [
      { id: "prod_planning", label: "Production Planning" },
      { id: "wo", label: "Work Orders (WO)" },
      { id: "shop_floor", label: "Shop Floor Control" },
      { id: "downtime", label: "Downtime Logs" },
    ],
  },
  {
    id: "qa",
    label: "QUALITY ASSURANCE",
    icon: ShieldCheck,
    subItems: [
      { id: "inspection", label: "Inspection Criteria" },
      { id: "inbound_qc", label: "Inbound QC" },
      { id: "outbound_qc", label: "Outbound QC" },
      { id: "ncr", label: "Non-Conformance (NCR)" },
    ],
  },
  {
    id: "asset_maintenance",
    label: "ASSET & MAINTENANCE",
    icon: Wrench,
    subItems: [
      { id: "equipment", label: "Equipment Registry" },
      { id: "pm_schedule", label: "PM Schedule" },
      { id: "repair_work", label: "Repair Work Requests" },
    ],
  },

  { id: "heading_back_office", isHeading: true, label: "BACK OFFICE & CORE" },
  {
    id: "hr",
    label: "HUMAN RESOURCES",
    icon: UserCircle,
    subItems: [
      { id: "employee_master", label: "Employee Master" },
      { id: "time_attendance", label: "Time & Attendance" },
      { id: "leave_mgmt", label: "Leave Management" },
      { id: "payroll", label: "Payroll Processing" },
    ],
  },
  {
    id: "finance_billing",
    label: "FINANCE & BILLING",
    icon: DollarSign,
    subItems: [
      { id: "ar_ap", label: "AR / AP Management" },
      { id: "ai_cashflow", label: "AI Cashflow Forecast" },
    ],
  },
  {
    id: "core_accounting",
    label: "CORE ACCOUNTING",
    icon: Calculator,
    subItems: [
      { id: "coa", label: "Chart of Accounts (COA)" },
      { id: "jv", label: "Journal Entries (JV)" },
      { id: "gl", label: "General Ledger (GL)" },
      { id: "financial_reports", label: "Financial Reports" },
    ],
  },

  {
    id: "master_data",
    label: "MASTER DATA",
    icon: FileText,
    subItems: [
      { id: "categories_config", label: "Categories Config" },
      { id: "master_item", label: "Master Item" },
    ],
  },
  {
    id: "settings",
    label: "SYSTEM CONFIG",
    icon: Settings,
    subItems: [
      { id: "user_permission", label: "User Permission" },
      { id: "system_config", label: "System Config" },
    ],
  },
];

const MOCK_STATS = [
  {
    label: "Total Revenue (YTD)",
    value: "$4.82M",
    sub: "+12.4% vs Budget",
    icon: DollarSign,
    color: THEME.c25,
  },
  {
    label: "Active Leads",
    value: "142",
    sub: "24 Pending Follow-up",
    icon: Target,
    color: THEME.c27,
  },
  {
    label: "Conversion Rate",
    value: "24.8%",
    sub: "+2.1% vs Last Month",
    icon: TrendingUp,
    color: THEME.c35,
  },
  {
    label: "Marketing ROI",
    value: "320%",
    sub: "Across all campaigns",
    icon: Target,
    color: THEME.c30,
  },
];

const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  style = {},
}: any) => (
  <div
    className={`rounded-2xl p-4 backdrop-blur-xl shadow-[0_8px_30px_rgba(31,42,68,0.06)] border border-white/60 ${hoverEffect ? "hover:-translate-y-1 transition-transform duration-300" : ""} ${className}`}
    style={{ backgroundColor: THEME.glassWhite, ...style }}
  >
    {children}
  </div>
);

const HeroBanner = () => {
  const bgImage =
    "https://www.ricoh-americalatina.com/media-library/tendencias-en-manufactura-2025-innovacion-y-el-poder-del-capital-humano-article.jpg?id=55455324&width=1200&height=600&coordinates=0%2C41%2C0%2C41";
  return (
    <div className="relative w-full h-[180px] md:h-[220px] rounded-3xl overflow-hidden shadow-xl mb-4 group bg-[#1f2a44]">
      <div className="absolute inset-0 transform transition-transform duration-[2000ms] group-hover:scale-105">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1f2a44]/90 via-[#1f2a44]/50 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-center p-6 md:px-10 w-full md:w-3/4 lg:w-2/3">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} style={{ color: THEME.c34 }} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-sm" style={{ color: THEME.c34 }}>
            ✨ AI MORNING BRIEFING
          </span>
        </div>
        <h2 className="text-3xl md:text-[34px] font-black text-white tracking-tight leading-[1.1] mb-3 drop-shadow-md">
          Good Morning. Revenue is projected to{" "}
          <br className="hidden md:block" />
          hit <span style={{ color: THEME.c30 }}>105%</span> of Q3 Target.
        </h2>
        <div className="mb-5">
          <p className="text-white/95 text-[13px] md:text-[14px] font-semibold tracking-wide max-w-2xl leading-snug drop-shadow">
            Based on current pipeline velocity and historical data, the AI
            engine suggests focusing
            <br className="hidden md:block" />
            on the{" "}
            <span className="text-white font-black">
              Enterprise Tier renewals
            </span>{" "}
            this week.{" "}
            <span className="text-white font-black">
              3 key accounts show churn risk indicators.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#7d6688] hover:bg-[#685372] text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg border border-white/10">
            <BrainCircuit size={14} /> ANALYZE AT-RISK ACCOUNTS
          </button>
          <button className="bg-[#1f2a44] hover:bg-[#151c2e] text-white border border-white/10 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg">
            DISMISS BRIEFING
          </button>
        </div>
      </div>

      {/* Absolute Right Panel */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/15 border border-white/20 p-6 rounded-2xl hidden lg:flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-[180px]">
        <PieChart
          size={38}
          className="mb-3 drop-shadow"
          style={{ color: THEME.c30 }}
          strokeWidth={1.5}
        />
        <span className="text-4xl font-black text-white drop-shadow-md mb-1">
          92%
        </span>
        <span className="text-[9px] font-black text-white/90 tracking-widest uppercase pb-1 text-center">
          Confidence Score
        </span>
      </div>
    </div>
  );
};

const MetricCard = ({ label, val, unit, icon: Icon, color, desc }: any) => (
  <div className="bg-white/90 rounded-2xl p-4 shadow-sm border border-[#cdd0db] relative overflow-hidden group h-full transition-all hover:shadow-md">
    <div className="absolute -right-6 -bottom-6 opacity-[0.1] transform rotate-12 group-hover:scale-110 transition-all duration-700 pointer-events-none z-0">
      <Icon size={100} style={{ color: color }} />
    </div>
    <div className="relative z-10 flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-90 truncate" style={{ color: THEME.c34 }}>
          {label}
        </p>
        <h4
          className="text-2xl font-black tracking-tight mt-0.5"
          style={{ color: THEME.c26 }}
        >
          {val}
        </h4>
        {desc && (
          <p className="text-[9px] font-bold mt-2 flex items-center gap-1.5 bg-white/40 w-fit px-2 py-0.5 rounded-full border border-black/5" style={{ color: THEME.c44 }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: color }}
            ></span>
            {desc}
          </p>
        )}
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white backdrop-blur-md shadow-sm"
        style={{ backgroundColor: color + "15" }}
      >
        <Icon size={18} style={{ color: color }} />
      </div>
    </div>
  </div>
);

const SalesChartArea = () => {
  const data = [
    { name: "B2B Enterprise", target: 60, actual: 64, color: THEME.c35 },
    { name: "Retail Channels", target: 25, actual: 20, color: THEME.c33 },
    { name: "E-commerce", target: 15, actual: 16, color: THEME.c37 },
  ];
  return (
    <GlassCard className="lg:col-span-2 bg-gradient-to-br from-white to-[#f0f2f5] border-[#cdd0db]">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-base font-black flex items-center gap-2 uppercase tracking-tight" style={{ color: THEME.c26 }}>
          <BarChart2 size={16} style={{ color: THEME.c29 }} /> Strategic Sales
          Analysis
        </h2>
        <span className="text-[8px] text-white font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm" style={{ backgroundColor: THEME.c34 }}>
          Real-time
        </span>
      </div>
      <div className="space-y-4 relative z-10">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-4 group/bar">
            <div className="w-28 text-[9px] font-black uppercase truncate tracking-tight" style={{ color: THEME.c28 }}>
              {item.name}
            </div>
            <div className="flex-1 h-4 rounded-lg relative flex items-center bg-[#cdd0db]/40 shadow-inner overflow-hidden">
              <div
                className="h-full transition-all duration-1000 relative z-10 rounded-lg"
                style={{
                  width: `${item.actual}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                }}
              />
            </div>
            <div className="w-10 text-right">
              <span className="text-[10px] font-black" style={{ color: THEME.c26 }}>
                {item.actual}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const UrgentTasks = () => (
  <GlassCard className="bg-gradient-to-b from-white to-[#cdd0db]/20 border-[#9094ac]/30">
    <div className="flex justify-between items-center mb-4 relative z-10">
      <h2 className="text-base font-black flex items-center gap-2 uppercase tracking-tight" style={{ color: THEME.c26 }}>
        <AlertCircle size={16} style={{ color: THEME.c29 }} /> Critical Action
      </h2>
      <span className="text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest" style={{ color: THEME.c29, backgroundColor: THEME.c29 + '1A' }}>
        3 Tasks
      </span>
    </div>
    <div className="space-y-2.5 relative z-10">
      {[
        {
          title: "Approve Enterprise Deal SO-2026-001",
          type: "Sales Order",
          icon: ShoppingCart,
          urgent: true,
          color: THEME.c29,
          bg: THEME.c29 + '1A',
        },
        {
          title: "Follow up on Hot Lead - TechCorp",
          type: "Lead Action",
          icon: Target,
          urgent: true,
          color: THEME.c30,
          bg: THEME.c30 + '1A',
        },
        {
          title: "Review Q3 Marketing Campaign",
          type: "Campaign Mgmt",
          icon: Megaphone,
          urgent: false,
          color: THEME.c35,
          bg: THEME.c35 + '1A',
        },
      ].map((task, i) => (
        <div
          key={i}
          className="p-3 bg-white/70 rounded-xl border border-[#cdd0db]/30 flex gap-3 items-start hover:bg-white transition-all shadow-sm"
        >
          <div className="p-2 rounded-lg shrink-0" style={{ color: task.color, backgroundColor: task.bg }}>
            <task.icon size={12} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black tracking-tight truncate" style={{ color: THEME.c26 }}>
              {task.title}
            </p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-[8px] font-bold uppercase" style={{ color: THEME.c33 }}>
                {task.type}
              </p>
              {task.urgent && (
                <span className="text-[7px] font-black uppercase animate-pulse" style={{ color: THEME.c29 }}>
                  Critical
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full mt-4 py-3 text-white text-[9px] font-bold uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 tracking-widest hover:opacity-90" style={{ backgroundColor: THEME.c26 }}>
      <Calendar size={12} /> Schedule
    </button>
  </GlassCard>
);

const NavItem = ({
  item,
  depth = 0,
  activeTab,
  setActiveTab,
  expandedMenus,
  toggleMenu,
  isSidebarOpen,
}: any) => {
  if (item.isHeading) {
    if (!isSidebarOpen) return <div className="h-4" />;
    return (
      <div className="mt-6 mb-2 px-4">
        <span className="text-[10px] font-black tracking-widest opacity-90 text-[#60a5fa] uppercase drop-shadow-sm">
          {item.label}
        </span>
      </div>
    );
  }

  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedMenus[item.id];
  const isActive = activeTab === item.id;
  const isChildActive = (items: any) =>
    items?.some(
      (child: any) => child.id === activeTab || isChildActive(child.subItems),
    );
  const childActive = isChildActive(item.subItems);

  if (depth === 0) {
    return (
      <div className="mb-1.5">
        <button
          onClick={() =>
            hasSubItems ? toggleMenu(item.id) : setActiveTab(item.id)
          }
          className={`w-full flex items-center transition-all duration-300 relative rounded-xl mx-auto
                        ${isActive ? "text-white shadow-lg bg-[#38bdf8]" : childActive ? "text-[#38bdf8] bg-[#38bdf8]/10" : "text-[#8E95A6] hover:text-[#38bdf8] hover:bg-[#38bdf8]/5"}
                        ${!isSidebarOpen ? "justify-center w-12 px-0" : "w-[94%] px-3 justify-start"} py-3`}
        >
          <item.icon
            size={18}
            className={`relative z-10 transition-transform ${isActive ? "text-white scale-105" : childActive ? "text-[#38bdf8] scale-105" : "text-[#38bdf8]"}`}
          />
          {isSidebarOpen && (
            <div className="relative z-10 flex items-center justify-between flex-1 ml-3 overflow-hidden">
              <span
                className={`text-[11.5px] tracking-wider uppercase text-left ${isActive || childActive ? "font-black text-white" : "font-bold opacity-85"}`}
              >
                {item.label}
              </span>
              {hasSubItems && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
              )}
            </div>
          )}
        </button>
        {isSidebarOpen && hasSubItems && (
          <div
            className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
          >
            {item.subItems.map((sub: any) => (
              <NavItem
                key={sub.id}
                item={sub}
                depth={depth + 1}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                expandedMenus={expandedMenus}
                toggleMenu={toggleMenu}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    const paddingLeft = depth * 12 + 15;
    return (
      <div className="mb-1">
        <button
          onClick={() =>
            hasSubItems ? toggleMenu(item.id) : setActiveTab(item.id)
          }
          className={`w-full flex items-center py-2 pr-3 rounded-lg transition-all relative group
                        ${isActive ? "text-[#38bdf8] font-black bg-[#38bdf8]/10" : "text-[#8E95A6] hover:text-[#38bdf8] hover:bg-[#38bdf8]/5 font-bold"}`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-all ${isActive ? "bg-[#38bdf8] scale-125" : "bg-[#8E95A6] opacity-30"}`}
          />
          <span className="flex-1 text-left text-[10.5px] uppercase tracking-wider truncate">
            {item.label}
          </span>
          {hasSubItems && (
            <ChevronDown
              size={12}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </button>
        {isSidebarOpen && hasSubItems && (
          <div
            className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
          >
            {item.subItems.map((sub: any) => (
              <NavItem
                key={sub.id}
                item={sub}
                depth={depth + 1}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                expandedMenus={expandedMenus}
                toggleMenu={toggleMenu}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
};

// --- Main App ---

export default function Home() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const { visibility } = useVisibility();

  // Filter SYSTEM_MODULES based on visibility state
  const visibleModules = useMemo(() => {
    return SYSTEM_MODULES.map((module) => {
      // Admin injected tabs
      let finalModule: any = module;
      if (module.id === "settings" && user?.isDev) {
        finalModule = {
          ...module,
          subItems: [
            ...(module.subItems || []),
            { id: "dev_permit", label: "DEV PERMIT BETA" },
            { id: "dev_logs", label: "System Logs" },
          ],
        };
      }

      // Filter out root items if visibility says false
      if (visibility[finalModule.id] === false) return null;

      // Filter out sub items
      if (finalModule.subItems) {
        const filteredSubs = finalModule.subItems.filter(
          (sub: any) => visibility[sub.id] !== false,
        );
        return { ...finalModule, subItems: filteredSubs };
      }
      return finalModule;
    }).filter(Boolean);
  }, [visibility, user]);
  const currentUser = {
    name: user?.name || "T-DCC Developer",
    position: user?.role || "LEAD DEVELOPER",
    avatar:
      user?.avatar ||
      "https://drive.google.com/thumbnail?id=1Z_fRbN9S4aA7OkHb3mlim_t60wIT4huY&sz=w400",
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
    if (!sidebarOpen) setSidebarOpen(true);
  };

  return (
    <div
      className="flex h-screen w-full font-sans overflow-hidden flex-col md:flex-row"
      style={{ background: THEME.bgGradient }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Noto+Sans+Thai:wght@400;700;900&display=swap');
        body, .font-sans { font-family: 'JetBrains Mono', 'Noto Sans Thai', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #5372ba22; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5372ba; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `,
        }}
      />

      {/* SVG Gradient Definition for Gemini Theme Icon - Optimized for Relation/Partnership */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="geminiRelationGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="45%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>

      {/* SIDEBAR */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-700 z-30 shadow-2xl relative ${sidebarOpen ? "w-72" : "w-24"}`}
        style={{ background: THEME.sidebarBg }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-10 w-7 h-7 bg-gradient-to-tr from-[#38bdf8] to-[#2563eb] text-white rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.4)] z-50 border-2 border-[#212638] transition-transform hover:scale-110"
        >
          {sidebarOpen ? (
            <ChevronRight size={12} className="rotate-180" />
          ) : (
            <ChevronRight size={12} />
          )}
        </button>

        <div className="h-24 flex items-center justify-center border-b border-white/5 px-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl relative shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-0 flex rounded-2xl overflow-hidden">
                <div className="w-1/2 h-full bg-[#38bdf8]"></div>
                <div className="w-1/2 h-full bg-[#2563eb]"></div>
              </div>
              <Settings size={26} className="text-white relative z-10 drop-shadow-md" strokeWidth={2.5} />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#60a5fa] rounded-full border-2 border-[#1e3a8a] animate-pulse z-20 translate-x-[2px] -translate-y-[2px]"></div>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                {/* SMART ERP STANDS OUT: BOLD AND LARGE */}
                <h1 className="text-[26px] font-black tracking-tighter leading-none uppercase flex items-center">
                  <span className="text-white">SMART</span>
                  <span className="text-[#38bdf8] ml-1">ERP</span>
                </h1>
                <p className="text-[#8E95A6] text-[8px] font-black uppercase tracking-[0.3em] mt-2 opacity-70">
                  Enterprise Resource Planning
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar py-4">
          {visibleModules.map((module: any) => (
            <NavItem
              key={module.id}
              item={module}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={sidebarOpen}
              expandedMenus={expandedMenus}
              toggleMenu={toggleMenu}
            />
          ))}
        </nav>

        {/* SIDEBAR FOOTER - DEV PROFILE */}
        <div className="p-4 shrink-0 pb-6">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}
          >
            <div className="w-10 h-10 rounded-xl border overflow-hidden shadow-md bg-white/5 shrink-0" style={{ borderColor: THEME.c35 }}>
              <img
                src={currentUser.avatar}
                className="w-full h-full object-cover"
                alt="Avatar"
              />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-black tracking-tight leading-none truncate">
                  {currentUser.name}
                </p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-1.5" style={{ color: THEME.c33 }}>
                  {currentUser.position}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <LogOut
                onClick={logout}
                size={16}
                className="opacity-70 hover:opacity-100 cursor-pointer transition-all ml-auto"
                style={{ color: THEME.c49 }}
              />
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-hidden flex flex-col bg-transparent">
        {/* GLOBAL SCROLLABLE AREA - ENCOMPASSES HEADER, CONTENT, AND FOOTER */}
        <div className="flex-1 custom-scrollbar overflow-y-auto flex flex-col min-h-0">
          <header className="pt-5 pb-3 px-8 flex items-center justify-between z-10 shrink-0 bg-transparent">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center shrink-0">
                <svg width="0" height="0" className="absolute">
                  <linearGradient
                    id="instaGrad"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop stopColor={THEME.c30} offset="0%" />
                    <stop stopColor={THEME.c31} offset="50%" />
                    <stop stopColor={THEME.c44} offset="100%" />
                  </linearGradient>
                </svg>
                <Target
                  size={34}
                  stroke="url(#instaGrad)"
                  strokeWidth={2.6}
                  className="drop-shadow-sm"
                />
              </div>
              <div>
                <h3
                  className="font-black uppercase tracking-tighter leading-none flex items-center"
                  style={{ fontSize: "22px" }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${THEME.c50}, ${THEME.c26})` }}>
                    GLOBAL
                  </span>
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-tr font-serif italic mx-1.5 font-bold drop-shadow-sm"
                    style={{ fontSize: "22px", backgroundImage: `linear-gradient(to top right, ${THEME.c27}, ${THEME.c31}, ${THEME.c30})` }}
                  >
                    &
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${THEME.c26}, ${THEME.c50})` }}>
                    STRATEGIC SALES HUB
                  </span>
                </h3>
                {/* Compact Spacing between Title and Subtitle */}
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] mt-1 opacity-90 leading-tight" style={{ color: THEME.c28 }}>
                  OMNICHANNEL REVENUE TRACKING & CRM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center bg-white rounded-full shadow-sm p-1 pr-1.5 pl-6 gap-5 border border-[#cdd0db]/50 h-11">
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] leading-none mb-0.5" style={{ color: THEME.c33 }}>
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </span>
                  <span className="text-[11px] font-black text-transparent bg-clip-text leading-none" style={{ backgroundImage: `linear-gradient(to right, ${THEME.c50}, ${THEME.c26})` }}>
                    {currentTime.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner h-full" style={{ backgroundColor: THEME.c50 }}>
                  <Clock
                    size={14}
                    strokeWidth={2.5}
                    style={{ color: THEME.c49 }}
                  />
                  <span className="text-[12px] font-black font-mono tracking-widest mt-0.5">
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
              </div>
              <button className="relative w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#f8f9fa] transition-all group border border-[#cdd0db]/50 hover:scale-105" style={{ color: THEME.c34 }}>
                <Bell
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                  strokeWidth={2}
                />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full shadow-[0_0_0_2px_#ffffff]" style={{ backgroundColor: THEME.c49 }}></span>
              </button>
            </div>
          </header>

          {/* DYNAMIC CONTENT AREA */}
          <div className={`flex-1 flex flex-col justify-start w-full`}>
            {activeTab === "dashboard" ? (
              <div className="max-w-[1500px] w-full mx-auto px-8 space-y-6 animate-fadeIn pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase" style={{ color: THEME.c50 }}>
                      Morning,{" "}
                      <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${THEME.c27}, ${THEME.c31})` }}>
                        {currentUser.name}!
                      </span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-1.5" style={{ color: THEME.c33 }}>
                      <TrendingUp size={14} style={{ color: THEME.c37 }} /> Sales
                      Target:{" "}
                      <span style={{ color: THEME.c34 }}>On Track (118.5%)</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md border border-[#cdd0db]/50 transition-all flex items-center gap-2 hover:-translate-y-0.5" style={{ color: THEME.c50 }}>
                      <Megaphone size={16} style={{ color: THEME.c34 }} />{" "}
                      Campaigns
                    </button>
                    <button className="text-white px-7 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-2" style={{ backgroundImage: `linear-gradient(to right, ${THEME.c27}, ${THEME.c31}, ${THEME.c37})` }}>
                      <Target size={16} /> New Lead
                    </button>
                  </div>
                </div>

                <HeroBanner />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {MOCK_STATS.map((stat, idx) => (
                    <MetricCard
                      key={idx}
                      {...stat}
                      val={stat.value}
                      desc={stat.sub}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <SalesChartArea />
                  <UrgentTasks />
                </div>
              </div>
            ) : activeTab === "calendar" ? (
              <div className="w-full flex-1 flex flex-col">
                <CalendarHub />
              </div>
            ) : activeTab === "user_permission" ? (
              <div className="w-full flex-1 flex flex-col">
                <UserPermission />
              </div>
            ) : activeTab === "system_config" ? (
              <div className="w-full flex-1 flex flex-col">
                <SystemConfig />
              </div>
            ) : activeTab === "sales_orders" ? (
              <div className="w-full flex-1 flex flex-col">
                <SaleOrder />
              </div>
            ) : activeTab === "products_catalogue" ? (
              <div className="w-full flex-1 flex flex-col">
                <ProductsCatalogue />
              </div>
            ) : activeTab === "dev_permit" ? (
              <div className="w-full flex-1 flex flex-col">
                <DevPermit />
              </div>
            ) : activeTab === "dev_logs" ? (
              <div className="w-full flex-1 flex flex-col">
                <SystemLogs />
              </div>
            ) : (
              <div className="max-w-2xl w-full mx-auto px-8 py-12 text-center animate-fadeIn flex-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-white flex items-center justify-center mx-auto mb-6 shadow-xl border border-[#38bdf8]/30 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Database size={28} className="relative z-10" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-3" style={{ color: THEME.c26 }}>
                  {activeTab.replace(/_/g, " ")} Module
                </h2>
                <GlassCard className="max-w-sm mx-auto py-8">
                  <p className="text-[10px] font-bold leading-relaxed mb-6" style={{ color: THEME.c44 }}>
                    Workspace "{activeTab}" is loading real-time sales data.
                  </p>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="px-6 py-2.5 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors shadow-lg"
                    style={{ backgroundColor: THEME.c26 }}
                  >
                    Back to Dashboard
                  </button>
                </GlassCard>
              </div>
            )}
          </div>

          {/* FINAL BALANCED FOOTER SHARED ACROSS ALL PAGES */}
          <footer className="mt-auto shrink-0 py-3.5 flex flex-col items-center gap-1.5 text-center px-8 w-full bg-transparent" style={{ color: THEME.c26 }}>
            <div className="flex items-center justify-center">
              <span className="text-[12px] font-black uppercase tracking-widest opacity-80">
                GLOBAL SMART ERP HUB • EMPOWERING STRATEGIC ENTERPRISE
                EXCELLENCE
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] font-medium" style={{ color: THEME.c34 }}>
              <p className="flex items-center">
                <span className="font-light mr-1">System by</span>{" "}
                <span className="font-black" style={{ color: THEME.c26 }}>
                  T All Intelligence
                </span>
              </p>
              <span className="hidden md:inline" style={{ color: THEME.c33 }}>|</span>
              <p className="flex items-center gap-1.5">
                <PhoneCall size={14} style={{ color: THEME.c31 }} /> 082-5695654,
                091-5165999
              </p>
              <span className="hidden md:inline" style={{ color: THEME.c33 }}>|</span>
              <p className="flex items-center gap-1.5">
                <Mail size={14} style={{ color: THEME.c35 }} />{" "}
                tallintelligence.ho@gmail.com
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
