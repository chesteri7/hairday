import { scheduleFetchByDay } from "../../../services/schedule-fetch-by-day.js"
import { schedulesShow} from "../schedules/show.js"
import { hoursLoad } from "../hours-load.js"    //"../hours-load.js"  

// Seleciona o input de data.
const selectedDate = document.getElementById("date")

export async function schedulesDay () {
    // Obtem a data do input
    const date = selectedDate.value

    // Busca na API os horários disponíveis para o dia selecionado.
    const dailySchedules = await scheduleFetchByDay({ date })
    
    
    // Exibe os agendamentos do dia selecionado. 
    schedulesShow({ dailySchedules })


    // Renderiza os horarios disponiveis.
    hoursLoad({ date, dailySchedules })
}