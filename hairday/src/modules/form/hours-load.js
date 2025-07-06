import dayjs from "dayjs"

import { openingHours} from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
    // Limpa a lista de horários.
    hours.innerHTML = ""

    // Obtém a lista de horarios indisponíveis do dia.
    const unavailableHours = dailySchedules.map((schedule) =>
        dayjs(schedule.when).format("HH:mm")
    )

    const opening = openingHours.map((hour) => {
        // Recupera somente a hora.
        const [scheduleHour] = hour.split(":")
        
        // Adiciona a hora na data e verifica se está no passado.
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

        const available = !unavailableHours.includes(hour) && !isHourPast
        
        return {
            hour,
            available
        }
    })

    // Renderiza os horários.
    opening.forEach(({ hour, available}) => {
        
        const li = document.createElement("li")

        li.classList.add("hour")
        li.classList.add(available ? "hour-available" : "unavailable")

        li.textContent = hour

        if(hour === "09:00") {
            hoursHeaderAdd("Manhã")

        } else if(hour === "13:00") {
            hoursHeaderAdd("Tarde")
        } else if(hour === "18:00") {
            hoursHeaderAdd("Noite")
        }

        hours.appendChild(li)
        
    })

    // Adiciona o evento de clique nos horarios disponiveis.
    hoursClick()
}

function hoursHeaderAdd(title) {
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title
    
    hours.appendChild(header)
}