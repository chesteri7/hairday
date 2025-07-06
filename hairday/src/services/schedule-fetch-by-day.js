import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export async function scheduleFetchByDay({ date }) {
    try {
        // Faz a requisição.
       const response = await fetch(`${apiConfig.baseURL}/schedules`)

       // Converte para JSON
       const data = await response.json()

       // Filtra os horários disponíveis para o dia selecionado.
       const dailySchedules = data.filter((schedule) =>
        dayjs(date).isSame(schedule.when, "day")
    )

         // Retorna os horários disponíveis.
         return dailySchedules
    } catch (error) {
        console.log(error)
        alert("não foi possível buscar os horários disponíveis para este dia, tente novamente mais tarde")
    }
}