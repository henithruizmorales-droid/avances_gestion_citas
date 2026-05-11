import { use, useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { KPICard } from "../components/KPICard"; 
import { DependencyChart } from "../components/DependencyChart";
import { MonthlyTrendChart } from "../components/MonthlyTrendChart";
import { ProfessionalTable } from "../components/ProfessionalTable";
import { Download, RefreshCw, Calendar } from "lucide-react";
import { format, subMonths } from "date-fns";

export default function CoordinationDashboard() {
    const { 
        kpis,
        byDependency, 
        monthlyTrend, 
        professionals,
        loading, 
        fetchAllMetrics,
        exportToCSV, 
    } = useDashboard();
    const [dataRange, setDataRange] = useState({
        from: format(subMonths(new Date(), 1), "yyyy-MM-dd"),
        to: format(new Date(), "yyyy-MM-dd"),
    });

    useEffect(() => {
        fetchAllMetrics(dataRange);
    }, [dataRange, fetchAllMetrics]);

    const handleDateChange = (field, value) => {
        setDataRange((prev) => ({ ...prev, [field]: value }));
    };

    if (loading && !kpis) {
        return <div className="loading-screen">Cargando dashboard...</div>
    }

    return (
      <div className="coordination-dashboard">
        <header className="dashboard-header">
          <div>
            <h1>Panel de CoordinaciÃ³n</h1>
            <p>Vista general del bienestar institucional</p>
          </div>
          <div className="header-actions">
            <button onClick={() => fetchAllMetrics(dataRange)} className="btn-secondary">
              <RefreshCw size={18} />
              Actualizar 
            </button>
            <button onClick={() => exportToCSV(dataRange)} className="btn-primary">
              <Download size={18} />
              Exportar CSV
            </button>
          </div>
        </header>

        <div className="data-filter">
          <Calendar size={18}>
            <input
              type="date"
              value={dataRange.from}
              onChange={(e) => handleDateChange("from", e.target.value)}
            />
            <span>hasta</span>
            <input
              type="date"
              value={dataRange.to}
              onChange={(e) => handleDateChange("to", e.target.value)}
            />
          </Calendar>
          </div>

          {kpis && (
            <section className="kpi-grid">
              <KPICard 
                title="Total Citas" 
                value={kpis.total_appointments}
                color="#3b82f6"
                subtitle= "En período seleccionado"
              />

              <KPICard 
                title="Tasa de cumplimiento"
                value={`${math.round(kpis.avg_wait_days || 0)} días`}
                color="f59e0b"
                subtitle="Desde solicitud a atencion"
                />

              <KPICard
                title="No Asistencias"
                value={kpi.no_show_count}
                color="#ef4444"
                subtitle={`${Math.round((kpis._no_show_count / kpis.total_appointments) * 100)}% del total`}
              /> 
            </section>
          )}

          <section className="charts-grid">
            <DependencyChart data={byDependency} />
            <MonthlyTrendChart data={monthlyTrend} />
          </section>

          <section className="proffessionals-section">
            <ProfessionalTable data={professionals} />
          </section>
      </div>
    );
  }