import { useState, useCallback } from "react";
import { DasboardRepository } from "../api/dashboard.repository";
import { toast } from "sonner";
import { endOfMonth, startOfMonth } from "date-fns";

export function useDashboard() {
    const [kpis, setKpis] = useState(null);
    const [byDependency, setByDependency] = useState([]);
    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(false);

    const dateRange = {
        from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    };
    const fetchAllMetrics = useCallback(async(customRange=null)=> {
        setLoading(true);
        const Range = customRange || dateRange;

    try {
        const [kpiData, byDepData, trendData, profData] = await Promise.all([
            DasboardRepository.getKPis(Range),
            DasboardRepository.getAppointmentsByDependency(Range),
            DasboardRepository.getMonthlyTrend(new Date().getFullYear()),
            DasboardRepository.getProfessionalPerformance(Range),
        ]);

        setKpis(kpiData[0]); // La función retorna array con un objeto 
        setByDependency(depData);
        setMonthlyTrend(trendData);
        setProfessionals(profData);
    } catch (err) {
        toast.error("Error cargando métricas");
        console.error(err);
    } finally {
        setLoading(false);
    }
    },[]);

    const exportToCSV = async (range = null) => {
        try {
            const data = await DasboardRepository.getRawDataForExport(
                (range || dateRange),
            );
            
            // Transformar a formato plano para Excel
            const flatData = data.map((row) => ({
                ID: row.id,
                Fecha_Cita: row.scheduled_date,
                Hora: row.scheduled_time,
                Dependencia: row.dependencies?.name,
                Aprendiz: row.aprendiz?.full_name,
                Documento: row.aprendiz?.document_number,
                Professional: row.professional?.full_name || "Sin asignar",
                Estado: row.status,
                Motivo: row.reason,
                Fecha_Creacion: row.created_at,
            }));

            // Crear CSV
            const headers = Object.keys(flatData[0]);
            const csv = [
                headers.join(","),
                ...flatData.map((row) =>
                    headers.map((h) => `"${row[h] || ""}"`).join(","),
                ),
            ].join("\n");

            // Descargar
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            const link = document.createElement("a");
            link.href=  URL.createObjectURL(blob);
            link.download =  `reporte_bienestar_${format(new date(), "yyyy-MM-dd")}.csv `;
            link.click();

            toast.success("Reporte descargando");
        } catch (err) {
            toast.error("Error exportando datos");
        }
    };

    return {
      kpis,
      byDependency,
      nonthlyTrend,
      professionals,
      loading,
      fetchAllMetrics,
      exportToCSV,
    };
}



    

     