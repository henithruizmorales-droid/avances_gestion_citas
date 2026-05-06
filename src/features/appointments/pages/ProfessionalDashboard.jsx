import { useEffect, useState } from "react";
import { useAppointments } from  "../hooks/useAppointments";
import { AppointmentCard } from "../components/AppointmentCard";
import  { useAuth } from "../../providers/AuthProvider";

export const ProfessionalDashboard = () => {
    const { appointments, fetchAppointments, updateStatus, isloading } = 
    useAppointments();
     const { profile } = useAuth();
     const { filter, setFilter } = useState("pending"); // pending, confirmed, completed

     useEffect(() => {
        fetchAppointments({ status : filter});
        }, [filter, fetchAppointments]);

        const handleConfirm = (id) => updateStatus(id, "confirmed");
        const handleComplete = (id, notes) => updateStatus(id, "completed", notes);
        const handleNoShow = (id) => updateStatus(id, "no_show");

        return (
            <div className="dasboard-container">
                <header className="dasboard-header">
                    <h1>Citas {profile?.dependencies.name}</h1>

                        <div className="filter-tabs">
                            {["pending", "confirmed", "completed"].map((status) => (
                                <button
                                    key={status}
                                    className={filter === status ? "active" : ""}
                                    onClick={() => setFilter(status)}
                                >
                                    {status === "pending" && "Pendientes"}
                                    {status === "confirmed" && "Confirmadas"}
                                    {status === "completed" && "Historial"}
                                </button>
                            ))}
                        </div>
                </header>

                <div className="appointments-grid">
                    {isloading ? (
                        <p>Cargando citas...</p>
                    ) : (
                        appointments.map((apt) => (
                            <div key={apt.id} className="appointment-wrapper">
                                <AppointmentCard appointment={apt} isAprendiz={false}/>
                                {filter === "pending" && (
                                    <div className="professional-actions">
                                        <button 
                                        onClick={() => handleConfirm(apt.id)}
                                        className="btn-succes"
                                        >
                                            Confirmar
                                            </button>
                                        <button
                                        onClick={() => handleNoShow(apt.id)}
                                        className="btn-secundary"
                                        >
                                            No asistió
                                            </button>
                                    </div>
                                )}
                                {filter === "confirmed" && (
                                    <div className="professional-actions">
                                        <button
                                        onClick={() => 
                                            handleComplete(apt.id, "Atención completada")
                                        }
                                        className="btn-primary"
                                        >
                                            Completar
                                            </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    </div>
                </div>
        );
}